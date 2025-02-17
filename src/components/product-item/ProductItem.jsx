import React from 'react';
import cl from './ProductItem.module.css';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className={cl.productContainer}>
      <img src={product.photo} alt={product.name} className={cl.productImage} />
      <div className={cl.productPrice}>{product.price} руб.</div>
      <div className={cl.productName}>{product.name}</div>
      <div className={cl.productRating}>Рейтинг: {product.rating}</div>
    </Link>
  );
};

export default ProductItem;