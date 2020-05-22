import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
// import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  // const loadProducts = () => {
  //   getProducts().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setProducts(data);
  //     }
  //   });
  // };
};

export default ManageProducts;
