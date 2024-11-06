import React, { useState } from 'react';
import { createProduct } from '../api';

const AddProduct = ({ onAddProduct }) => { // Nome da prop ajustado
  const [item, setItem] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade_estoque, setQuantidadeEstoque] = useState('');
  const [quantidade_minima_estoque, setQuantidadeMinimaEstoque] = useState('');
  const [idSetor, setIdSetor] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      item,
      preco: parseFloat(preco),
      quantidade_estoque: parseInt(quantidade_estoque, 10),
      quantidade_minima_estoque: parseInt(quantidade_minima_estoque, 10),
      id_setor: parseInt(idSetor, 10),
      id_fornecedor: parseInt(idFornecedor, 10)
    };

    try {
      await createProduct(newProduct); // Envia o novo produto para a API
      onAddProduct(newProduct); // Atualiza a lista de produtos no componente pai
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" required />
      <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" required />
      <input type="number" value={quantidade_estoque} onChange={(e) => setQuantidadeEstoque(e.target.value)} placeholder="Quantidade em Estoque" required />
      <input type="number" value={quantidade_minima_estoque} onChange={(e) => setQuantidadeMinimaEstoque(e.target.value)} placeholder="Quantidade Mínima em Estoque" required />
      <input type="number" value={idSetor} onChange={(e) => setIdSetor(e.target.value)} placeholder="ID do Setor" required />
      <input type="number" value={idFornecedor} onChange={(e) => setIdFornecedor(e.target.value)} placeholder="ID do Fornecedor" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProduct;
