import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/routes/Menu';
import Ram from './components/routes/Ram';
import Tombola from './components/routes/Tombola';
import LoadingScreen from './components/LoadingScreen'; // Import the LoadingScreen component

function App() {
  const [showRam, setShowRam] = useState(false);

  // Callback function to be called when the countdown is complete
  const handleCountdownComplete = () => {
    setShowRam(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route
          path="/ram/*"
          element={showRam ? <Ram /> : <LoadingScreen onComplete={handleCountdownComplete} />}
        />
        <Route path="/tombola/*" element={<Tombola />} />
        <Route path="*" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
