import GatewayRepository from "../../domain/gateway/GatewayRepository";
import axios from "axios";

export default class FreteRapidoGateway implements GatewayRepository{
    async saveQuotes(data: any): Promise<any> {
        const response = await axios({
            url: "https://sp.freterapido.com/api/v3/quote/simulate",
            method: "post",
            data
        });
        return response.data;
    }
}