const elasticsearch = require("elasticsearch"),
	elasticConfig = require("./config/elastic.json");

class ElasticConnector {

	constructor() {
		this.client = new elasticsearch.Client(elasticConfig.client);
	}

	/**
	 * Create a formatted body for bulk inserting elastic rows
	 * @param  {Object[]} data
	 * @returns {Object[]} body
	 */
	createBulkInsertBody(data) {
		const output = [];
		for (let row of data) {
			// Row {n}: describe the operation to ElasticSearch
			output.push({
				create: {
					_index: elasticConfig.bulk._index,
					_type: elasticConfig.bulk._type,
					_id: row.id
				}
			});
			// Row {n + 1}: provide the data to be inserted
			output.push(row);
		}

		return output;
	}

	/**
	 * Issue the bulk insert request in ElasticSearch
	 * @param  {Object[]} data
	 * @returns bulkInsertResult
	 */
	async bulkInsert(data) {

		const body = this.createBulkInsertBody(data);

		try {
			return await this.client.bulk({
				body: body,
			});
		} catch (err) {
			throw err;
		}
	
	}

}

module.exports = {
	ElasticConnector
};