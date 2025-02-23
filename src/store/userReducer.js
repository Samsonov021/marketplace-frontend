import { registration } from "./authActions";

const initialState = {
    user: null,
    isAuthenticated: false,
    registrationSuccess: false,
    loading: false,
    error: null,
  };

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
        return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
        return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
        return { ...initialState };
    case 'REGISTER_REQUEST':
        return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
        return {
        ...state,
        registrationSuccess: true,
        loading: false,
    };
    case 'REGISTER_FAILURE':
        return { ...state, loading: false, error: action.payload };  
    case 'REFRESH_ERROR':
        return { ...state, error: null, registrationSuccess: false}
    default:
      return state;
  }
}

export default userReducer;