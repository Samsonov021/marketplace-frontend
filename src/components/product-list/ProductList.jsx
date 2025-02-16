import React from 'react';
import cl from './ProductList.module.css';
import ProductItem from '../product-item/ProductItem';

const ProductList = ({products}) => {
  
  return (
    <div className={cl.productList}>
      {products.map((product) =>   (
        <div className={cl.productContainer}>
          <ProductItem
            key={product.id} 
            product={product} 
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;