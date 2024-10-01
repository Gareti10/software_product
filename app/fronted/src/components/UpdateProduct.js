import React, { useState } from 'react';
import { updateProduct, fetchProducts } from '../api';

const UpdateProduct = ({ product, setProducts }) => {
  const [item, setItem] = useState(product.item);
  const [peso, setPeso] = useState(product.peso);
  const [numeroCaixas, setNumeroCaixas] = useState(product.numero_caixas);
  const [idSetor, setIdSetor] = useState(product.id_setor);

  const handleUpdate = async () => {
    await updateProduct(product.id, { item, peso, numero_caixas: numeroCaixas, id_setor: idSetor });
    fetchProducts().then((response) => setProducts(response.data));
  };

  return (
    <div>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
      <input type="number" value={numeroCaixas} onChange={(e) => setNumeroCaixas(e.target.value)} />
      <input type="number" value={idSetor} onChange={(e) => setIdSetor(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateProduct;