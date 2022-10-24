import './dist/main.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Page } from './pages';
import { UserContextProvider } from './contexts/UserContext';
import { CartContextProvider } from './contexts/CartContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <CartContextProvider>
          <Page />
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
