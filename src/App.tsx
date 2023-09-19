import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/routes/Menu';
import Ram from './components/routes/Ram';
import Tombola from './components/routes/Tombola';

function App() {
  return (
    <BrowserRouter>
      <div className='is-background'></div>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route
          path="/ram/*"
          element={<Ram />}
        />
        <Route path="/tombola/*" element={<Tombola />} />
        <Route path="*" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
