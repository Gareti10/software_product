import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { io } from 'socket.io-client';  // Importando o socket.io-client
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import AddFornecedor from './components/AddFornecedor';
import SetPrecoProduto from './components/SetPrecoProduto';
import ListarFornecedores from './components/ListarFornecedores';
import UpdateProduct from './components/UpdateProduct';
import MelhorPreco from "./components/MelhorPreco"; // Importar o componente
import ChatWindow from './components/ChatWindow'; // Novo componente para o chat

function App() {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens do chat
  const [newMessage, setNewMessage] = useState(''); // Estado para a nova mensagem a ser enviada

  // Inicializa o socket com o servidor backend
  const socket = io('http://localhost:5000'); // Altere para o endereço correto do seu servidor backend

  useEffect(() => {
    // Ouve as mensagens do servidor
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup para evitar vazamento de memória
    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  // Função para enviar a mensagem
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', newMessage);  // Envia a mensagem para o servidor
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Atualiza a lista de mensagens localmente
      setNewMessage(''); // Limpa o campo de entrada de mensagem
    }
  };

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
  const addNewProduct = async (newProduct) => {
    try {
      // Adiciona o novo produto à API
      await addProductToAPI(newProduct);
  
      // Após adicionar, busca a lista de produtos atualizada
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts.data); // Atualiza o estado com a nova lista
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
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
            <li><Link to="/melhor-preco">Buscar Melhor Preço</Link></li> {/* Nova entrada no menu */}
            <li><Link to="/chat">Chat</Link></li> {/* Nova entrada para o chat */}
          </ul>
        </nav>

        {/* Definindo as Rotas */}
        <Routes>
          <Route path="/produtos" element={<ProductList products={products} addNewProduct={addNewProduct} />} />
          <Route path="/fornecedores" element={<AddFornecedor />} />
          <Route path="/precos" element={<SetPrecoProduto />} />
          <Route path="/add-product" element={<AddProduct onAddProduct={addNewProduct} />} />
          <Route path="/listar-fornecedores" element={<ListarFornecedores />} />
          <Route path="/melhor-preco" element={<MelhorPreco />} /> {/* Nova rota */}
          <Route 
            path="/chat" 
            element={
              <ChatWindow 
                messages={messages} 
                newMessage={newMessage} 
                setNewMessage={setNewMessage} 
                handleSendMessage={handleSendMessage} 
              />
            }
          /> {/* Nova rota para o chat */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
