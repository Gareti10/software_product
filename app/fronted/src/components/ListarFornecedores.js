import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8003/v1/api/fornecedores/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores', error);
      }
    };

    fetchFornecedores();
  }, []);

  return (
    <div>
      <h2>Lista de Fornecedores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarFornecedores;
