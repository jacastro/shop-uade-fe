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
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { 
  Button,
  Media,
  Table,
  Badge,
  Input,
  Modal,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";
import { ShopContext } from "context";
import Order from "services/Order";

const MyOrders = () => {
  const { userId, user } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claim, setClaim] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(
    () => {
      Order.byBuyer(userId).then((data) => {
        setOrders(data);
        setLoading(false);
      });
    },
    [],
  );

  const openClaim = (order) => {
    setClaim({
      order,
      description: '',
    });
  };

  const viewClaim = (order) => {
    setSelectedOrder(order);
  };

  const changeDescription = (value) => {
    setClaim({
      ...claim,
      description: value,
    })
  }

  const sendClaim = () => {
    setClaim({
      ...claim,
      loading: true,
    });
    Order.addClaim(claim.order.id, claim.description).then(({ data }) => {
      Order.getClaim(claim.order.id).then(({ data }) => {
        setClaim({
          ...claim,
          loading: false,
          success: true,
          id: data[0].id
        });
        setOrders(
          orders.map(order => order.id === claim.order.id ? { ...order, claim: data[0] } : order)
        )
        setTimeout(() => {
          setClaim(null);
        }, 2000);
      })
    });
  }

  return (
    <PageTemplate card privatePage>
      <div className="pt-3 p-5">
        <h2>Mis compras</h2>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio total</th>
              <th scope="col">Envío</th>
              <th scope="col">Reclamo</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return (
                <tr>
                  <td>
                    <Media className="align-items-center">
                      <Link
                        className="avatar rounded-circle mr-3"
                        to={`/item/${order.item.id}`}
                      >
                        <img
                          alt="..."
                          src={order.item.photos[0]}
                        />
                      </Link>
                      <Media>
                        <Link to={`/item/${order.item.id}`}>
                          <span className="mb-0 text-sm">
                            {order.item.name}
                          </span>
                        </Link>
                      </Media>
                    </Media>
                  </td>
                  <td>{order.quantity}</td>
                  <td>$ {order.total}</td>
                  <td>{order.address ? (
                    <React.Fragment>
                      <Badge color={Order.getColor(order.state)} data-placement="top" id={`tooltip${order.id}`}>
                        {order.state}
                      </Badge>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target={`tooltip${order.id}`}
                      >
                        Enviado a {order.address.street}, {order.address.city}, {order.address.state}
                      </UncontrolledTooltip>
                    </React.Fragment>
                   ) : 'Retiro en local'}</td>
                  <td className="text-right">
                    {order.claim != null ? (
                      <Button color="info" size="sm" onClick={() => viewClaim(order)}>
                        Reclamo {order.claim.statusList.value}
                      </Button>
                    ) : (
                      <Button color="primary" size="sm" onClick={() => openClaim(order)}>
                        Crear reclamo
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {loading && <p className="text-center mt-3">Estamos buscando tus compras...</p>}
        {!loading && orders.length === 0 && <p className="text-center mt-3">Aún no tenés compras</p>}
        <Modal
          className={`modal-dialog-centered ${claim && claim.success && 'modal-success'}`}
          contentClassName={claim && claim.success && 'bg-gradient-success'}
          size="sm"
          isOpen={claim != null}
        >
          {claim == null || claim.loading || claim.success ? (
            <div className="modal-body">
              {claim && claim.success && (
                <div className="text-center">
                  <i className="ni ni-check-bold ni-3x" />
                  <h3 className="heading mt-4">
                    Tu reclamo fue creado correctamente
                  </h3>
                  <h3 className="heading mb-4">
                    Identificación {claim.id}
                  </h3>
                </div>
              )}
              {claim && claim.loading && (
                <div className="text-center">
                  <h3 className="heading my-4">Estamos creando tu reclamo...</h3>
                </div>
              )}
            </div>
          ) : (
            <React.Fragment>
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Crear un reclamo para tu compra de {claim.order.item.name}
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setClaim(null)}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <Input
                  id="exampleFormControlTextarea1"
                  placeholder="Escriba aquí el motivo de su reclamo"
                  rows="3"
                  type="textarea"
                  onChange={e => changeDescription(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button" onClick={() => sendClaim()}>
                  Crear reclamo
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setClaim(null)}
                >
                  Cancelar
                </Button>
              </div>
            </React.Fragment>
          )}
        </Modal>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={selectedOrder != null}
          toggle={() => setSelectedOrder(null)}
        >
          {selectedOrder != null && (
            <React.Fragment>
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Ver el reclamo para tu compra de {selectedOrder.item.name}
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setClaim(null)}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedOrder.claim.description}</p>
                <Badge color="primary" pill className="mr-1">
                  Estado: {selectedOrder.claim.statusList.value}
                </Badge>
                <Badge color="info" pill className="mr-1">
                  Identificación: {selectedOrder.claim.id}
                </Badge>
              </div>
            </React.Fragment>
          )}
        </Modal>
      </div>
    </PageTemplate>
  )
}

export default MyOrders;
