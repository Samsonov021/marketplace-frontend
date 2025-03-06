const initialState = {
    user: null,
    isAuthenticated: false,
    favorites: [],
    cart: { items: [] },
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
      return { ...state, error: null, registrationSuccess: false };
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'ADD_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'DELETE_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };

      case 'LOAD_CART':
      return {
          ...state,
          cart: {
              items: action.payload.items || action.payload || [],
          },
      };
    case 'ADD_CART':
        return {
            ...state,
            cart: {
                ...state.cart,
                items: [...state.cart.items, { ...action.payload, quantity: 1 }],
            },
        };
    case 'DELETE_CART':
        return {
            ...state,
            cart: {
                ...state.cart,
                items: state.cart.items.filter((item) => item.productId !== action.payload),
            },
        };

    case 'INCREASE_CART':
        return {
          ...state,
          cart: {
              ...state.cart,
              items: state.cart.items.map((item) =>
                  item.productId === action.payload
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
              ),
          },
        };

    case 'DECREASE_CART':
        return {
          ...state,
          cart: {
            ...state.cart,
              items: state.cart.items
                .map((item) =>
                  item.productId === action.payload
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
                )
                .filter((item) => item.quantity > 0), 
          },
        };
      
    default:
      return state;
  }
  
}

export default userReducer;