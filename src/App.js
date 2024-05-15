// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import VehicleForm from './components/vehicle/vehicle'; // Importa los datos del archivo
import MenuBar from './components/menu/menuBar';
import VehicleUpdateForm from './components/vehicle/vehicleUpdateForm'; // Importa los datos del archivo


function App() {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alta" element={<VehicleForm />} />
        <Route path="/update" element={<VehicleUpdateForm />} />
      </Routes>
    </div>
  );
}

export default App;
