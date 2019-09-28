import React, { useState } from "react";
import SSOAuth from "./lib/sso";
import User from "services/User";

export const ShopContext = React.createContext({});

export const ContextProvider = ({ children }) => {
  const SSO = new SSOAuth({
    tenantId: '380f7247-c8e7-4036-b81f-29e2d7a6282f',
    loginCallback: window.location.href,
    logoutCallback: window.location.href,
  });

  const [user, setUser] = useState(null)

  const value = {
    SSO,
    user,
  };

  if(window.location.hash !== '')
    SSO.saveUserToken();

  if (user == null) {
    User.getUserData(SSO.getJWT()).then(({ data }) => {
      setUser(data)
    })
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}