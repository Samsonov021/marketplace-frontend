import React, { useEffect, useState } from 'react';
import cl from './ProductItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addFavorites, deleteCart, deleteFavorites, increaseCart, decreaseCart } from '../../store/authActions';
import favoriteIcon from '../../image/favorite.png';
import favoriteActiveIcon from '../../image/favorite-active.png';
import cartIcon from '../../image/cart.png';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, favorites, cart } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      dispatch(addFavorites(product));
      return;
    }

    dispatch(deleteFavorites(product.id));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      dispatch(addCart(product));
      return;
    }

    dispatch(deleteCart(product.id));
  };

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
    if (!isAuthenticated) {
      setIsFavorite(false);
      setIsInCart(false);
      return;
    }
    setIsFavorite(favorites.some((favorite) => favorite.id === product.id));
    setIsInCart(cart.items?.some((item) => item.productId === product.id));
  }, [isAuthenticated, favorites, cart, product.id]);

  return (
    <Link to={`/products/${product.id}`} className={cl.productContainer}>
      <div className={cl.buttons__container}>
        <div
          className={`${cl.favorite__button} ${isFavorite ? cl.active : ""}`}
          onClick={handleAddToFavorite}
        >
          <img src={isFavorite ? favoriteActiveIcon : favoriteIcon} alt="Избранное" />
        </div>
        <div className={cl.cart__button} onClick={handleAddToCart}>
          {isInCart ? (
            <div className={cl.quantityContainer}>
              <span className={cl.quantityButton} onClick={handleDecreaseQuantity}>
                −
              </span>
              <span className={cl.quantityNumber} >
                {cart.items.find((item) => item.productId === product.id)?.quantity}
              </span>
              <span className={cl.quantityButton} onClick={handleIncreaseQuantity}>
                +
              </span>
            </div>
          ) : (
            <img src={cartIcon} alt="Добавить в корзину" />
          )}
        </div>
      </div>
      <img src={product.photo} alt={product.name} className={cl.productImage} />
      <div className={cl.productPrice}>{product.price} руб.</div>
      <div className={cl.productName}>{product.name}</div>
      <div className={cl.productRating}>Рейтинг: {product.rating}</div>
    </Link>
  );
};

export default ProductItem;