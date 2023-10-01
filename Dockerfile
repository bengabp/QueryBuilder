FROM python:3.9

COPY . .

RUN pip install -r backend/requirements.txt

CMD [ "uvicorn" , "main:app", "--app-dir=backend/"]