const fs = require("fs"),
	query = fs.readFileSync("./query.sql").toString(),
	totalQuery = fs.readFileSync("./total.sql").toString(),
	{ MsSqlConnector } = require("./mssql-connection"),
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
			let rowCount = await mssqlConnection.query(totalQuery);
			rowCount = Number(rowCount[0].total);

			// Partition the SQL table into some sensible chunks
			for (let i = 0; i < rowCount; i+= MAX_ROWS) {

				// Process each chunk of MAX_ROWS before moving to the next
				const sqlData = await mssqlConnection.query(query, { offset: i, limit: MAX_ROWS });
				await elasticConnection.bulkInsert(sqlData);

				// eslint-disable-next-line no-console
				console.log(`Handled rows ${i} to ${i + MAX_ROWS} of ${rowCount}`);
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