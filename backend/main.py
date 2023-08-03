import os
import sys
from fastapi import FastAPI, Query, status, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from config import logger
from db import db
from response_models import CompletionsResponse

from utils.completions import get_search_suggestions

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
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
	completions = get_search_suggestions(field_path, q, limit = 10)
	return CompletionsResponse(completions = completions)
	