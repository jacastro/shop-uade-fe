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
import React from "react";
import { Link, Redirect } from "react-router-dom";

// reactstrap components
import { Spinner, Card, Container, Row, Col, DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown } from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";

const Checkout = ({ location }) => {
  const item = location.state;

  if(item == null) {
    return <Redirect to="/" />
  }

  return (
    <PageTemplate card>
      <div className="checkout-view">
        <h1 className="display-4">Estás comprando {item.quantity === 1 ? "un" :`${item.quantity} unidades de`} {item.title}...</h1>
      </div>
    </PageTemplate>
  )
}

export default Checkout;
