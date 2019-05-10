const fs = require("fs"),
	program = require("commander");
	
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


const { MsSqlConnector } = require("./mssql-connection"),
	{ ElasticConnector } = require("./elastic-connection");

const MAX_ROWS = 100000;

class App {

	/**
	 * Run the application
	 * Exits on completion
	 */
	async run() {
		try {

			// Get both connections
			const mssqlConnection = await MsSqlConnector.build(),
				elasticConnection = ElasticConnector.build();

			// Get the total number of rows
			let rowCount;
			
			if (program.totalQuery) {
				const totalQuery = fs.readFileSync(program.totalQuery).toString();
				rowCount = await mssqlConnection.query(totalQuery);
				rowCount = Number(rowCount[0].total);
			} else {
				rowCount = Number(program.total);
			}

			const query = fs.readFileSync(program.query).toString();
			
			// Partition the SQL table into some sensible chunks
			for (let i = 0; i < rowCount; i+= MAX_ROWS) {

				const d = new Date();
				
				// eslint-disable-next-line no-console
				console.log(`Starting rows ${i} to ${i + MAX_ROWS} of ${rowCount}`);

				// Process each chunk of MAX_ROWS before moving to the next
				const sqlData = await mssqlConnection.query(query, { offset: i, limit: MAX_ROWS });
				await elasticConnection.bulkInsert(sqlData);

				// eslint-disable-next-line no-console
				console.log(`Handled rows ${i} to ${i + MAX_ROWS} of ${rowCount} in ${Math.ceil((new Date() - d) / 1000) } seconds`);
			}

			// eslint-disable-next-line no-undef
			process.exit();
		} catch (err) {
			throw err;
		}
	}

}


const app = new App();
app.run();