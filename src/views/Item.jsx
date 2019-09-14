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
import { Button, Card, Container, Row, Col, DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown } from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.itemId,
      title: "iPhone 8 plus libre 64 GB",
      description: `
Liberado
Procesador Apple A11 Bionic (10 nm) - 3 GB
Pantalla 5.5" IPS LCD de 1080 x 1920 pixeles
Cámara trasera doble 12MP f/1.8 (wide) - 12MP f/2.8 (tele)
Cámara delantera 7MP f/2.2
Bateria 2691 mAh con cárga inalámbrica
Resistencia al agua y al polvo IP67
      `,
      price: "35.000",
      seller: "",
      category: [{
        id: "",
        name: "",
      }],
      attributes:[{
        id: "",
        name: "",
      }],
      photos: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_761686-MLA31003080334_062019-F.webp"
      ],
      url: "",
      weight: "",
      warranty: "",
      quantity: 1,
      shippingTo: null,
    };
  }

  componentDidMount() {
  }

  render() {
    const { id, title, price, description, quantity, photos, shippingTo } = this.state;
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
            <h2>{title}</h2>
            <h1 className="display-1">$ {price}{shippingTo && <small> + $350</small>}</h1>
            <p>{description}</p>
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

export default Item;
