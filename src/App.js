import './App.css';
import Navbar from './components/ui/navbar/NavBar';
import { BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { useEffect } from 'react';
import { checkAuth, loadCart, loadFavorites } from './store/authActions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadFavorites());
    dispatch(loadCart());
}, [dispatch]);
 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
