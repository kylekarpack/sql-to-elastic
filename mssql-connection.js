const sql = require("mssql");

const mssqlConfig = require("./connection.json");

class MsSqlConnector {

	constructor() {
	}

	async init() {
		try {
			this.pool = await sql.connect(mssqlConfig);
		} catch (err) {
			throw err;
		}
	}


	async query(queryText) {
		await this.init();
		let result = await this.pool.request().query(queryText);
		return result;
	}

}

module.exports = {
	MsSqlConnector
};