const sql = require("mssql"),
	mssqlConfig = require("./config/mssql.json");

class MsSqlConnector {

	constructor(pool) {	
		if (!pool) {
			throw "Cannot be called directly. Please call MsSqlConnector.build() to build an instance of this class";
		}
		this.pool = pool;
	}

	/**
	 * Build an instance of the MsSqlConnector
	 * @returns instance with the connection initialized
	 */
	static async build() {
		try {
			const pool = await sql.connect(mssqlConfig);
			return new MsSqlConnector(pool);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Run a query against the MSSQL Server
	 * @param {string} queryText 
	 * @returns {Object[]} results
	 */
	async query(queryText) {

		// Ensure that this has been initialized
		if (!this.pool) {
			throw "Please initialize the connection prior to issuing requests";
		}

		// Ensure that we have passed some text to run
		if (!queryText) {
			throw "Please pass query text to execute";
		}

		// Issue the request
		let result = await this.pool.request().query(queryText);
		return result.recordset;
	}

}

module.exports = {
	MsSqlConnector
};