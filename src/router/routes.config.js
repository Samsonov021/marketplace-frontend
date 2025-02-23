import MainPage from "../pages/main-page/MainPage";
import { Navigate } from "react-router-dom";
import ProductPage from "../pages/product-page/ProductPage";

export const routes = [
    { path: "/", component: <MainPage />, exact: true },
    { path: "*", component: <Navigate to="/" replace />, exact: true },
    { path: "/products/:id", component: <ProductPage />, exact: true },
];