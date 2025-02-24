import './App.css';
import Navbar from './components/ui/navbar/NavBar';
import { BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { useEffect } from 'react';
import { checkAuth } from './store/authActions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
}, []);
 
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
