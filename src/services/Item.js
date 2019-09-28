import { get, post } from "services";

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

  static publish(values) {
    return post('/items/', values);
  }
}

export default Item;