import { useEffect, useState } from "react";
import ProfileLayout from "../../../layouts/profile-layout/ProfileLayout";
import { useSelector } from "react-redux";
import CartList from "../../../components/cart-list/CartList";
import cl from './UserCartPage.module.css';

const UserCartPage = () => {
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const { cart } = useSelector((state) => state.auth);

  useEffect(() => {
    if (cart && cart.items) {
      setProducts(cart.items.map(item => item.product));
    }
  }, [cart]);

  const totalCost = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <ProfileLayout>
      <div className={cl.cartContainer}>
        <CartList 
          products={products} 
        />
        <div className={cl.orderInfo}>
          <h3>Информация о заказе</h3>
          <div>
            <strong>Ваша корзина</strong>
            <p>{cart.items.length} товаров • {totalCost} руб.</p>
            <p> скидка • {discount} руб.</p>
          </div>
          <div>
            <strong>Общая стоимость</strong>
            <p>{totalCost} руб.</p>
          </div>
          <button className={cl.orderButton}>
            Перейти к оформлению
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default UserCartPage;
