import Freight from "../../src/domain/entity/Freight";

test('Deve criar um objeto frete', function() {
    const freight = new Freight("EXPRESSO FR", "Rodoviário", 3, 17, 'fake');
    expect(freight.name).toBe("EXPRESSO FR");
    expect(freight.service).toBe("Rodoviário");
    expect(freight.deadline).toBe(3);
    expect(freight.price).toBe(17);
    expect(freight. dispatcher_id).toBe('fake');
});

test('Não deve criar um objeto frete sem o nome', function() {
    expect(() => new Freight("", "Rodoviário", 3, 17, "fake")).toThrow(new Error("Name is required"));
})

test('Não deve criar um objeto frete sem o tipo de serviço', function() {
    expect(() => new Freight("CORREIOS", "", 3, 17, "fake")).toThrow(new Error("Service is required"));
})

test('Não deve criar um objeto frete sem o id do expedidor', function() {
    expect(() => new Freight("CORREIOS", "Rodoviário", 3, 17, "")).toThrow(new Error("Dispatcher ID is required"));
})