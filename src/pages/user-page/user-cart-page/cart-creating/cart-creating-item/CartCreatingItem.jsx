import cl from './CartCreatingItem.module.css';

export const CartCreatingItem = ({ product, cart }) => {

    const productQuantity = cart.items.find((item) => item.productId === product.id)?.quantity;

    return (
        <div className={cl.product__item}>
            <img src={product.photo} alt={product.name} className={cl.product__image} />

            <div className={cl.product__quantity}>{productQuantity} шт.</div>

            <div className={cl.product__quantity}>{product.price * productQuantity} руб.</div>
        </div>
    )
}
