import React from 'react';
import { Link } from 'react-router-dom';

function MenuBar() {
  return (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px 0' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', marginLeft: 10 }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', marginRight: '10px' }}>Vehiculos</Link>
          {/* Estilo para el enlace de "Alta" */}
          <Link to="/alta" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#28a745' }}>Alta</Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuBar;
