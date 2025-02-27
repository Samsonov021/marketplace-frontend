import MainPage from "../pages/main-page/MainPage";
import { Navigate } from "react-router-dom";
import ProductPage from "../pages/product-page/ProductPage";
import UserProfilePage from "../pages/user-page/user-profile-page/UserProfilePage";
import UserFavoritePage from "../pages/user-page/user-favorites-page/UserFavoritePage";

export const routes = [
    { path: "/", component: <MainPage />, exact: true },
    { path: "/products/:id", component: <ProductPage />, exact: true },
    { path: "/users/:id", component: <UserProfilePage />, exact: true },
    { path: "/users/favorites", component: <UserFavoritePage />, exact: true },
    
    { path: "*", component: <Navigate to="/" replace />, exact: true },
];