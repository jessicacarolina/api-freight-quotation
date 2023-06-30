export default class FreightFakeRepositoryDatabase {
  quotes: any[];
  constructor() {
    this.quotes = [];
  }
  async save(name: string, service: string, deadline: number, price: number, dispatcher_id: string): Promise<void> {
    this.quotes.push({ name, service, deadline, price, dispatcher_id });
  }
  async getQuotes(limit?: number | undefined): Promise<any> {
    const groups: any = {};
    this.quotes.forEach(item => {
      const { name, price } = item;
      if (!groups[name]) {
        groups[name] = {
          name: name,
          total_price: price,
          count_items: 1,
          average: price.toFixed(2),
          minimum: price,
          maximum: price,
        };
      } else {
        groups[name].total_price += price;
        groups[name].count_items++;
        groups[name].average = (groups[name].total_price / groups[name].count_items).toFixed(2);

        if (price < groups[name].minimum) {
          groups[name].minimum = price;
        }
        if (price > groups[name].maximum) {
          groups[name].maximum = price;
        }
      }
    });

    const results = Object.values(groups);
    if (limit) {
      return results.slice(0, limit)
    }
    return results
  }
}
