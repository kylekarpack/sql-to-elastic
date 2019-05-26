#!/usr/bin/env node

const program = require("commander"),
	App = require("./app");	
	
// Use Commander.js to implement a command line interface
program
	.version("1.0.0")
	.description("A straighforward command-line tool for copying data from MSSQL to ElasticSearch")
	.option("-e, --elastic <type>", "Elastic config location", "./config/elastic.json")
	.option("-m, --mssql <type>", "MSSQL config location", "./config/elastic.json")
	.option("-q, --query <type>", "Location of query to retrieve data from SQL Server", "./query.sql")
	.option("-t, --totalQuery <type>", "Location of query to retrieve total rows from sql server or a total row count", "./total.sql")
	.option("-r, --totalRows <type>", "Total rows to process", 100000);

// eslint-disable-next-line no-undef
program.parse(process.argv); 

// Build and run the application
const app = new App(program);
app.run();