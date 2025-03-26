import MainPage from "../pages/main-page/MainPage";
import { Navigate } from "react-router-dom";
import ProductPage from "../pages/product-page/ProductPage";
import UserProfilePage from "../pages/user-page/user-profile-page/UserProfilePage";
import UserFavoritePage from "../pages/user-page/user-favorites-page/UserFavoritePage";
import UserCartPage from "../pages/user-page/user-cart-page/UserCartPage";
import  OrderCreatePage  from "../pages/user-page/user-cart-page/order-create/OrderCreatePage";
import UserOrdersPage from "../pages/user-page/user-orders-page/UserOrdersPage";
import SearchPage from "../pages/search-page/SearchPage";

export const routes = [
    { path: "/", component: <MainPage />, exact: true },
    { path: "/products/:id", component: <ProductPage />, exact: true },
    { path: "/users/:id", component: <UserProfilePage />, exact: true },
    { path: "/users/favorites", component: <UserFavoritePage />, exact: true },
    { path: "/users/cart", component: <UserCartPage />, exact: true },
    { path: "/users/orders", component: <UserOrdersPage />, exact: true },
    { path: "/users/order-success", component: <OrderCreatePage />, exact: true },
    { path:"/search", component: <SearchPage />, exact: true },
    
    { path: "*", component: <Navigate to="/" replace />, exact: true },
];