import React from 'react';
import cl from './CartList.module.css';
import CartItem from '../cart-item/CartItem';

const CartList = ({products}) => {
  
  return (
    <div className={cl.productList}>
      {products.map((product) =>   (
        <CartItem
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default CartList;