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
import Items from "services/Item";
import Warranty from "services/Warranty";

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

    this.state = {
      items: [],
      title: 'Buscando productos...'
    };

    this.searchItems = this.searchItems.bind(this);
  }

  componentDidMount() {
    this.searchItems(this.props)
  }

  componentWillReceiveProps(props) {
    this.searchItems(props)
  }

  searchItems(props) {
    const { search, match } = props;
    const { searchText, category } = match.params;
    this.setState({ title: 'Buscando productos...' });
    if (category) {
      Items.category(search && category).then(({ data }) => 
        this.setState({ 
          items: data,
          title: `Todos los ${category}`
        })
      );
    } else {
      Items.search(search && searchText).then(({ data }) => 
        this.setState({
          items: data,
          title: search ? `Resultados de la búsqueda: ${searchText}` : 'Listado de productos'
        })
      );
    }
  }

  render() {
    const { items, title } = this.state;

    return (
      <PageTemplate title={title}>
        <Row>
          {items.map(item => {
            return (
              <Col xs="12" lg="4" className="item-list_card">
                <Card className="card-lift--hover shadow border-0 mb-4">
                  <CardBody className="text-center">
                    <img
                      style={{ height: "300px", maxWidth: '100%', objectFit: 'contain' }}
                      alt="..."
                      src={item.photos[0]}
                    />
                    <h6 className="text-primary text-uppercase">
                      {item.name}
                    </h6>
                    <h3 className="display-3">$ {item.price}</h3>
                    <div>
                      <Badge color="primary" pill className="mr-1">
                        {item.category}
                      </Badge>
                      <Badge color="info" pill className="mr-1">
                        {Warranty.getName(item.warranty)}
                      </Badge>
                    </div>
                    <Button
                      className="mt-4"
                      color="primary"
                      block
                      to={{
                        pathname:`/item/${item.id}`,
                        state: {...item},
                      }}
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
