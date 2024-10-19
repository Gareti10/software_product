import React, { useState } from 'react';
import { updateProduct, aumentarCaixas, diminuirCaixas } from '../api';

const UpdateProduct = ({ product, updateProducts }) => {
  const [item, setItem] = useState(product.item);
  const [preco, setpreco] = useState(product.preco);
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(product.quantidade_estoque);  
  const [quantidadeMinimaEstoque, setQuantidadeMinimaEstoque] = useState(product.quantidade_minima_estoque);  
  const [idSetor, setIdSetor] = useState(product.id_setor);

  const handleIncrease = async () => {
    await aumentarCaixas(product.id, 1); // Aumenta 1 caixa
    updateProducts(); // Atualiza a lista de produtos
  };

  const handleDecrease = async () => {
    await diminuirCaixas(product.id, 1); // Diminui 1 caixa
    updateProducts(); // Atualiza a lista de produtos
  };

  const handleUpdate = async () => {
    await updateProduct(product.id, { item, preco, quantidade_estoque: quantidadeEstoque, quantidade_minima_estoque: quantidadeMinimaEstoque, id_setor: idSetor });  
    updateProducts();
  };

  return (
    <div>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <input type="number" value={preco} onChange={(e) => setpreco(e.target.value)} />
      <input type="number" value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(e.target.value)} />
      <input type="number" value={quantidadeMinimaEstoque} onChange={(e) => setQuantidadeMinimaEstoque(e.target.value)} /> 
      <input type="number" value={idSetor} onChange={(e) => setIdSetor(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleIncrease}>Aumentar Caixas</button>
      <button onClick={handleDecrease}>Diminuir Caixas</button>
    </div>
  );
};

export default UpdateProduct;
