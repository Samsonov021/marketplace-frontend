import './App.css';
import ProductList from './components/product-list/ProductList';
// import Footer from './components/ui/footer/Footer';
import Navbar from './components/ui/navbar/NavBar';
import MainPage from './pages/MainPage';

function App() {
  
  
  
  return (
    <div className="App">
      <Navbar/>
      <MainPage/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
