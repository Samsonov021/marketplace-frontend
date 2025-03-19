import { useDispatch } from 'react-redux';
import CartList from '../../../../components/cart-list/CartList';
import ProfileLayout from '../../../../layouts/profile-layout/ProfileLayout';
import { deleteCart } from '../../../../store/authActions';
import cl from './CartInitial.module.css';

export const CartInitial = ({ products, cart, discount, totalCost, setCartTabs }) => {
  const dispatch = useDispatch();
  const handleCheckOut = () => {
    cart.items.forEach(item => {
      dispatch(deleteCart(item.productId));
    });
  };
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
          
          <button className={cl.orderButton} onClick={() => setCartTabs(1)}>
            Перейти к оформлению
          </button>
        </div>
      </div>
    </ProfileLayout>
  )
}
