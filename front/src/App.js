import './App.css';
import Home from './pages/Home';
import { CoinApiProvider } from './contexts/coinapi'

function App() {
  return (
      <CoinApiProvider>
        <div className="App">
          <Home />
        </div>
      </CoinApiProvider>
  );
}

export default App;
