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
      descripcion: '',
    });
  };

  const changeDescription = (value) => {
    setClaim({
      ...claim,
      descripcion: value,
    })
  }

  const sendClaim = () => {
    setClaim({
      ...claim,
      loading: true,
    });
    Order.addClaim(claim.order.id, claim.descripcion).then(({ data }) => {
      console.log(data);
      setClaim({
        ...claim,
        loading: false,
        success: true,
      });
      setTimeout(() => {
        setClaim(null);
      }, 2000);
    });
  }

  console.log(claim);
  return (
    <PageTemplate card>
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
                      {order.address.street}
                      <br />
                      <Badge color="primary" pill>
                        Preparando envío
                      </Badge>
                    </React.Fragment>
                   ) : 'Retiro en local'}</td>
                  <td className="text-right">
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={() => openClaim(order)}
                    >
                      Crear reclamo
                    </Button>
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
                    Identificación #123
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
      </div>
    </PageTemplate>
  )
}

export default MyOrders;
