import FreightService from "../../service/FreightService";
import Http from "../http/Http";
import FreightRepository from "../repository/FreightRepositoryDatabase";
import FreteRapidoGateway from "../gateway/FreteRapidoGateway";
import Connection from "../database/Connection";

export default class FreightController {

	constructor (readonly http: Http, readonly freightRepository: FreightRepository, readonly connection: Connection) {
		http.route("post", "/quote", async function (params: any, body: any) {
            const freightRepository = new FreightRepository(connection);
            const gatewayRepository = new FreteRapidoGateway();
            const service = new FreightService(freightRepository, gatewayRepository);
			const response = service.makeQuote(body);
			return response;
		});
		http.route("get", "/metrics", async function (params: any, body: any, query: { last_quotes: number }) {
            const freightRepository = new FreightRepository(connection);
            const gatewayRepository = new FreteRapidoGateway();
            const service = new FreightService(freightRepository, gatewayRepository);
			const response = service.metrics(query.last_quotes);
			return response;
		});
	}
}