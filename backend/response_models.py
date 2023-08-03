from pydantic import BaseModel, Field
from typing import List, Dict


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
	matches: List[Dict] = Field(description = "List of companies matching filters/search criteria")
	total_matches: int = Field(description = "Total number of matches")
	