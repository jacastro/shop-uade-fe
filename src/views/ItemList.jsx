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
import { Button, Card, CardBody, Row, Col, Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown } from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";

class ItemList extends React.Component {
  constructor(props) {
    super(props);

    const items = [];

    for (let index = 1; index < 49; index++) {
      items.push({
        id: index,
        title: "iPhone 8 plus libre 64 GB",
        price: "35.000",
        photos: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_761686-MLA31003080334_062019-F.webp"
        ],
      });
    }

    this.state = {
      items,
    };
  }

  componentDidMount() {
  }

  render() {
    const { items } = this.state;
    const { match, search } = this.props;

    const title = search ? `Resultados de la búsqueda: ${match.params.searchText}` : "Listado de productos";

    return (
      <PageTemplate title={title}>
        <Row>
          {items.map(item => {
            return (
              <Col xs="3" className="item-list_card">
                <Card className="card-lift--hover shadow border-0 mb-4">
                  <CardBody>
                    <img
                      style={{ height: "300px" }}
                      alt="..."
                      className="img-fluid"
                      src={item.photos[0]}
                    />
                    <h6 className="text-primary text-uppercase">
                      {item.title}
                    </h6>
                    <h3 className="display-3">$ {item.price}</h3>
                    <div>
                      <Badge color="primary" pill className="mr-1">
                        design
                      </Badge>
                      <Badge color="primary" pill className="mr-1">
                        system
                      </Badge>
                      <Badge color="primary" pill className="mr-1">
                        creative
                      </Badge>
                    </div>
                    <Button
                      className="mt-4"
                      color="primary"
                      block
                      to={`/item/${item.id}`}
                      tag={Link}
                    >
                      Ver producto
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
      </PageTemplate>
    );
  }
}

export default ItemList;
