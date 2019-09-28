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
import Category from "services/Category";
import Warranty from "services/Warranty";
import Item from "services/Item";
import { ShopContext } from "context";

const Publish = ({  }) => {
  const { userId } = useContext(ShopContext);
  const [values, setValues] = useState({
    name: '',
    description: '',
    photos: [],
    price: 0,
    weight: 0,
    category: null,
    warranty: null,
    seller: {
      id: userId
    }
  });
  const [categories, setCategories] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [publishing, setPublishing] = useState(false);

  const changeValue = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  const onPublish = () => {
    setPublishing(true)
    Item.publish(values).then(response => {
      console.log(response);
      setPublishing(false)
    })
  }

  useEffect(
    () => {
      Category.list().then(({ data }) => {
        setCategories(data);
      });
      Warranty.list().then(({ data }) => {
        setWarranties(data);
      });
    },
    [],
  );

  return (
    <PageTemplate card>
      <div className="pt-3 p-5">
        <h2>Publicar un producto</h2>
        <FormGroup>
          <Input
            placeholder="Nombre del producto"
            type="text"
            value={values.name}
            onChange={e => changeValue('name', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Descripción"
            type="textarea"
            value={values.description}
            onChange={e => changeValue('description', e.target.value)}
            rows="3"
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Fotos (separá las urls por coma)"
            type="textarea"
            value={values.photos.join(',')}
            onChange={e => changeValue('photos', e.target.value.replace(/\s/g, '').split(','))}
            rows="3"
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Precio"
            type="number"
            value={values.price || null}
            onChange={e => changeValue('price', Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Peso"
            type="number"
            value={values.weight|| null}
            onChange={e => changeValue('weight', Number(e.target.value))}
          />
        </FormGroup>
        <UncontrolledDropdown group>
          <DropdownToggle outline caret color="secondary">
            Categoría: {values.category}
          </DropdownToggle>
          <DropdownMenu>
            {categories.map(category => (
              <DropdownItem onClick={e => changeValue('category', category)}>{category}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown group>
          <DropdownToggle outline caret color="secondary">
            {values.warranty ? Warranty.getName(values.warranty) : 'Seleccione la garantía'}
          </DropdownToggle>
          <DropdownMenu>
            {warranties.map(warranty => (
              <DropdownItem onClick={e => changeValue('warranty', warranty)}>{Warranty.getName(warranty)}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <br />
        <br />
        <Button color="primary" type="button" disabled={publishing} onClick={() => onPublish()}>
          {publishing ? 'Publicando...' : 'Publicar'}
        </Button>
      </div>
    </PageTemplate>
  )
}

export default Publish;