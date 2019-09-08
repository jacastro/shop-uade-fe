import React from "react";
import SSOAuth from "./lib/sso";

export const ShopContext = React.createContext({});

const SSO = new SSOAuth({
  tenantId: '380f7247-c8e7-4036-b81f-29e2d7a6282f',
  loginCallback: window.location.href,
  logoutCallback: window.location.href,
});

export const ContextProvider = ({ children }) => {
  const value = {
    SSO,
    user: null,
  };

  if(window.location.hash !== '')
    SSO.saveUserToken();

  try {
    value.user = SSO.getJWTData();
  } catch (error) {
    
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}