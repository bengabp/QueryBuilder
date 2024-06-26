# QueryBuilder
Powerful project to search through a custom dataset like crunchbase


## Frontend
The frontend has been built with react and material ui
Before running the frontend make sure you have Node.js and npm installed on your pc.
Make sure to change the api_uri in `/frontend/src/components/queryblocks/AutocompleteField.jsx`
You can start the React frontend by running this command inside the `frontend/` directory

### Running the frontend
- Linux
    if you already run linux, then you could use the bash script `start_frontend.sh`
- Windows
    ```bash
    # Install packages
    cd frontend/
    npm install --legacy-peer-deps
    # Build project
    npm run build
    # Serve project
    npm install --legacy-peer-deps serve
    npm run serve
    ```

## Backend
The backend has been written in fastapi
To run the backend server you need to make sure you have python3.9 
installed on your pc. Then install the packages using this command
```commandline
pip install -r requirements.txt
```

Start the api server. This command must be run inside the `backend/` directory
```commandline
uvicorn --host 0.0.0.0 --port 8080
```

Alternatively you could run the backend using docker
```commandline
docker-compose up --build
```

## Database
Application is strictly based on mongodb database.
It relies on using aggregate searches from mongodb which is quite powerful.
Aggregate pipelines allow you to index your data, performing more complex 
queries than just normal find and find_one commands.


## ProTip: 
- When you run the api server go to /redoc to view the api documentation
- You can use the `migrate_companies_data` method in the `DBConnection` class in backend/db.py to migrate your data

