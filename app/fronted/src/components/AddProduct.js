import React, { useState } from 'react';
import { createProduct } from '../api';

const AddProduct = ({ updateProducts }) => {
  const [item, setItem] = useState('');
  const [preco, setpreco] = useState('');
  const [quantidade_estoque, setquantidade_estoque] = useState('');
  const [quantidade_minima_estoque, setquantidade_minima_estoque] = useState('');
  const [idSetor, setIdSetor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      item,
      preco: parseFloat(preco),
      quantidade_estoque: parseInt(quantidade_estoque),
      quantidade_minima_estoque: parseInt(quantidade_minima_estoque),
      id_setor: parseInt(idSetor)
    };
    await createProduct(newProduct);
    updateProducts();  // Atualiza a lista após criação
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" required />
      <input type="number" value={preco} onChange={(e) => setpreco(e.target.value)} placeholder="preco" required />
      <input type="number" value={quantidade_estoque} onChange={(e) => setquantidade_estoque(e.target.value)} placeholder="Quantidade estoque" required />
      <input type="number" value={quantidade_minima_estoque} onChange={(e) => setquantidade_minima_estoque(e.target.value)} placeholder="Quantidade mínima estoque" required />
      <input type="number" value={idSetor} onChange={(e) => setIdSetor(e.target.value)} placeholder="ID do Setor" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProduct;
