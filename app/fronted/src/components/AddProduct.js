import React, { useState } from 'react';
import { createProduct, fetchProducts } from '../api';

const AddProduct = ({ setProducts }) => {
  const [item, setItem] = useState('');
  const [peso, setPeso] = useState('');
  const [numeroCaixas, setNumeroCaixas] = useState('');
  const [idSetor, setIdSetor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { item, peso: parseFloat(peso), numero_caixas: parseInt(numeroCaixas), id_setor: parseInt(idSetor) };
    await createProduct(newProduct);
    fetchProducts().then((response) => setProducts(response.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item Name" required />
      <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Weight" required />
      <input type="number" value={numeroCaixas} onChange={(e) => setNumeroCaixas(e.target.value)} placeholder="Number of Boxes" required />
      <input type="number" value={idSetor} onChange={(e) => setIdSetor(e.target.value)} placeholder="Sector ID" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProduct;