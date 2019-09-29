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
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Badge, Container, Row, Col, DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown } from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";

import Item from "services/Item";
import Warranty from "services/Warranty";

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    const item = props.location.state || {};
    this.state = {
      id: props.match.params.itemId,
      quantity: 1,
      shippingTo: null,
      photos: [],
      ...item,
    };
  }

  componentDidMount() {
    Item.byId(this.state.id).then(({ data }) => {
      this.setState({ ...data })
    })
  }

  render() {
    const { id, name, price, description, quantity, photos, shippingTo, category, warranty } = this.state;
    const quantityAvailable = [];
    const adressAvailable = [];

    for (let index = 1; index < 10; index++) {
      quantityAvailable.push(index);
    }

    for (let index = 1; index < 5; index++) {
      adressAvailable.push(index);
    }

    return (
      <PageTemplate card>
        <Row>
          <Col xs="7" className="item-view_images">
            <img
              alt="..."
              className="img-fluid"
              src={photos[0]}
            />
          </Col>
          <Col xs="5" className="item-view_detail">
            <span>ID #{id}</span>
            <h2>{name}</h2>
            <h1 className="display-1">$ {price}{shippingTo && <small> + $350</small>}</h1>
            <Badge tag={Link} to={`/category/${category}`} color="primary" pill className="mr-1">
              {category}
            </Badge>
            <Badge color="info" pill className="mr-1">
              {Warranty.getName(warranty)}
            </Badge>
            <p className="mt-3">{description}</p>
            <UncontrolledDropdown group>
              <DropdownToggle outline caret color="secondary">
                {shippingTo ? `Quiero que me lo envíen a ${shippingTo}` : "Lo retiro personalmente en el local"}
              </DropdownToggle>
              <DropdownMenu>
                {adressAvailable.map(adress => (
                  <DropdownItem onClick={() => this.setState({ shippingTo: adress })}>
                    Quiero que me lo envíen a {adress}
                  </DropdownItem>
                ))}
                <DropdownItem onClick={() => this.setState({ shippingTo: null })}>
                  Lo retiro personalmente en el local
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <br /><br />
            <UncontrolledDropdown group>
              <DropdownToggle outline size="lg" caret color="default">
                Necesito {quantity} {quantity === 1 ? "unidad" : "unidades"}
              </DropdownToggle>
              <DropdownMenu>
                {quantityAvailable.map(newQuantity => (
                  <DropdownItem onClick={() => this.setState({ quantity: newQuantity })}>
                    Necesito {newQuantity} {newQuantity === 1 ? "unidad" : "unidades"}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button 
              color="success"
              size="lg"
              className="buy"
              to={{
                pathname:`/checkout`,
                state: {...this.state},
              }}
              tag={Link}
            >
              Comprar ahora
            </Button>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default ItemView;
