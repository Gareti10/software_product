import React from 'react';
import { deleteProduct, fetchProducts } from '../api';

const DeleteProduct = ({ id, setProducts }) => {
  const handleDelete = async () => {
    await deleteProduct(id);
    fetchProducts().then((response) => setProducts(response.data));
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteProduct;