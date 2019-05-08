const fs = require("fs"),
    query = fs.readFileSync("./query.sql").toString(),
    { MsSqlConnector } = require("./mssql-connection");

class App {

    /**
     * Run the application
     * Exits on completion
     */
    async run() {
        const sqlData = await this.getSqlData();
        console.log(sqlData);
        process.exit();   
    }

    /**
     * Get data from an SQL query
     * @returns result
     */
    async getSqlData() {
        const mssqlConnection = await MsSqlConnector.build();
        return await mssqlConnection.query(query);
    }
}


const app = new App();
app.run();