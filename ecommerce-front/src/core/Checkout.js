import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken } from './apiCore';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to Checkout</button>
      </Link>
    );
  };

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (instance = instance)}
          />
          <button className='btn btn-success'>Checkout</button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h4>Total: ${getTotal()}</h4>

      {showCheckout()}
    </div>
  );
};

export default Checkout;