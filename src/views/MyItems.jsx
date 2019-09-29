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
import { Link, Redirect } from "react-router-dom";

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
import Category from "services/Category";
import Warranty from "services/Warranty";
import Item from "services/Item";
import { ShopContext } from "context";

const MyItems = () => {
  const { userId } = useContext(ShopContext);
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      Item.bySeller(userId).then(({ data }) => {
        setItems(data);
      });
    },
    [],
  );

  return (
    <PageTemplate card>
      <div className="pt-3 p-5">
        <h2>Mis publicaciones</h2>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Título</th>
              <th scope="col">Fotos</th>
              <th scope="col">Precio</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return (
                <tr>
                  <th scope="row">
                    #{item.id}
                  </th>
                  <td>{item.name}</td>
                  <td>
                    <div className="avatar-group">
                      {item.photos.map(photo => (
                        <a className="avatar avatar-sm">
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={photo}
                          />
                        </a>
                      ))}
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td className="text-right">
                    <Button
                      color="secondary"
                      size="sm"
                      tag={Link}
                      to={{
                        pathname:`/publish`,
                        state: {...item},
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button className="mt-3" color="primary" to="/publish" tag={Link}>
          Crear una nueva publicación
        </Button>
      </div>
    </PageTemplate>
  )
}

export default MyItems;
