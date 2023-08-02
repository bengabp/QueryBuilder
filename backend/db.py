""" This module contains config for mongodb """

import pymongo
from pymongo.mongo_client import MongoClient
from config import create_logger, BASE_DIR
import os
from pymongo.errors import BulkWriteError, DuplicateKeyError
from pymongo.collection import Collection
from pymongo.database import Database

import time
import json
import uuid
from typing import Any, Optional


class DBConnection:
	def __init__(self):
		""" Defines all attributes for a mongodb client connection """
		self.logger = create_logger("Database")
		self._db_name = "QueryBuilder"
		self.MONGO_CONNECTION_STRING = os.environ["MONGO_CONN_URI"]
		self.SERVER_SELECTION_TIMEOUT = 3600000

		self.companies: Optional[Collection] = None
	
		self.db: Optional[Database] = None

	def connect(self):
		""" Connects to a mongodb instance """
		self.logger.info("Connecting to cluster ..")
		client = pymongo.MongoClient(self.MONGO_CONNECTION_STRING,
									 serverSelectionTimeoutMS=self.SERVER_SELECTION_TIMEOUT)
		self.logger.info("Connected !")
		self.db = client[self._db_name]

		# Define collections
		self.companies: Collection = self.db["companies"]
		self.companies.create_index("uuid", unique = True)
		
	def migrate_companies_data(self):
		"""
		Migrates the companies data from the json text file to a mongodb collection
		:returns:None
		"""
		with open(os.path.join(BASE_DIR, "assets/es_data.json")) as raw_json:
			for line in raw_json:
				json_data = json.loads(line)
				company = json_data["_source"]
				try:
					self.companies.insert_one(company)
					self.logger.info(f"Adding company => {company['uuid']}")
				except DuplicateKeyError:
					self.logger.info("Ignoring duplicate company uuids")


db = DBConnection()
db.connect()


