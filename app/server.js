const express = require('express');
const app = express();
const path = require('path');

// Serve os arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, 'frontend/build')));  // Certifique-se de ajustar o caminho, se necessário

// Rota para qualquer outra requisição que não seja API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
