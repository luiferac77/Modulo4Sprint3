import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
function App() {

  return (
    <CartProvider>
      
        <Header />
        <ProductList />
        <Footer />
    </CartProvider>
  )
}

export default App;
