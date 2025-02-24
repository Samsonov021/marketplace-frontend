import axios from 'axios';
import { userLogin, userRegistration } from '../api/auth.api';


export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await userLogin(credentials);
    console.log(response)
    localStorage.setItem('authToken', response.access_token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response});
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  } 
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('authToken');
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
  const token = localStorage.getItem('access_token');

  if (!token) {
      dispatch({ type: 'LOGOUT' });
      return;
  }

  try {
      const response = await axios.post(
          'http://localhost:3000/auth/me',
          {}, 
          {
              headers: { Authorization: `Bearer ${token}` }
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