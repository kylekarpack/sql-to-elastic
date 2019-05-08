# sql-to-elastic

## Usage

1. Run ```yarn install``` or ```npm install``` to install dependencies
2. Add a file containing private connection options form MSSQL in the following format:
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
3.