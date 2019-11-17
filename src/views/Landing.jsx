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
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/SimpleFooter";

// index page sections
import Download from "./IndexSections/Download.jsx";
import { ShopContext } from "context.js";

const Landing = (props) => {
  const { user, SSO } = useContext(ShopContext);

  return (
    <React.Fragment>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h1 className="display-3 text-white">
                      Presentamos la tienda más completa de Argentina
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* 1st Hero Variation */}
        </div>
        <section className="section section-lg pt-lg-0 pb-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                          <i className="ni ni-delivery-fast" />
                        </div>
                        <h6 className="text-primary text-uppercase">
                          Envíos a todo el país
                        </h6>
                        <p className="description mt-3">
                          En nuestra tienda ofrecemos con envío directo a tu domicilio al mejor precio del mercado.
                        </p>
                        <Button
                          className="mt-4"
                          color="primary"
                          to="/list"
                          tag={Link}
                        >
                          Ver productos con envío
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-satisfied" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          Seguridad garantizada
                        </h6>
                        <p className="description mt-3">
                          Contamos con un equipo de soporte las 24hs para ayudarte en lo que necesites.
                        </p>
                        {user ? (
                          <Button
                            className="mt-4"
                            color="success"
                            to="/profile/orders"
                            tag={Link}
                          >
                            Solicitar soporte
                          </Button>
                        ) : (
                          <Button
                            className="mt-4"
                            color="success"
                            onClick={() => SSO.login(`${window.location.href}profile/orders`)}
                          >
                            Solicitar soporte
                          </Button>
                        )}
                        
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                          <i className="ni ni-shop" />
                        </div>
                        <h6 className="text-warning text-uppercase">
                          Retiro en tienda
                        </h6>
                        <p className="description mt-3">
                          ¿Preferís retirarlo en la tienda? ¡No hay problema! Tenemos un local cerca tuyo.
                        </p>
                        <Button
                          className="mt-4"
                          color="warning"
                          to="/list"
                          tag={Link}
                        >
                          Ver productos con retiro
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/apple.jpg")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                    <i className="ni ni-headphones" />
                  </div>
                  <h3>La mejor tecnología a tu alcance</h3>
                  <p>
                    En Shop UADE encontrarás la mayor variedad de productos electrónicos.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-check-bold" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Los últimos celulares
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-check-bold" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Los mejores auriculares</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-check-bold" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Accesorios electrónicos
                          </h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Button color="success" outline to="/category/CELULARES" tag={Link}>
                    Ver productos de tecnología
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section bg-secondary">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <Card className="bg-default shadow border-0">
                  <CardImg
                    alt="..."
                    src={require("assets/img/theme/img-1-1200x1000.jpg")}
                    top
                  />
                  <blockquote className="card-blockquote">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-bg"
                      preserveAspectRatio="none"
                      viewBox="0 0 583 95"
                    >
                      <polygon
                        className="fill-default"
                        points="0,52 583,95 0,95"
                      />
                      <polygon
                        className="fill-default"
                        opacity=".2"
                        points="0,42 583,95 683,0 0,95"
                      />
                    </svg>
                    <h4 className="display-3 font-weight-bold text-white">
                      Lo mejor del mundo
                    </h4>
                    <p className="lead text-italic text-white">
                      Importamos los mejores productos de las marcas más importantes del mundo.
                    </p>
                  </blockquote>
                </Card>
              </Col>
              <Col md="6">
                <div className="pl-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                    <i className="ni ni-glasses-2" />
                  </div>
                  <h3>Lo último de la moda</h3>
                  <p>
                    En Shop UADE encontrarás esos accesorios que estás necesitando, y de la mayor calidad.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="warning"
                          >
                            <i className="ni ni-check-bold" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Anteojos de sol
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="warning"
                          >
                            <i className="ni ni-check-bold" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Bolsos y carteras</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="warning"
                          >
                            <i className="ni ni-check-bold" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Accesorios para todos los gustos
                          </h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Button color="warning" outline to="/category/MODA" tag={Link}>
                    Ver lo mejor de la moda
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <CardsFooter />
    </React.Fragment>
  );
}

export default Landing;
