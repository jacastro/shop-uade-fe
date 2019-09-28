import { get } from "services"

class Category {
  static list() {
    return get(`/items/`);
  }
}

export default Category;