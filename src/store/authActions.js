import { userLogin, userRegistration } from '../api/auth.api';

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await userLogin(credentials);
    console.log(response)
    dispatch({ type: 'LOGIN_SUCCESS', payload: response});
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
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

export const refreshError = () => (dispatch) => {
    dispatch({ type: 'REFRESH_ERROR' });
  };