import React, { useState } from 'react';
import axios from 'axios';

const SetPrecoProduto = () => {
  const [data, setData] = useState({
    fornecedor_id: '',
    produto_id: '',
    preco: ''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8003/fornecedores/${data.fornecedor_id}/produtos/${data.produto_id}/preco`, {
        preco: data.preco
      });
      alert('Preço definido com sucesso!');
    } catch (error) {
      console.error('Erro ao definir preço', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fornecedor_id" value={data.fornecedor_id} onChange={handleChange} placeholder="ID Fornecedor" />
      <input type="text" name="produto_id" value={data.produto_id} onChange={handleChange} placeholder="ID Produto" />
      <input type="number" name="preco" value={data.preco} onChange={handleChange} placeholder="Preço" />
      <button type="submit">Definir Preço</button>
    </form>
  );
};

export default SetPrecoProduto;
