from pydantic import BaseModel, Field
from typing import List


class CompletionsResponse(BaseModel):
	completions: List = Field(description = "List of completions ..", default = [])
	