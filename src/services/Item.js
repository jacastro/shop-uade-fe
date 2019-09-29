import { get, post, put } from "services";

class Item {
  static list() {
    return get(`/items/`);
  }

  static search(text) {
    return get(`/items/`, { q: text || null });
  }

  static category(text) {
    return get(`/items/category/${text}`);
  }

  static bySeller(sellerId) {
    return get(`/items/seller/${sellerId}`);
  }

  static byId(itemId) {
    return get(`/items/${itemId}`);
  }

  static publish(values) {
    return post('/items/', values);
  }

  static edit(values) {
    return put('/items/', values);
  }
}

export default Item;