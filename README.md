# sql-to-elastic

## Installation

 ```
 $ npm i -g sql-to-elastic
 ``` 
 or 
 ```
 $ yarn global add sql-to-elastic
 ```

## Prerequisites

1. Add a file at ```./config/mssql.json``` containing private connection options for MSSQL in the following format:
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
2. Add a file at ```./config/elastic.json``` containing private connection options for ElasticSearch in the following format:
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
3. Add a query to select the total number of rows to transfer at ```total.sql```
4. Add a query to select data to transfer data at ```query.sql```

## Usage
```
$ sql-to-elastic [options]

Options:
  -V, --version            output the version number
  -e, --elastic <type>     Elastic config location (default: "./config/elastic.json")
  -m, --mssql <type>       MSSQL config location (default: "./config/elastic.json")
  -q, --query <type>       Location of query to retrieve data from SQL Server (default: "./query.sql")
  -t, --totalQuery <type>  Location of query to retrieve total rows from sql server or a total row count (default: "./total.sql")
  -r, --totalRows <type>   Total rows to process (default: 100000)
  -h, --help               output usage information
```

## Development

1. Run ```yarn install``` or ```npm install``` to install dependencies
2. Run the utility with ```yarn start```/```npm start``` or ```node index.js```

## Issues
* Paging is very tightly coupled to named SQL parameters right now. This should be more dynamic
* Errors are not handled elegantly yet