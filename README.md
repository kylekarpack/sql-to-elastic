# sql-to-elastic

## Usage

1. Run ```yarn install``` or ```npm install``` to install dependencies
2. Add a file at ```./config/mssql.json``` containing private connection options for MSSQL in the following format:
```json
{
    "user": "...",
    "password": "...",
    "server": "localhost", // You can use "localhost\\instance" to connect to named instance
    "database": "...",
 
    "options": {
        "encrypt": true // Use this if you're on Windows Azure
    }
}
```
3. Add a file at ```./config/elastic.json``` containing private connection options for ElasticSearch in the following format:
```json
{
    "client": {
        "host": "localhost:9200",
        "log": "trace"
    },
    "bulk": {
        "_index": "index",
        "_type": "type"
    }
}
```
4. Add a query to transfer data at ```query.sql```
5. Run the utility with ```yarn start```/```npm start``` or ```node index.js```