export default class Freight {
    constructor(readonly name:string, readonly service:string, readonly deadline: number, readonly price: number, readonly dispatcher_id: string) {
        if (name === "") throw new Error("Name is required");
        if (service === "") throw new Error("Service is required");
        if (dispatcher_id === "") throw new Error("Dispatcher ID is required");
    }
}