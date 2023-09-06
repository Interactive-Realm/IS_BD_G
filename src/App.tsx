import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './components/routes/Game';
import Menu from './components/routes/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
