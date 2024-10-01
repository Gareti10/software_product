import React, { useState, useEffect } from 'react';
import { fetchProducts } from './api';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((response) => setProducts(response.data));
  }, []);

  return (
    <div className="App">
      <h1>Product Management</h1>
      <AddProduct setProducts={setProducts} />
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
};

export default App;