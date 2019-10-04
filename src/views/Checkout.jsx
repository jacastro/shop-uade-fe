/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// reactstrap components
import { Button } from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";
import { ShopContext } from "context";
import Order from "services/Order";

const Checkout = ({ location }) => {
  const item = location.state;
  const { userId } = useContext(ShopContext);
  const [result, setResult] = useState(null)

  useEffect(
    () => {
      const data = {
        address: item.shippingTo ? item.shippingTo.id : null,
        buyerId: userId,
        itemId: item.id,
        quantity: item.quantity,
      };

      Order.create(data).then(({ data }) => {
        setResult(data)
      }) 
      .catch(response => console.log(response));
    },
    [item, userId],
  );

  if(item == null) {
    return <Redirect to="/" />
  }

  return (
    <PageTemplate card>
      <div className="checkout-view">
        {result ? (
          <React.Fragment>
            <i className="icon ni ni-check-bold" style={{ fontSize: '4em', color: '#2dce89' }} />
            <h1 className="display-2">¡Felicitaciones!</h1>
            <h1 className="display-4">{item.quantity === 1 ? `El ${item.name} ya es tuyo.` :`Los ${item.quantity} ${item.name} ya son tuyos.`}</h1>
            <Button className="mt-5" color="primary" to="/profile/orders" tag={Link}>
              Ver en mis compras
            </Button>
          </React.Fragment>
        ) : (
          <h1 className="display-4">Estás comprando {item.quantity === 1 ? "un" :`${item.quantity} unidades de`} {item.name}...</h1>
        )}
        
      </div>
    </PageTemplate>
  )
}

export default Checkout;
