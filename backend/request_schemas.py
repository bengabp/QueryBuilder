from typing import List, Dict
from pydantic import BaseModel, Field
from backend.response_models import Filter


class SearchRequest(BaseModel):
    filters: List[Filter]


class ExportResultsRequest(BaseModel):
    target_results: List[Dict] = Field(
        description="Target results in frontend", alias="targetResults"
    )
    file_type: str = Field(
        description="File type to export `csv` or `json`", alias="fileType"
    )
