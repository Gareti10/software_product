import React, { useState } from "react";
import axios from "axios";

const MelhorPreco = () => {
  const [produtoId, setProdutoId] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const buscarMelhorPreco = async () => {
    setErro(""); // Limpar erros anteriores
    setResultado(null); // Limpar resultados anteriores

    if (!produtoId) {
      setErro("Por favor, insira um ID de produto válido.");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8003/v1/api/produtos/${produtoId}/menor_preco`
      );
      setResultado(response.data); // Armazena o resultado retornado
    } catch (err) {
      setErro(
        err.response?.data?.detail || "Ocorreu um erro ao buscar o melhor preço."
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Buscar Melhor Preço</h2>
      <div>
        <label htmlFor="produtoId">ID do Produto:</label>
        <input
          type="number"
          id="produtoId"
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          placeholder="Digite o ID do Produto"
          style={{
            margin: "10px 0",
            padding: "8px",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={buscarMelhorPreco}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%", // Deixa o botão mais largo para um melhor layout
          }}
        >
          Buscar
        </button>
      </div>

      {erro && (
        <p style={{ color: "red", marginTop: "15px", fontWeight: "bold" }}>
          {erro}
        </p>
      )}

      {resultado && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Fundo semitransparente para contraste
          }}
        >
          <h3 style={{ textAlign: "center", color: "#333" }}>Melhor Preço Encontrado</h3>
          <p>
            <strong>Produto ID:</strong> {resultado.produto_id}
          </p>
          <p>
            <strong>Fornecedor:</strong> {resultado.fornecedor_nome}
          </p>
          <p>
            <strong>Preço:</strong> R$ {resultado.preco.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MelhorPreco;
