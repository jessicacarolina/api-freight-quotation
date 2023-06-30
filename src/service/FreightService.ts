import FreightRepository from "../domain/repository/FreightRepository";
import GatewayRepository from "../domain/gateway/GatewayRepository";
import AppError from "../infra/shared/error/AppError";

interface Freight {
  recipient: {
    address: {
      zipcode: string;
    };
  };
  volumes: {
    category: number;
    amount: number;
    unitary_weight: number;
    price: number;
    sku: string;
    height: number;
    width: number;
    length: number;
  }[];
}

export default class FreightService {
  constructor(readonly freightRepository: FreightRepository, readonly gatewayRepository: GatewayRepository) {}

  async makeQuote(data: Freight): Promise<any> {
    if(!data.recipient || !data.recipient.address || !data.recipient.address.zipcode) throw new AppError("Recipient is required");
    data.volumes.forEach((volume) => {
      if(!volume.category) throw new AppError("Category is required");
      if(!volume.amount) throw new AppError("Amount is required");
      if(!volume.unitary_weight) throw new AppError("Unitary Weight is required");
      if(!volume.price) throw new AppError("Price is required");
      if(!volume.sku) throw new AppError("SKU is required");
      if(!volume.height) throw new AppError("Height is required");
      if(!volume.width) throw new AppError("Width is required");
      if(!volume.length) throw new AppError("Length is required");
    });

    const volumes = data.volumes.map((volume: any) => ({
      ...volume,
      category: String(volume.category),
      unitary_price: 0.2,
    }));
    const input = {
      shipper: {
        registered_number: process.env.CNPJ,
        token: process.env.TOKEN,
        platform_code: process.env.PLATFORM_CODE,
      },
      recipient: {
        type: 1,
        country: "BRA",
        zipcode: Number(data.recipient.address.zipcode),
      },
      dispatchers: [
        {
          registered_number: process.env.CNPJ,
          zipcode: 29161376,
          volumes: volumes,
        },
      ],
      simulation_type: [0],
    };
    const freight = await this.gatewayRepository.saveQuotes(input);
    const [quotes] = freight.dispatchers.map((dispatcher: any) => {
      const id = dispatcher.id;
      const carrier = dispatcher.offers.map((offer: any) => ({
        name: offer.carrier.name,
        service: offer.service,
        deadline: offer.delivery_time.days,
        price: offer.final_price,
      }));
      return {
        id,
        carrier,
      };
    });
    await Promise.all(
      quotes.carrier.map(async (quote: any) => {
        await this.freightRepository.save(quote.name, quote.service, quote.deadline, quote.price, quotes.id);
      })
    );
    return quotes;
  }

  async metrics(last_quotes?: number): Promise<any> {
    const carrier = await this.freightRepository.getQuotes(last_quotes);
    if (!carrier) return [];
    return carrier;
  }
}