from typing import List, Dict
from pydantic import BaseModel, Field
from response_models import Filter

class SearchFilter(BaseModel):
    query: str = Field(...)
    current_option: str = Field(alias="currentOption")
    values: List = Field(alias="values")

class SearchRequest(BaseModel):
    filters: List[SearchFilter] = Field(description = "List of filters", default = [])


class ExportResultsRequest(BaseModel):
    target_results: List[Dict] = Field(
        description="Target results in frontend", alias="targetResults"
    )
    file_type: str = Field(
        description="File type to export `csv` or `json`", alias="fileType"
    )
