""" Define all configurations """
import os
import logging
from dotenv import load_dotenv
import sys
from colorlog import ColoredFormatter


BASE_DIR = os.path.dirname(os.path.realpath(__file__))

# Load env file
load_dotenv(os.path.join(BASE_DIR, ".env"))

LOG_FILES_DIR = os.path.join(BASE_DIR, "logs")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

DIRECTORIES = [
	LOG_FILES_DIR,
	TEMPLATES_DIR,
	STATIC_DIR
]


for directory in DIRECTORIES:
	if not os.path.exists(directory):
		os.mkdir(directory)


# Create logger
def create_logger(name):
	logger = logging.getLogger(name)
	logger.setLevel(logging.DEBUG)
	
	# Define a custom date format
	date_format = '%b,%d - %H:%M'
	
	# Create a formatter object with color formatting
	formatter = ColoredFormatter(
		'%(log_color)s[%(asctime)s] %(levelname)s => %(message)s',
		datefmt = date_format,
		log_colors = {
			'INFO': 'cyan',
			'DEBUG': 'green',
			'WARNING': 'yellow',
			'ERROR': 'red',
			'CRITICAL': 'red,bg_white',
		},
	)
	formatter2 = logging.Formatter('[%(asctime)s] %(levelname)s => %(message)s', datefmt = '%b,%d - %H:%M:%S')

	# Create a file handler and add it to the logger
	file_handler = logging.FileHandler(os.path.join(LOG_FILES_DIR, f"{name}.log"), mode = "a")
	file_handler.setLevel(logging.INFO)
	file_handler.setFormatter(formatter2)
	# file_handler.setFormatter(formatter)
	logger.addHandler(file_handler)

	# Create a stream handler for console output with color formatting
	stream_handler = logging.StreamHandler(sys.stdout)
	stream_handler.setLevel(logging.INFO)
	stream_handler.setFormatter(formatter)
	logger.addHandler(stream_handler)
	return logger
