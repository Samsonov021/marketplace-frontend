import axios from "axios";
import {
  addFavorite,
  addToCart,
  decreaseQuantityInCart,
  deleteFavorite,
  deleteFromCart,
  increaseQuantityInCart,
  loadAllOrders,
  loadFromCart,
  userLogin,
  userRegistration,
} from "../api/users.api";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const response = await userLogin(credentials);
    localStorage.setItem("access_token", response.access_token);
    dispatch({ type: "LOGIN_SUCCESS", payload: response });
    dispatch(loadFavorites());
    dispatch(loadCart());
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("access_token");
};

export const registration = (credentials) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });

  try {
    const response = await userRegistration(credentials);
    dispatch({ type: "REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.data?.message || "Ошибка регистрации",
    });
  }
};

export const checkAuth = () => async (dispatch) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    dispatch({ type: "LOGOUT" });
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    localStorage.removeItem("access_token");
    dispatch({ type: "LOGOUT" });
  }
};

export const editUserInfo = (userData) => async (dispatch) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.patch(
      "http://localhost:3000/users/me",
      userData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Ошибка проверки токена", error);
    localStorage.removeItem("access_token");
    dispatch({ type: "LOGOUT" });
  }
};

export const refreshError = () => (dispatch) => {
  dispatch({ type: "REFRESH_ERROR" });
};

export const loadFavorites = () => async (dispatch) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.get("http://localhost:3000/users/favorites", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch({ type: "LOAD_FAVORITES", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_FAVORITES", payload: [] });
  }
};

export const addFavorites = (product) => async (dispatch) => {
  try {
    await addFavorite(product.id);
    dispatch({ type: "ADD_FAVORITES", payload: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorites = (productId) => async (dispatch) => {
  try {
    await deleteFavorite(productId);
    dispatch({ type: "DELETE_FAVORITES", payload: productId });
  } catch (error) {
    console.log(error);
  }
};

export const loadCart = () => async (dispatch) => {
  try {
    const response = await loadFromCart();
    dispatch({ type: "LOAD_CART", payload: response });

  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_CART", payload: { items: [] } });
  }
};

export const addCart = (product) => async (dispatch) => {
  try {
    await addToCart(product.id);
    const cartItem = {
      productId: product.id,
      quantity: 1,
      product: product,
    };
    dispatch({ type: "ADD_CART", payload: cartItem });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCart = (productId) => async (dispatch) => {
  try {
    await deleteFromCart(productId);
    dispatch({ type: "DELETE_CART", payload: productId });
  } catch (error) {
    console.error( error);
  }
}

export const increaseCart = (productId) => async (dispatch) => {
  try {
    await increaseQuantityInCart(productId);
    dispatch({ type: "INCREASE_CART", payload: productId });
  } catch (error) {
    console.error( error);
  }
}

export const decreaseCart = (productId) => async (dispatch) => {
  try {
    await decreaseQuantityInCart(productId);
    dispatch({ type: "DECREASE_CART", payload: productId });
  } catch (error) {
    console.error( error);
  }
}

export const createOrder = (orderData) => async (dispatch) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.post(
      "http://localhost:3000/users/orders/create",
      orderData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: response.data });
    dispatch({ type: "CLEAR_CART" }); 
  } catch (error) {
    console.error("Ошибка создания заказа", error);
    dispatch({
      type: "CREATE_ORDER_FAILURE",
      payload: error.response?.data?.message || "Ошибка при создании заказа",
    });
  }
};

export const loadOrders = () => async (dispatch) => {
  const accessToken = localStorage.getItem("access_token");

  try {
      const response = await axios.get("http://localhost:3000/users/orders", {
          headers: { Authorization: `Bearer ${accessToken}` },
      });

      dispatch({ type: "LOAD_ORDERS", payload: response.data });
  } catch (error) {
      console.error("Ошибка загрузки заказов", error);
      dispatch({ type: "LOAD_ORDERS", payload: [] });
  }
};

export const setSearchQuery = (query) => ({
  type: 'SET_SEARCH_QUERY',
  payload: query,
});
