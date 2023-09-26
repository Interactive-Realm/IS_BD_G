import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ram from './components/routes/Ram';
import Tombola from './components/routes/Tombola';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Ram />}
        />
        <Route path="/tombola/*" element={<Tombola />} />
        <Route path="*" element={<Ram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
