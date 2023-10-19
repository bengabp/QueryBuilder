FROM python:3.9

COPY . .

RUN pip install -r backend/requirements.txt

EXPOSE 8000

CMD [ "uvicorn" , "main:app", "--app-dir=backend/", "--host=0.0.0.0"]
