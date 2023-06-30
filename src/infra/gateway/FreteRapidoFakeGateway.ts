import GatewayRepository from "../../domain/gateway/GatewayRepository";

interface IFreight {
  recipient: {
    type: number;
    country: string;
    zipcode: number;
  };
  dispatchers: Dispatcher[];
  simulation_type: [];
}

interface Dispatcher {
  registered_number: string;
  zipcode: number;
  volumes: {
    category: string;
    amount: number;
    unitary_weight: number;
    price: number;
    sku: string;
    height: number;
    width: number;
    length: number;
  }[];
}

export default class FreteRapidoFakeRepository implements GatewayRepository {
  #quotes: any =  []

  constructor() {
    this.#quotes = []
  }

  async saveQuotes(data: IFreight): Promise<any> {
    return {
      dispatchers: [
        {
          id: "6499d787a82db35fc4349776",
          request_id: "6499d787a82db35fc4349775",
          registered_number_shipper: "25438296000158",
          registered_number_dispatcher: "25438296000158",
          zipcode_origin: 29161376,
          offers: [
            {
              offer: 1,
              table_reference: "63b7fd854ed2f3f5dc78b4f5",
              simulation_type: 0,
              carrier: {
                name: "CORREIOS",
                registered_number: "34028316000103",
                state_inscription: "ISENTO",
                logo: "",
                reference: 281,
                company_name: "EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS",
              },
              service: "Normal",
              delivery_time: {
                days: 5,
                hours: 19,
                minutes: 34,
                estimated_date: "2023-07-03",
              },
              expiration: "2023-07-26T18:23:03.378588586Z",
              cost_price: 78.03,
              final_price: 78.03,
              weights: {
                real: 13,
                used: 17,
              },
              correios: {},
              original_delivery_time: {
                days: 5,
                hours: 19,
                minutes: 34,
                estimated_date: "2023-07-03",
              },
            },
            {
              offer: 2,
              table_reference: "63098cb1907115d135576a43",
              simulation_type: 0,
              carrier: {
                name: "CORREIOS",
                registered_number: "34028316000103",
                state_inscription: "ISENTO",
                logo: "https://s3.amazonaws.com/public.prod.freterapido.uploads/correios/correios-pac.jpg",
                reference: 281,
                company_name: "EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS",
              },
              service: "PAC",
              service_code: "03298",
              service_description: "PAC CONTRATO AG",
              delivery_time: {
                days: 5,
                estimated_date: "2023-07-03",
              },
              expiration: "2023-07-26T18:23:03.378604217Z",
              cost_price: 92.45,
              final_price: 92.45,
              weights: {
                real: 13,
                used: 17,
              },
              correios: {},
              original_delivery_time: {
                days: 5,
                estimated_date: "2023-07-03",
              },
            },
            {
              offer: 3,
              table_reference: "646b59b451f2b9d5942d250a",
              simulation_type: 0,
              carrier: {
                name: "BTU BRASPRESS",
                registered_number: "48740351002702",
                state_inscription: "103898530",
                logo: "https://s3.amazonaws.com/public.prod.freterapido.uploads/transportadora/foto-perfil/48740351002702.png",
                reference: 474,
                company_name: "BRASPRESS TRANSPORTES URGENTES LTDA",
              },
              service: "Normal",
              delivery_time: {
                days: 5,
                hours: 19,
                minutes: 34,
                estimated_date: "2023-07-03",
              },
              expiration: "2023-07-26T18:23:03.378591819Z",
              cost_price: 93.35,
              final_price: 103.35,
              weights: {
                real: 13,
                cubed: 16,
                used: 16,
              },
              original_delivery_time: {
                days: 5,
                hours: 19,
                minutes: 34,
                estimated_date: "2023-07-03",
              },
            },
            {
              offer: 4,
              table_reference: "63098cac907115d135576a3c",
              simulation_type: 0,
              carrier: {
                name: "CORREIOS",
                registered_number: "34028316000103",
                state_inscription: "ISENTO",
                logo: "https://s3.amazonaws.com/public.prod.freterapido.uploads/correios/correios-sedex.jpg",
                reference: 281,
                company_name: "EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS",
              },
              service: "SEDEX",
              service_code: "03220",
              service_description: "SEDEX CONTRATO AG",
              delivery_time: {
                days: 1,
                estimated_date: "2023-06-27",
              },
              expiration: "2023-07-26T18:23:03.378602609Z",
              cost_price: 162.68,
              final_price: 162.68,
              weights: {
                real: 13,
                used: 17,
              },
              correios: {},
              original_delivery_time: {
                days: 1,
                estimated_date: "2023-06-27",
              },
            },
          ],
        },
      ],
    };
  }
  
}
