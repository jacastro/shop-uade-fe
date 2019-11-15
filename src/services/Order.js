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
        state: order.state || 'En preparación',
        claim: {
          description: "lalala"
        }
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

  static addClaim(orderId, description) {
    return post(`/orders/${orderId}/claim`, description);
  }

  static getColor(status) {
    const colorByStatus = {
      'En preparación': 'primary',
      'En viaje': 'info',
      'Entregado': 'success',
      'No entregado': 'danger'
    }
    return colorByStatus[status] ? colorByStatus[status] : 'secondary';
  }
}

export default Order;