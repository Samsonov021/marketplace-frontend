import React, { useEffect, useState } from 'react';
import cl from './CartItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCart, decreaseCart } from '../../store/authActions';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, favorites, cart } = useSelector((state) => state.auth);
  const [isInCart, setIsInCart] = useState(false);

  const productQuantity = cart.items.find((item) => item.productId === product.id)?.quantity;


  const handleIncreaseQuantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(increaseCart(product.id));
  };

  const handleDecreaseQuantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(decreaseCart(product.id));
  };

  useEffect(() => {
    console.log(product);
    if (!isAuthenticated) {
      setIsInCart(false);
      return;
    }
    setIsInCart(cart.items?.some((item) => item.productId === product.id));
  }, [isAuthenticated, favorites, cart, product.id]);

  return (
    <div className={cl.productContainer}>
      <img src={product.photo} alt={product.name} className={cl.productImage} />
      <div className={cl.productInfo}>
        <div className={cl.productName}>{product.name}</div>
        <div className={cl.productDescription}>{product?.description}</div>
      </div>
      <div className={cl.productPrice}> {product.price * productQuantity} руб. </div>
      <div className={cl.quantityContainer}>
        <span className={cl.quantityButton} onClick={handleDecreaseQuantity}>
          − 
        </span>
        <span className={cl.quantityNumber}>
          {productQuantity}
        </span>
        <span className={cl.quantityButton} onClick={handleIncreaseQuantity}>
          +
        </span>
      </div>
    </div>
  );
};

export default CartItem;