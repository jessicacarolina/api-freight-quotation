import Connection from "../database/Connection";

export default class FreightRepositoryDatabase {

    constructor (readonly connection: Connection) {    
    }
    async getQuotes(limit: number): Promise<any[] | undefined> {
        let query = `
        SELECT 
            name, 
            SUM(price) AS total_price, 
            COUNT(*) AS count_items, 
            ROUND(AVG(price)::numeric, 2) AS average,
            (SELECT MIN(price) FROM (SELECT price FROM public.quote`;
      
        if (limit) query += ` ORDER BY id desc LIMIT ${limit}`;

        query += `) AS limited_subquery) AS minimum,
            (SELECT MAX(price) FROM (SELECT price FROM public.quote`;
           
        if (limit) query += ` ORDER BY id desc LIMIT ${limit}`;

        query += `) AS limited_subquery) AS maximum
            FROM (SELECT * FROM public.quote`;

        if (limit) query += ` ORDER BY id desc LIMIT ${limit}`;

        query += `) AS subquery GROUP BY name;`;
 
        const quoteData = await this.connection.query(query, []);
        if (!quoteData) return;
        return quoteData;
    }
    async save(name: string, service: string, deadline: number, price: number, dispatcher_id: string): Promise<void> {
        const quoteData = await this.connection.query("INSERT INTO public.quote (name, service, deadline, price, dispatcher_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, service, deadline, price, dispatcher_id]);        
        return quoteData;
    }

}  
