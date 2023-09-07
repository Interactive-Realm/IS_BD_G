import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/routes/Menu';
import Ram from './components/routes/Ram';
import Tombola from './components/routes/Tombola';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/ram" element={<Ram />} />
        <Route path="/tombola" element={<Tombola />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
