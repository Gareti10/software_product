import React, { useState, useEffect } from 'react';
import { fetchProducts, aumentarCaixas, diminuirCaixas } from '../api';
import AddProduct from './AddProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  // Estados para os filtros
  const [filters, setFilters] = useState({
    item: "",
    preco: "",
    quantidade_estoque: "",
    nome_setor: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
      console.log('Produtos carregados:', response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleIncrease = async () => {
    if (selectedProductId) {
      await aumentarCaixas(selectedProductId, 1);
      loadProducts();
    }
  };

  const handleDecrease = async () => {
    if (selectedProductId) {
      await diminuirCaixas(selectedProductId, 1);
      loadProducts();
    }
  };

  // Função para filtrar os produtos
  const filteredProducts = products.filter((product) => {
    return (
      (filters.item === "" || product.item.toLowerCase().includes(filters.item.toLowerCase())) &&
      (filters.preco === "" || product.preco.toString().includes(filters.preco)) &&
      (filters.quantidade_estoque === "" || product.quantidade_estoque.toString().includes(filters.quantidade_estoque)) &&
      (filters.nome_setor === "" || product.nome_setor.toLowerCase().includes(filters.nome_setor.toLowerCase()))
    );
  });

  // Atualizar filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <h2>Product List</h2>
      <AddProduct onAdd={loadProducts} />

      <table>
        <thead>
          <tr>
            <th>
              Item
              <br />
              <input
                type="text"
                name="item"
                value={filters.item}
                onChange={handleFilterChange}
                placeholder="Filtrar por Item"
              />
            </th>
            <th>
              Preço
              <br />
              <input
                type="text"
                name="preco"
                value={filters.preco}
                onChange={handleFilterChange}
                placeholder="Filtrar por Preço"
              />
            </th>
            <th>
              Quantidade em Estoque
              <br />
              <input
                type="text"
                name="quantidade_estoque"
                value={filters.quantidade_estoque}
                onChange={handleFilterChange}
                placeholder="Filtrar por Estoque"
              />
            </th>
            <th>Quantidade Mínima em Estoque</th>
            <th>
              Nome do Setor
              <br />
              <input
                type="text"
                name="nome_setor"
                value={filters.nome_setor}
                onChange={handleFilterChange}
                placeholder="Filtrar por Setor"
              />
            </th>
            <th>ID do Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
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
