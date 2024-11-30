import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import AddFornecedor from './components/AddFornecedor';
import SetPrecoProduto from './components/SetPrecoProduto';
import ListarFornecedores from './components/ListarFornecedores';
import UpdateProduct from './components/UpdateProduct';

function App() {
  const [products, setProducts] = useState([]);

  // Hook useEffect movido para dentro do componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data); // Assumindo que a resposta contém os produtos em `data`
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    loadProducts();
  }, []);

  // Função para atualizar a lista de produtos
  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <div className="App">
        <h1>Sistema de Gerenciamento</h1>
        {/* Links de navegação */}
        <nav>
          <ul>
            <li><Link to="/produtos">Administração de Produtos</Link></li>
            <li><Link to="/fornecedores">Cadastro de Fornecedores</Link></li>
            <li><Link to="/precos">Definir Preço de Produtos</Link></li>
            <li><Link to="/listar-fornecedores">Listar Fornecedores</Link></li>
          </ul>
        </nav>

        {/* Definindo as Rotas */}
        <Routes>
          <Route path="/produtos" element={<ProductList products={products} addNewProduct={addNewProduct} />} />
          <Route path="/fornecedores" element={<AddFornecedor />} />
          <Route path="/precos" element={<SetPrecoProduto />} />
          <Route path="/add-product" element={<AddProduct onAddProduct={addNewProduct} />} />
          <Route path="/listar-fornecedores" element={<ListarFornecedores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
