from pydantic import BaseModel, Field
from typing import List, Dict, Union
from config import BASE_DIR
from constants import field_mappings
import json
import os

table_headings = ["name", "hq_locations.address", "participated_events.total", "founders.name"]
PAGE_SIZE = 500


class CompletionsResponse(BaseModel):
	completions: List = Field(description = "List of completions ..", default = [])
	
	
class Filter(BaseModel):
	parents: List = Field(alias = "parents")
	data_key: str = Field(alias = "dataKey")
	text: str = Field(alias = "text")
	current_option: str = Field(alias = "currentOption")
	values: List = Field(alias = "values")
	d_type: str = Field(alias = "dType")
	
	
class SearchRequest(BaseModel):
	filters: List[Filter]
	

class CompaniesSearchResult(BaseModel):
	results: List[Dict] = Field(description = "List of companies matching filters/search criteria")
	total_results: int = Field(description = "Total number of matches", serialization_alias="totalResults")
	index: int = Field(descripition = "Current page index", default = 1)
	results_per_page: int = Field(description="Results per page", serialization_alias = "resultsPerPage", default = PAGE_SIZE)


with open(os.path.join(BASE_DIR, "assets/filters.json")) as filter_json:
	filters  = json.load(filter_json)

with open(os.path.join(BASE_DIR, "assets/options.json")) as option_json:
	options = json.load(option_json)


class SettingsResponse(BaseModel):
	filters: Dict = Field(alias="filters", default = filters)
	companies: Union[Dict, CompaniesSearchResult] = Field(default = {})
	field_mappings: Dict = Field(alias="fieldMappings", default = field_mappings)
	options: Dict = Field(alias="dataTypesAndOptions",default = options)
	table_headings: List = Field(alias="tableHeadings", default = table_headings)
	parent_filters: List = Field(alias="parentFilters", default = [
		"basic_info",
		"employees",
		"events",
		"founders",
		"income_funding",
		"investors",
		"industries",
		"innovations",
		"ipo_round",
		"kpi_summary",
		"similar_companies",
		"revenues"
	])
	filter_key_indices: Dict = Field(alias = "filterKeyIndices", default = {
		"basic_info": [
			"Basic Info"
		],
		"hq_details": [
			"Basic Info",
			"Headquaters"
		],
		"tech_stacks": [
			"Basic Info",
			"Tech Stacks"
		],
		"tech_stacks_company": [
			"Basic Info",
			"Tech Stacks",
			"Companies"
		],
		"employees": [
			"Employees"
		],
		"events": [
			"Events"
		],
		"participated_events": [
			"Events",
			"Participated Events"
		],
		"founders": [
			"Founders"
		],
		"income_funding": [
			"Income & Funding"
		],
		"funding_details": [
			"Income & Funding",
			"Fundings"
		],
		"funding_investor_details": [
			"Income & Funding",
			"Fundings",
			"Investors"
		],
		"investors": [
			"Investor & Investments"
		],
		"investor_details": [
			"Investors & Investments",
			"Investors"
		],
		"investment_details": [
			"Investors & Investments",
			"Investments"
		],
		"industries": [
			"Industries"
		],
		"ipo_round": [
			"IPO Round"
		],
		"ipo_round_investors": [
			"IPO Round",
			"Investors"
		],
		"kpi_summary": [
			"Kpi Summary"
		],
		"kpi_summary_values": [
			"Kpi Summary",
			"Values"
		],
		"kpi_summary_valuations": [
			"Kpi Summary",
			"Valuations"
		],
		"similar_companies": [
			"Similar Companies"
		],
		"revenues": [
			"Revenues"
		],
		"innovations": [
			"Innovations"
		]
	})


