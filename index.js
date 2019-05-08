const fs = require("fs");
const query = fs.readFileSync("./query.sql").toString();

const { MsSqlConnector } = require("./mssql-connection");

class App {

    async run() {
        const sqlData = await this.getSqlData();
        console.log(sqlData);
        process.exit();   
    }

    async getSqlData() {
        const mssqlConnection = new MsSqlConnector();
        let data = await mssqlConnection.query(query);
        return data;
    }
}


const app = new App();
app.run();