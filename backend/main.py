from typing import Dict, List

from fastapi import FastAPI, Query, status, Request, Response, Body
from fastapi.middleware.cors import CORSMiddleware
import pandas
import time
from pymongo import errors as pymongo_errors
from builder import pipeline_builder
from constants import field_mappings
from db import db
from response_models import (
    CompletionsResponse,
    CompaniesSearchResult,
    SettingsResponse,
    PAGE_SIZE,
)
from request_schemas import SearchRequest, ExportResultsRequest
from utils.completions import get_search_suggestions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def find_companies(index = 0, query = {}):
    search_result = [
        company for company in db.companies.find(query, {"_id": 0}).skip(index).limit(PAGE_SIZE)
    ]
    companies = []
    for index, company in enumerate(search_result):
        address = "Not Available"
        hq_locations: List[Dict] = company.get("hq_locations", [])

        if hq_locations:
            address = ", ".join([loc.get("address") for loc in hq_locations])

        images = company.get("images")
        if len(images) > 0:
            thumbNail = images.get("74x74")
        else:
            thumbNail = ""

        data = {
            "id": company.get("uuid", company.get("_id")),
            "name": company.get("name"),
            "address": address,
            "employeesRange": company.get("employees", "Not available"),
            "companyStatus": company.get("company_status", "Not available"),
            "growthStage": company.get("growth_stage"),
            "thumbnailUrl": thumbNail,
            "launchYear": company.get("launch_year"),
            "totalPatents": company.get("patents_count"),
            "type": company.get("type"),
            "totalJobs": company.get("total_jobs_available"),
            "tagline": company.get("tagline"),
        }
        companies.append(data)
    total_results = db.companies.count_documents(query)  
    return companies, total_results

def convert_search_filters_to_query(filters):
    query = {}
    for search_filter in filters:
        collection_field = field_mappings[search_filter.query]["dKey"]
        dtype = field_mappings[search_filter.query]["dType"]
        try:
            stage_function_data = pipeline_builder[search_filter.current_option][dtype]
            stage = stage_function_data["get_pipeline"](
                collection_field, search_filter.values
            )
            query.update(stage["$match"])
        except IndexError:
            continue
    return query

@app.get(
    "/completions",
    name="completions",
    tags=["Completions"],
    summary="Get completions",
    description="Get completions for search fields",
    responses={status.HTTP_200_OK: {"model": CompletionsResponse}},
)
def get_completions(
    request: Request,
    q=Query(
        default="",
        description="String to search for, leaving this field empty will return some random results..",
    ),
    field_path=Query(
        default="name",
        description="The path to the field to get completions for",
        min_length=3,
        example="fundings.items.amount",
    ),
):
    """Get completions for search query using mongodb aggregate queries/pipelines"""
    corresponding_field = field_mappings[field_path]["dKey"]
    completions = get_search_suggestions(corresponding_field, q, limit=20)
    return CompletionsResponse(completions=completions)


@app.post(
    "/search",
    name="companies_search",
    tags=["Search"],
    summary="Companies Search",
   
    description="Companies search endpoint for react frontend",
    responses={status.HTTP_200_OK: {"model": CompaniesSearchResult}},
)
def companies_search(request: Request, search_filters: SearchRequest,  index: int = Query(description = "Pagination index", default =0),):
    """ Start building pipeline """

    query = {}
    if search_filters.filters:
        query = convert_search_filters_to_query(search_filters.filters)

    companies, total_results = find_companies(index, query)
    response = CompaniesSearchResult(results=companies, total_results=total_results, index = index)
    return response


@app.get("/settings")
def get_settings(
    request: Request,
    include_companies: bool = Query(alias="includeCompanies", default=True),
):
    companies_result = {}
    response = SettingsResponse(companies=companies_result)

    if include_companies:
        companies, total_results = find_companies()
        response.companies = CompaniesSearchResult(
            results=companies, total_results=total_results
        )

    return response


@app.post(
    "/export",
    tags=["Export Results"],
    summary="Export results",
    description="Export results to file , either `json` or `csv`",
    status_code=status.HTTP_200_OK,
)
async def handle_file_export(
    request: Request, response: Response, export_request: ExportResultsRequest
):
    companies = export_request.target_results
    file_type = export_request.file_type

    if file_type not in ["json", "csv"]:

        return

    dataframe = pandas.DataFrame(companies)

    if file_type == "json":
        content = dataframe.to_json(orient="records")
        media_type = "application/json"
    else:
        content = dataframe.to_csv(index=False)
        media_type = "text/csv"

    response = Response(content=content, media_type=media_type)
    response.headers[
        "Content-Disposition"
    ] = f'attachment;filename="results.{file_type}"'
    return response
