import axios from 'axios';
import SSOAuth from "lib/sso";

const baseUrl = process.env.API_URI || 'https://shop-uade-be.herokuapp.com';

const SSO = new SSOAuth({
  tenantId: '380f7247-c8e7-4036-b81f-29e2d7a6282f',
  loginCallback: window.location.href,
  logoutCallback: window.location.href,
});

if(window.location.hash !== '')
    SSO.saveUserToken();

const jwt = SSO.getJWT();
const headers = {'Authorization': jwt != null ? `Bearer ${SSO.getJWT()}` : undefined };

export const get = (url, data, customData) => axios.get(`${baseUrl}${url}`, { params: data, headers, ...customData });

export const post = (url, data) => axios.post(`${baseUrl}${url}`, data, { headers });

export const put = (url, data) => axios.put(`${baseUrl}${url}`, data, { headers });

export const del = (url, data) => axios.delete(`${baseUrl}${url}`, data, { headers });
