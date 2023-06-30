import axios from "axios";
import Connection from "../../src/infra/database/Connection";
import PgPromiseConnection from "../../src/infra/database/PGPromiseAdapter";

test("Deve retornar uma cotação", async function () {
  const data = {
    recipient: {
        address: {
          zipcode: "1311000",
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
  };
  const response = await axios({
		url: "http://localhost:3000/quote",
		method: "post",
    data
	});
	const freight = response.data;

  expect(Array.isArray(freight.carrier)).toBe(true);
  expect(response.status).toBe(200);
});

test("Não deve retornar uma cotação sem o zipcode", async () =>  {
   const data = {
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
   };

   await expect(axios({
		url: "http://localhost:3000/quote",
		method: "post",
      data
	})).rejects.toBeInstanceOf(axios.AxiosError);
});


afterAll(() => {
  const db = new PgPromiseConnection()
  db.query('delete from public.quote', [])
})
