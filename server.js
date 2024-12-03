const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Cria o servidor HTTP para o Express
const server = http.createServer(app);

// Cria a instância do Socket.IO
const io = new Server(server);

// Serve os arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Rota para qualquer outra requisição que não seja API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Evento de conexão com o Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Escutando evento de mensagem enviada do cliente
  socket.on('sendMessage', (message) => {
    console.log('Mensagem recebida:', message);
    // Emitir a mensagem para todos os clientes conectados
    io.emit('receiveMessage', message);
  });

  // Evento de desconexão
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Inicia o servidor na porta definida
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
