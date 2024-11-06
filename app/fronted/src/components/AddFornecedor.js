import React, { useState } from 'react';
import axios from 'axios';

const AddFornecedor = () => {
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setFornecedor({
      ...fornecedor,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8003/v1/api/fornecedores/fornecedores', fornecedor);
      alert('Fornecedor cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" value={fornecedor.nome} onChange={handleChange} placeholder="Nome" />
      <input type="email" name="email" value={fornecedor.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="telefone" value={fornecedor.telefone} onChange={handleChange} placeholder="Telefone" />
      <button type="submit">Cadastrar Fornecedor</button>
    </form>
  );
};

export default AddFornecedor;