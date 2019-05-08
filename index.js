const fs = require("fs"),
	query = fs.readFileSync("./query.sql").toString(),
	{ MsSqlConnector } = require("./mssql-connection"),
	{ ElasticConnector } = require("./elastic-connection");

class App {

	/**
	 * Run the application
	 * Exits on completion
	 */
	async run() {
		const sqlData = await this.getSqlData();
		const result = await this.insertElasticData(sqlData);
		// eslint-disable-next-line no-undef
		process.exit();
		return result;
	}

	/**
	 * Get data from an SQL query
	 * @returns result
	 */
	async getSqlData() {
		const mssqlConnection = await MsSqlConnector.build();
		return await mssqlConnection.query(query);
	}

	async insertElasticData(data) {
		const elasticClient = new ElasticConnector();
		return await elasticClient.bulkInsert(data);
	}
}


const app = new App();
app.run();