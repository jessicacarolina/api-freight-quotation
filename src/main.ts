require('dotenv').config()
import ExpressAdapter from "./infra/http/ExpressAdapter";
import FreightController from "./infra/controlller/FreightController";
import Connection from "./infra/database/PGPromiseAdapter";
import FreightRepositoryDatabase from "./infra/repository/FreightRepositoryDatabase";

const http = new ExpressAdapter();
const connection = new Connection();
const freightRepository = new FreightRepositoryDatabase(connection);

new FreightController(http, freightRepository, connection);

http.exceptionHandler();
http.listen(3000);
