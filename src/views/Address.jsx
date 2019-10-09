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
  FormGroup,
  Button,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

// core components
import PageTemplate from "components/PageTemplate";
import Item from "services/Item";
import { ShopContext } from "context";
import User from "services/User";

const AddressView = () => {
  const { userId } = useContext(ShopContext);
  const [values, setValues] = useState({
    street: '',
    zipCode: '',
    state: '',
    city: '',
  });
  const [publishing, setPublishing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [addressList, setAddressList] = useState([]);

  const changeValue = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  const selectAddress = ({ street, city, state, id, zipCode }) => {
    setEditing(id);
    setValues({ street, city, state, zipCode, id });
  }

  const unselectAddress = () => {
    setEditing(null);
    setValues({ street: '', zipCode: '', state: '', city: '' });
  }

  const onCreate = () => {
    setPublishing(true)
    User.createAdress(userId, values).then(response => {
      setPublishing(false);
      setAddressList([ ...addressList, values]);
      console.log(response);
    })
  }

  const onEdit = () => {
    setPublishing(true)
    User.createAdress(userId, values).then(response => {
      setPublishing(false);
      const newAddressList = addressList.map(address => address.id === values.id ? values : address);
      setAddressList(newAddressList);
    }).catch(response => {
      setPublishing(false);
      const newAddressList = addressList.map(address => address.id === values.id ? values : address);
      setAddressList(newAddressList);
    })
  }

  useEffect(
    () => {
      User.listAddress(userId).then(({ data }) => {
        setAddressList(data);
      });
    },
    [],
  );

  return (
    <PageTemplate card>
      <div className="pt-3 p-5">
        <h2>Mis direcciones</h2>
        <UncontrolledDropdown group>
          <DropdownToggle caret color="default">
            Agregar nueva dirección
          </DropdownToggle>
          <DropdownMenu>
            {addressList.map(address => (
              <DropdownItem onClick={() => selectAddress(address)}>
                Ver {address.street}, {address.city}, {address.state}
              </DropdownItem>
            ))}
            <DropdownItem onClick={() => unselectAddress()}>
              Agregar nueva dirección
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <br />
        <br />
        <FormGroup>
          <Input
            placeholder="Calle y número"
            type="text"
            value={values.street}
            onChange={e => changeValue('street', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Código postal"
            type="text"
            value={values.zipCode}
            onChange={e => changeValue('zipCode', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="País"
            type="text"
            value={values.state}
            onChange={e => changeValue('state', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Ciudad"
            type="text"
            value={values.city}
            onChange={e => changeValue('city', e.target.value)}
          />
        </FormGroup>
        <br />
        <br />
        {editing ? (
          <Button color="primary" type="button" disabled={publishing} onClick={() => onEdit()}>
            {publishing ? 'Guardando...' : 'Confirmar cambios'}
          </Button>
        ) : (
          <Button color="primary" type="button" disabled={publishing} onClick={() => onCreate()}>
            {publishing ? 'Guardando...' : 'Crear nueva dirección'}
          </Button>
        )}
      </div>
    </PageTemplate>
  )
}

export default AddressView;
