import './dist/main.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Page } from './pages';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Page />
      </UserContextProvider>
    </div>
  );
}

export default App;
