import CartList from '../../../../components/cart-list/CartList';
import ProfileLayout from '../../../../layouts/profile-layout/ProfileLayout';
import cl from './CartInitial.module.css';

export const CartInitial = ({ products, cart, discount, totalCost, setCartTabs }) => {

  return (
    <ProfileLayout>
      {cart.items.length > 0 ? (
        <div className={cl.cartContainer}>
          <CartList products={products} />
          <div className={cl.orderInfo}>
            <h3>Информация о заказе</h3>
            <div>
              <strong>Ваша корзина</strong>
              <p>{cart.items.length} товаров • {totalCost} руб.</p>
              <p>Скидка • {discount} руб.</p>
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
      ) : (
        <p className={cl.noProductsMessage}>Товаров в корзине нет</p>
      )}
    </ProfileLayout>
  );
};
