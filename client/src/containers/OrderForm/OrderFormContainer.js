import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { postData } from "../../actions/index";
import { Form, Button, FormControl, FormGroup } from "react-bootstrap";
import "../../styles/app.scss";
import "../../styles/form.scss";

export const ConnectedForm = props => {
  const [currentAccountId, setCurrentAccountId] = useState(
    props.currentAccountId
  );
  const [action, setAction] = useState(1);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const quantityRef = useRef(null);
  const priceRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();

    // Use callback to get any updates to current account id
    setCurrentAccountId(props.currentAccountId);
    submitCallback();

    //Clear visible fields
    console.log("quantityRef", quantityRef);
    quantityRef.current.value = "";
    priceRef.current.value = "";
  };

  const submitCallback = () => {
    props.postData([
      { currentAccountId, action, price, quantity },
      props.orders
    ]);

    setQuantity("");
    setPrice("");
  };

  return (
    <div className="formBody">
      <div className="formContent">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl
              type="quantity"
              id="quantity"
              ref={quantityRef}
              placeholder="Enter quantity"
              className="formElement"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
            <FormControl
              type="price"
              id="price"
              ref={priceRef}
              placeholder="Enter price"
              className="formElement"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <select
              className="formElement"
              id="action"
              value={action}
              onChange={e => setAction(e.target.value)}
            >
              <option value="1">Buy</option>
              <option value="2">Sell</option>
            </select>
          </FormGroup>

          <Button className="buttonStyling centreButton" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentAccountId: state.currentAccountId,
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postData: order => dispatch(postData(order))
  };
}

const OrderForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedForm);

export default OrderForm;
