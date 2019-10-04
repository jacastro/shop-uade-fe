import { get, post, put } from "services";

class Order {
  static list() {
    return get(`/orders/`);
  }

  static bySeller(sellerId) {
    return get(`/orders/seller/${sellerId}`);
  }

  static byId(itemId) {
    return get(`/orders/${itemId}`);
  }

  static create(values) {
    return post('/orders/', values);
  }

  static edit(values) {
    return put('/orders/', values);
  }
}

export default Order;