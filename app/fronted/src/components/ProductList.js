import React, { useState } from 'react';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import { aumentarCaixas, diminuirCaixas } from '../api';

const ProductList = ({ products, updateProducts }) => {
  // Inicializa o valor com uma string vazia ao invés de null
  const [selectedProductId, setSelectedProductId] = useState(products.length > 0 ? products[0].id : "");

  const handleIncrease = async () => {
    if (selectedProductId) {
      await aumentarCaixas(selectedProductId, 1);  // Aumenta 1 caixa para o produto selecionado
      updateProducts();  // Atualiza a lista após aumento
    }
  };

  const handleDecrease = async () => {
    if (selectedProductId) {
      await diminuirCaixas(selectedProductId, 1);  // Diminui 1 caixa para o produto selecionado
      updateProducts();  // Atualiza a lista após diminuição
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>preco</th>
            <th>Quantidade em Estoque</th>
            <th>Quantidade Mínima em Estoque</th>
            <th>Nome do Setor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.item}</td>
              <td>{product.preco} reais</td>
              <td>{product.quantidade_estoque}</td>
              <td>{product.quantidade_minima_estoque}</td>
              <td>{product.nome_setor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Campo de seleção de produto e botões de ação */}
      <div className="actions">
        <label htmlFor="product-select">Escolha um produto:</label>
        <select
          id="product-select"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}  // Atualiza o ID do produto selecionado
        >
          <option value="" disabled>Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.item} (Estoque: {product.quantidade_estoque})
            </option>
          ))}
        </select>

        <button onClick={handleIncrease}>Aumentar Caixas</button>
        <button onClick={handleDecrease} className="decrease">Diminuir Caixas</button>
      </div>
    </div>
  );
};

export default ProductList;
