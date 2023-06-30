export default interface FreightRepository {
    save(name: string, service: string, deadline: number, price: number, dispatcher_id: string): Promise<any>;
    getQuotes(limit?: number): Promise<any>;
}