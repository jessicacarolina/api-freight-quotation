export default interface GatewayRepository {
    saveQuotes(data: any): Promise<any>;
}