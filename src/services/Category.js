import { get } from "services"

class Category {
  static list() {
    return get(`/categories/`);
  }
}

export default Category;