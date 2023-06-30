import FreteRapidoFakeRepository from "../../src/infra/gateway/FreteRapidoFakeGateway";
import FreightFakeRepository from "../../src/infra/repository/FreightFakeRepositoryDatabase";
import FreightService from "../../src/service/FreightService";
import AppError from "../../src/infra/shared/error/AppError";

test("Deve retornar um array com as cotaçoes de frete", async function () {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  const freight = await freightService.makeQuote({
    recipient: {
      address: {
        zipcode: "01311000",
      },
    },
    volumes: [
      {
        category: 7,
        amount: 1,
        unitary_weight: 5,
        price: 349,
        sku: "abc-teste-123",
        height: 0.2,
        width: 0.2,
        length: 0.2,
      },
      {
        category: 7,
        amount: 2,
        unitary_weight: 4,
        price: 556,
        sku: "abc-teste-527",
        height: 0.4,
        width: 0.6,
        length: 0.15,
      },
    ],
  });

  expect(freight).toHaveProperty("id");
  expect(freight.carrier).toHaveLength(4);
});

test("Deve retornar os valores dos fretes agrupados por transportadora", async function () {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  freightRepository.save("CORREIOS", "Normal", 5, 78.03, "6499d787a82db35fc4349776");
  freightRepository.save("BTU", "Normal", 5, 78.06, "6499d787a82db35fc4349773");
  freightRepository.save("DHL", "Normal", 5, 78.01, "6499d787a82db35fc4349775");
  freightRepository.save("CORREIOS", "Normal", 5, 98.03, "6499d787a82db35fc4349776");
  const freight = await freightService.metrics();

  expect(freight).toEqual([
    {
      name: "CORREIOS",
      total_price: 176.06,
      count_items: 2,
      average: "88.03",
      minimum: 78.03,
      maximum: 98.03,
    },
    {
      name: "BTU",
      total_price: 78.06,
      count_items: 1,
      average: "78.06",
      minimum: 78.06,
      maximum: 78.06,
    },
    {
      name: "DHL",
      total_price: 78.01,
      count_items: 1,
      average: "78.01",
      minimum: 78.01,
      maximum: 78.01,
    },
  ]);
});

test("Deve retornar os valores dos fretes agrupados por transportadora limitados a 5 registros", async function () {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  freightRepository.save("CORREIOS", "Normal", 5, 78.03, "6499d787a82db35fc4349776");
  freightRepository.save("BTU", "Normal", 5, 78.06, "6499d787a82db35fc4349773");
  freightRepository.save("DHL", "Normal", 5, 78.01, "6499d787a82db35fc4349775");
  freightRepository.save("CORREIOS", "Normal", 5, 98.03, "6499d787a82db35fc4349776");
  const freight = await freightService.metrics(1);

  expect(freight).toEqual([
    {
      name: "CORREIOS",
      total_price: 176.06,
      count_items: 2,
      average: "88.03",
      minimum: 78.03,
      maximum: 98.03,
    },
  ]);
});

test("Deve lancar um erro se não enviar o recipient, address, zipcode", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 1,
          unitary_weight: 5,
          price: 349,
          sku: "abc-teste-123",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Recipient is required"));
});

test("Deve lancar um erro se não enviar o recipient, address, zipcode", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          // @ts-ignore
          category: "",
          amount: 1,
          unitary_weight: 5,
          price: 349,
          sku: "abc-teste-123",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Category is required"));
});

test("Deve lancar um erro se não enviar o Amount", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          // @ts-ignore
          amount: "",
          unitary_weight: 5,
          price: 349,
          sku: "abc-teste-123",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Amount is required"));
});

test("Deve lancar um erro se não enviar o Unitary Weight", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 7,
          // @ts-ignore
          unitary_weight: "",
          price: 349,
          sku: "abc-teste-123",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Unitary Weight is required"));
});

test("Deve lancar um erro se não enviar o Price", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 7,
          unitary_weight: 5,
          // @ts-ignore
          price: "",
          sku: "abc-teste-123",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Price is required"));
});

test("Deve lancar um erro se não enviar o SKU", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 7,
          unitary_weight: 5,
          price: 349,
          // @ts-ignore
          sku: "",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("SKU is required"));
});

test("Deve lancar um erro se não enviar o Height", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 7,
          unitary_weight: 5,
          price: 349,
          sku: "sasa",
          // @ts-ignore
          height: "",
          width: 0.2,
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Height is required"));
});

test("Deve lancar um erro se não enviar o Width", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 7,
          unitary_weight: 5,
          price: 349,
          sku: "sasa",
          height: 0.32,
          // @ts-ignore
          width: "",
          length: 0.2,
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Width is required"));
});

test("Deve lancar um erro se não enviar o Length", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);

  await expect(
    freightService.makeQuote({
      recipient: {
        address: {
          zipcode: "123156",
        },
      },
      volumes: [
        {
          category: 7,
          amount: 7,
          unitary_weight: 5,
          price: 349,
          sku: "sasa",
          height: 0.32,
          width: 0.2,
          // @ts-ignore
          length: "",
        },
        {
          category: 7,
          amount: 2,
          unitary_weight: 4,
          price: 556,
          sku: "abc-teste-527",
          height: 0.4,
          width: 0.6,
          length: 0.15,
        },
      ],
    })
  ).rejects.toEqual(new AppError("Length is required"));
});

test("Deve retornar um array vazio se não tiver nenhum registro encontrado", async () => {
  const freightRepository = new FreightFakeRepository();
  const gatewayRepository = new FreteRapidoFakeRepository();
  const freightService = new FreightService(freightRepository, gatewayRepository);
  const freight = await freightService.metrics();

  expect(freight.length).toBe(0);
});
