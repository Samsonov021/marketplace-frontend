import React from 'react';
import cl from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  return (
    <div>
      <img src={product.img} alt={product.name} className={cl.productImage} />
      <div className={cl.productPrice}>{product.price} руб.</div>
      <div className={cl.productName}>{product.name}</div>
      <div className={cl.productRating}>Рейтинг: {product.rating}</div>
    </div>
  );
};

export default ProductItem;