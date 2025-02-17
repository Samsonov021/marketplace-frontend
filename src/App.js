import './App.css';
import Navbar from './components/ui/navbar/NavBar';
import { BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';

function App() {

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
