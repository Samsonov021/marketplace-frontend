import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartInitial } from "./cart-initial/CartInitial";
import { CartCreating } from "./cart-creating/CartCreating";

const UserCartPage = () => {
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const { cart, user } = useSelector((state) => state.auth);

  const [cartTabs, setCartTabs] = useState(0);

  useEffect(() => {
    if (cart && cart.items) {
      setProducts(cart.items.map(item => item.product));
    }
  }, [cart]);

  const totalCost = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);


  return (
   <>
    {
      cartTabs === 0 && <CartInitial products={products} cart={cart} discount={discount} totalCost={totalCost} setCartTabs={setCartTabs} />
    }
    {
      cartTabs === 1 && <CartCreating products={products} cart={cart} totalCost={totalCost} user = {user} setCartTabs={setCartTabs}/>
    }
   </>
  );
};

export default UserCartPage;
