# sql-to-elastic

## Usage

1. Run ```yarn install``` or ```npm install``` to install dependencies
2. Add a file at ```./config/mssql.json``` containing private connection options for MSSQL in the following format:
```json
{
    "user": "...",
    "password": "...",
    "server": "localhost",
    "database": "...",
 
    "options": {
        "encrypt": true
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
4. Add a query to select the total number of rows to transfer at ```total.sql```
5. Add a query to select data to transfer data at ```query.sql```
6. Run the utility with ```yarn start```/```npm start``` or ```node index.js```

## Issues
* Paging is very tightly coupled to named SQL parameters right now. This should be more dynamic
* Errors are not handled elegantly yet

## Next Steps
* Package as an npm package
* Add a CLI