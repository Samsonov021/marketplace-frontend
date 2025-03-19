import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartCreatingItem } from './cart-creating-item/CartCreatingItem';
import { deleteCart, createOrder } from '../../../../store/authActions';
import cl from './CartCreating.module.css';
import EditFields from '../../../../components/ui/edit-fields/EditFields';

export const CartCreating = ({ products, totalCost, cart, setCartTabs, user }) => {
    const dispatch = useDispatch();

    const [clientAddress, setClientAddress] = useState('');
    const [clientRecipient, setClientRecipient] = useState({
        name: user.name || '',
        phone: user.phone || ''
    });

    const handleOrder = () => {
        if (!clientRecipient.name || !clientRecipient.phone || !clientAddress) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
    
        const orderData = {
            name: clientRecipient.name,
            phone: clientRecipient.phone,
            address: clientAddress,
        };
        dispatch(createOrder(orderData)); 
    };

    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <div className={cl.header__container}>
                    <button className={cl.header__button} onClick={() => setCartTabs(0)}>Вернуться назад</button>
                </div>
            </div>

            <div className={cl.content}>
                <div className={cl.wrapper}>
                    <div className={cl.delivery}>
                        <h3 className={cl.delivery__title}>Доставка:</h3>
                        <p className={cl.delivery__info}>Выберите адрес доставки, и курьер доставит ваш заказ прямо к вам!</p>
                        <EditFields
                            label="Введите ваш адрес"
                            value={clientAddress}
                            onSave={setClientAddress}  
                        />
                    </div>

                    <div className={cl.delivery}>
                        <h3 className={cl.delivery__title}>Получатель:</h3>
                        <p className={cl.delivery__info}>Укажите имя и телефон человека, который получит товар</p>
                        <EditFields
                            label="Введите имя"
                            value={clientRecipient.name}
                            onSave={(name) => setClientRecipient(prev => ({ ...prev, name }))}
                        />
                        <EditFields
                            label="Введите телефон"
                            value={clientRecipient.phone}
                            onSave={(phone) => setClientRecipient(prev => ({ ...prev, phone }))}
                        />
                    </div>

                    <div className={cl.products}>
                        <h3>Заказанные товары:</h3>
                        <div className={cl.products__list}>
                            {products.map(product => (
                                <CartCreatingItem key={product.id} product={product} cart={cart} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cl.orderInfo}>
                    <h3>Информация о заказе</h3>
                    <div><strong>Ваша корзина</strong><p>{cart.items.length} товаров • {totalCost} руб.</p></div>
                    <div><strong>Адрес доставки</strong><p>{clientAddress || 'Не указан'}</p></div>
                    <div><strong>Получатель</strong><p>{`${clientRecipient.name} +${clientRecipient.phone}`}</p></div>
                    <div><strong>Итого</strong><p>{totalCost} руб.</p></div>
                    <Link to={"/users/order-success"}>
                        <button className={cl.orderButton} onClick={handleOrder}>Оформить заказ</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};