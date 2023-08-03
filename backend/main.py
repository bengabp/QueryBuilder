import os
import sys
from fastapi import FastAPI, Query, status, HTTPException, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from config import logger
from db import db
import pandas
from typing import Dict, List
from response_models import CompletionsResponse, CompaniesSearchResult, SearchRequest
from constants import field_mappings
from utils.completions import get_search_suggestions

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins = ["*"],
	allow_credentials = True,
	allow_methods = ["*"],
	allow_headers = ["*"]
)


@app.get(
	"/completions",
	name = "completions",
	tags = ["Completions"],
	summary = "Get completions",
	description = "Get completions for search fields",
	responses = {
		status.HTTP_200_OK: {
			"model": CompletionsResponse
		}
	}
)
def get_completions(request: Request,
					q = Query(
						default = "",
						description = "String to search for, leaving this field empty will return some random results..",
					),
					field_path = Query(
						default = "name",
						description = "The path to the field to get completions for",
						min_length = 3,
						example = "fundings.items.amount"
					)
					):
	""" Get completions for search query using mongodb aggregate queries/pipelines """
	corresponding_field = field_mappings[field_path]["dKey"]
	completions = get_search_suggestions(corresponding_field, q, limit = 20)
	return CompletionsResponse(completions = completions)


@app.get(
	"/companies_first",
	name = "companies_first",
	summary = "Get first x companies when page loads",
	responses = {
		status.HTTP_200_OK: {
			"model": CompaniesSearchResult
		}
	}
)
def get_initial_load_data(request: Request):
	result = db.companies.find({}).limit(10)
	companies = []
	for company in result:
		company.pop("_id", None)
		companies.append(company)
	return CompaniesSearchResult(matches = companies, total_matches = len(companies))


@app.post(
	"/search",
	name = "companies_search",
	tags = ["Search"],
	summary = "Companies Search",
	description = "Companies search endpoint for react frontend",
	responses = {
		status.HTTP_200_OK: {
			"model": CompaniesSearchResult
		}
	}
)
def companies_search(request: Request, search_filters: SearchRequest):
	""" Start building pipeline """
	pipeline = []
	for search_filter in search_filters.filters:
		query = ".".join([*search_filter.parents, search_filter.data_key])
		query = field_mappings[query]["dKey"]
		
		stage = {}
		
		if search_filter.d_type == "string":
			if search_filter.current_option == "includes_any":
				stage = {"$match": {query: {"$in": search_filter.values}}}
			elif search_filter.current_option == "includes_all":
				stage = {"$match": {query: {"$all": search_filter.values}}}
			elif search_filter.current_option == "does_not_include":
				stage = {"$match": {query: {"$not": {"$in": search_filter.values}}}}
			elif search_filter.current_option == "does_not_include_all":
				stage = {"$match": {query: {"$not": {"$all": search_filter.values}}}}
			elif search_filter.current_option == "does_not_equal":
				stage = {"$match": {query: {"$ne": search_filter.values[0]}}}
			elif search_filter.current_option == "starts_with":
				stage = {"$match": {query: {"$regex": f"^{search_filter.values[0]}", "$options": "i"}}}
			elif search_filter.current_option == "is_blank":
				if search_filter.values[0] in [False, "false"]:
					stage = {"$match": {"$or": [
						{query: {"$exists": True}},
						{query: {"$ne": ""}},
						{query: {"$ne": None}},
						{query: {"$ne": []}}
					]}}
				else:
					stage = {"$match": {"$or": [
						{query: {"$exists": False}},
						{query: {"$eq": ""}},
						{query: {"$eq": None}},
						{query: {"$eq": []}}
					]}}
			elif search_filter.current_option == "equals":
				stage = {"$match": {query: search_filter.values[0]}}
		
		elif search_filter.d_type == "number":
			if search_filter.current_option == "between":
				stage = {"$match": {query: {"$gte": search_filter.values[0], "$lte": search_filter.values[1]}}}
			elif search_filter.current_option == "does_not_equal":
				stage = {"$match": {query: {"$ne": search_filter.values[0]}}}
			elif search_filter.current_option == "greater_than_or_equal_to":
				stage = {"$match": {query: {"$gte": search_filter.values[0]}}}
			elif search_filter.current_option == "equals":
				stage = {"$match": {query: search_filter.values[0]}}
			elif search_filter.current_option == "less_than_or_equal_to":
				stage = {"$match": {query: {"$lte": search_filter.values[1]}}}
			elif search_filter.current_option == "is_blank":
				if search_filter.values[0] in [False, "false"]:
					stage = {"$match": {"$or": [
						{query: {"$exists": True}},
						{query: {"$ne": ""}},
						{query: {"$ne": None}},
						{query: {"$ne": []}}
					]}}
				else:
					stage = {"$match": {"$or": [
						{query: {"$exists": False}},
						{query: {"$eq": ""}},
						{query: {"$eq": None}},
						{query: {"$eq": []}}
					]}}
		elif search_filter.d_type == "date":
			pass
		
		else:
			print("unsupported data type !")
		
		pipeline.append(stage)
	
	results = db.companies.aggregate(pipeline)
	matches = []
	for record in results[:1000]:
		record.pop("_id", None)
		matches.append(record)
	
	total_matches = len(matches)
	return CompaniesSearchResult(matches = matches, total_matches = total_matches)
