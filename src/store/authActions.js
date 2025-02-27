import axios from 'axios';
import { userLogin, userRegistration } from '../api/users.api';


export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await userLogin(credentials);
    console.log(response)
    localStorage.setItem('access_token', response.access_token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response});
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  } 
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('access_token');
};

export const registration = (credentials) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
      const response = await userRegistration(credentials);
      console.log("Ответ сервера (успех):", response);
      dispatch({ type: 'REGISTER_SUCCESS' });
  } catch (error) {
      console.log("Ошибка регистрации:", error.response?.data || error.message);
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response?.data?.message || "Ошибка регистрации" });
  }
};

export const checkAuth = () => async (dispatch) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
      dispatch({ type: 'LOGOUT' });
      return;
  }

  try {
      const response = await axios.get(
          'http://localhost:3000/users/me',
          {
              headers: { Authorization: `Bearer ${accessToken}` }
          }
      );

      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
      console.error("Ошибка проверки токена", error);
      localStorage.removeItem('access_token');
      dispatch({ type: 'LOGOUT' });
  }
};

export const editUserInfo = (userData) => async (dispatch) => {
  const accessToken = localStorage.getItem('access_token');

  try {
      const response = await axios.patch(
          'http://localhost:3000/users/me',
          userData,
          {
              headers: { Authorization: `Bearer ${accessToken}` },
          }
      );

      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
      console.error("Ошибка проверки токена", error);
      localStorage.removeItem('access_token');
      dispatch({ type: 'LOGOUT' });
  }
};


export const refreshError = () => (dispatch) => {
    dispatch({ type: 'REFRESH_ERROR' });
  };