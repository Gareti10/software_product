import React, { useState, useEffect } from 'react';
import { fetchProducts, aumentarCaixas, diminuirCaixas } from '../api';
import AddProduct from './AddProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data); // Atualiza o estado com os produtos da API
      console.log('Produtos carregados:', response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleIncrease = async () => {
    if (selectedProductId) {
      await aumentarCaixas(selectedProductId, 1);
      loadProducts(); // Recarrega a lista após a modificação
    }
  };

  const handleDecrease = async () => {
    if (selectedProductId) {
      await diminuirCaixas(selectedProductId, 1);
      loadProducts(); // Recarrega a lista após a modificação
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <AddProduct onAdd={loadProducts} /> {/* Atualiza a lista quando um novo produto é adicionado */}

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
            <th>Quantidade Mínima em Estoque</th>
            <th>Nome do Setor</th>
            <th>ID do Fornecedor</th>
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
              <td>{product.id_fornecedor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions">
        <label htmlFor="product-select">Escolha um produto:</label>
        <select
          id="product-select"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
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
