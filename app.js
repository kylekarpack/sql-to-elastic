const fs = require("fs"),
	MsSqlConnector = require("./mssql-connection"),
	ElasticConnector = require("./elastic-connection"),
	MAX_ROWS = 100000;

class App {

	constructor(program) {
		this.program = program;
	}

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
			
			if (this.program.totalQuery) {
				const totalQuery = fs.readFileSync(this.program.totalQuery).toString();
				rowCount = await mssqlConnection.query(totalQuery);
				rowCount = Number(rowCount[0].total);
			} else {
				rowCount = Number(this.program.total);
			}

			const query = fs.readFileSync(this.program.query).toString();
			
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

module.exports = App;