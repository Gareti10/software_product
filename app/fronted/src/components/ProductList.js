import React from 'react';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';

const ProductList = ({ products, setProducts }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.item} - {product.peso} kg - {product.numero_caixas} caixas
            <UpdateProduct product={product} setProducts={setProducts} />
            <DeleteProduct id={product.id} setProducts={setProducts} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;