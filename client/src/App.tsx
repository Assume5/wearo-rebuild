import './dist/main.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Page } from './pages';
import { UserContextProvider } from './contexts/UserContext';
import { CartContextProvider } from './contexts/CartContext';
import { PromoContextProvider } from './contexts/PromoContext';
import { FavoritesContextContextProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <CartContextProvider>
          <FavoritesContextContextProvider>
            <PromoContextProvider>
              <Page />
            </PromoContextProvider>
          </FavoritesContextContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
