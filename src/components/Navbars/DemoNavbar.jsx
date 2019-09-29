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
import { Link, withRouter } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { ShopContext } from "context";
import Category from "services/Category";

const SiteNavbar = (props) => {
  const { user, userId, SSO } = useContext(ShopContext);
  const [search, setSearch] = useState(props.match.params.searchText || '');
  const [categories, setCategories] = useState([]);

  useEffect(
    () => {
      let headroom = new Headroom(document.getElementById("navbar-main"));
      headroom.init();
      Category.list().then(({ data }) => {
        setCategories(data);
      });
    },
    [],
  );

  const enterPressed = (event) => {
    let code = event.keyCode || event.which;
    if(code === 13) {
      props.history.push(`/search/${search}`);
    } 
  }

  return (
    <React.Fragment>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5 shop-uade-logo" to="/" tag={Link}>
              <i className="icon ni ni-shop" />
              <span>Shop UADE</span>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar_global">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <FormGroup className="search-box">
                  <InputGroup className="input-group-alternative">
                    <Input 
                      placeholder="Buscar un producto..."
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyPress={(e) => enterPressed(e)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="ni ni-zoom-split-in" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto navbar-nav-hover" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-books mr-1" />
                    <span className="nav-link-inner--text">Categorías</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    {categories.map(category => (
                      <DropdownItem to={`/category/${category}`} tag={Link}>
                        {category}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
                {user ? (
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-circle-08 mr-1" />
                      <span className="nav-link-inner--text">{user.fullName}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/publish" tag={Link}>
                        Publicar un producto
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem to="/landing-page" tag={Link}>
                        Mi perfil
                      </DropdownItem>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Mis compras
                      </DropdownItem>
                      <DropdownItem to="/login-page" tag={Link}>
                        Mis ventas
                      </DropdownItem>
                      <DropdownItem to="/profile/items" tag={Link}>
                        Mis publicaciones
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => SSO.logout(window.location.href)} tag={Link}>
                        Cerrar sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  userId == null &&
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      target="_blank"
                      onClick={() => SSO.login(window.location.href)}
                    >
                      <span className="nav-link-inner--text ml-1">
                        Iniciar sesión
                      </span>
                    </Button>
                  </NavItem>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
}

export default withRouter(SiteNavbar);
