import { get, post } from "services"
import Axios from "axios";

class User {
  static async getUserData(token) {
    const ssoData = await Axios.get(`https://uade-sso-users-api.herokuapp.com/api/me`, { 
      headers: {'Authorization': `bearer ${token}`}, 
    });

    try {
      await get(`/user/${ssoData.data.id}`);
    } catch (error) {
      post(`/user?id=${ssoData.data.id}&name=${ssoData.data.fullName}`);
    }

    return ssoData;
  }
}

export default User;