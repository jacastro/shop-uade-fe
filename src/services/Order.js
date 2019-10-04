import { get, post, put } from "services";
import Item from "./Item";
import User from "./User";

class Order {
  static list() {
    return get(`/orders/`);
  }

  static async byBuyer(userId) {
    const orders = await get(`/orders/buyer/${userId}`);
    const addresses = await User.listAddress(userId);
    const ordersWithData = await Promise.all(orders.data.map(async order => {
      const item = await Item.byId(order.itemId);
      return {
        ...order,
        item: item.data,
        address: addresses.data.find(address => address.id === order.address),
      }
    }));
    return ordersWithData;
  }

  static async bySeller(userId) {
    const orders = await get(`/orders/seller/${userId}`);
    const ordersWithData = await Promise.all(orders.data.map(async order => {
      const item = await Item.byId(order.itemId);
      return {
        ...order,
        item: item.data,
      }
    }));
    return ordersWithData;
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