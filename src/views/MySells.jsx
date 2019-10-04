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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip
} from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";
import { ShopContext } from "context";
import Order from "services/Order";

const MySells = () => {
  const { userId } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      Order.bySeller(userId).then((data) => {
        setOrders(data);
        setLoading(false);
      });
    },
    [],
  );

  return (
    <PageTemplate card>
      <div className="pt-3 p-5">
        <h2>Mis ventas</h2>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio total</th>
              <th scope="col">Envío</th>
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
                  <td>{order.address ? 'Con envío' : 'Retiro en local'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {loading && <p className="text-center mt-3">Estamos buscando tus ventas...</p>}
        {!loading && orders.length === 0 && <p className="text-center mt-3">Aún no tenés ventas</p>}
      </div>
    </PageTemplate>
  )
}

export default MySells;
