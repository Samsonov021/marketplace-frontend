import React from 'react';
import ProductItem from '../product-item/ProductItem';
import cl from './ProductList.module.css';

const ProductList = ({products}) => {
  
  return (
    <div className={cl.productList}>
      {products.map((product) =>   (
        <ProductItem
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default ProductList;