import { get } from "services"

class Category {
  static list() {
    return get(`/waranty/`);
  }
}

export default Category;