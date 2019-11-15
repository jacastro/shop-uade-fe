import { get, post } from "services"
import Axios from "axios";

class User {
  static async getUserData(token) {
    const ssoData = await Axios.get(`https://uade-sso-users-api.herokuapp.com/api/me`, { 
      headers: {'Authorization': `bearer ${token}`}, 
    });

    try {
      await get(`/users/me`, null, { 
        headers: {'Authorization': `Bearer ${token}`}, 
      });
    } catch (error) {
      post(`/users?id=${ssoData.data.id}&name=${ssoData.data.fullName}&email=${ssoData.data.email}`);
    }

    return ssoData;
  }

  static listAddress(userId) {
    return get(`/users/address`);
  }

  static createAdress(userId, values) {
    return post(`/users/address`, values);
  }
}

export default User;