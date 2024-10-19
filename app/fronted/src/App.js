import React, { useState, useEffect } from 'react';
import { fetchProducts } from './api';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  const [products, setProducts] = useState([]);

  // Função para atualizar os produtos
  const updateProducts = async () => {
    const response = await fetchProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    updateProducts();  // Atualiza a lista ao carregar a página
  }, []);

  return (
    <div className="App">
      <h1>Product Management</h1>
      <AddProduct setProducts={setProducts} updateProducts={updateProducts} /> {/* Passando updateProducts */}
      <ProductList products={products} setProducts={setProducts} updateProducts={updateProducts} /> {/* Passando updateProducts */}
    </div>
  );
};

export default App;