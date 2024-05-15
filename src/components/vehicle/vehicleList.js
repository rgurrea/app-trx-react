import React, { useState, useEffect } from 'react';
import imgCar from '../../resources/Comfort_Premium.png';
import io from 'socket.io-client';
import './vehicleList.css'; // Importa los estilos CSS
import datosGeoJSON from '../../components/maps/datosGeoJSON'; // Importa los datos del archivo

// Configura el cliente Socket.io para conectarse al servidor en localhost:3006
//const socket = io('http://74.208.81.50:3006', { path: '/gpd/vehicle' });
//const socket = io('http://localhost:3006/');
const socket = io('https://www.api.merakimx.mx', { path: '/gpd/vehicle'});

//const socket = io('http://127.0.0.1:3006',{ path: '/gpd/vehicle'});


function VehicleList({ onSelectVehicle, onListVehicle }) {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1); // Página inicial
    const [selectedVehicles, setSelectedVehicles] = useState([]);

    useEffect(() => {
        fetchData();
        socket.on('vehicleUpdate', (deletedAdId) => {
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== parseInt(deletedAdId)));
        });
    }, [page]); // Escuchar cambios en la página

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.api.merakimx.mx/gpd/vehicle/ads?page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setPage(1); // Restablecer la página a 1 cuando cambie el término de búsqueda
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(page - 1);
    };

    const filteredVehicles = vehicles.filter((vehicle) =>
        (vehicle.BRAND && vehicle.BRAND.toLowerCase().includes(searchTerm)) ||
        (vehicle.MODEL && vehicle.MODEL.toLowerCase().includes(searchTerm)) ||
        (vehicle.YEAR && vehicle.YEAR.toString().includes(searchTerm)) ||
        (vehicle.COLOR && vehicle.COLOR.toLowerCase().includes(searchTerm)) ||
        (vehicle.vim && vehicle.vim.toLowerCase().includes(searchTerm))
    );

    const handleSelectVehicle = (vehicle) => {
        const index = selectedVehicles.findIndex(v => v._id === vehicle._id);
        if (index === -1) {
            setSelectedVehicles([...selectedVehicles, vehicle]);
        } else {
            setSelectedVehicles(selectedVehicles.filter(v => v._id !== vehicle._id));
        }
    };

    const handleSelectVehicleDetail = (vehicle) => {
        const generateRandomCoordinate = (min, max) => {
            return min + Math.random() * (max - min);
        };
        vehicle['init'] = [generateRandomCoordinate(19.0, 20.0), generateRandomCoordinate(-100.0, -99.0)]
        vehicle['end'] = [generateRandomCoordinate(19.0, 20.0), generateRandomCoordinate(-100.0, -99.0)]
        onSelectVehicle(vehicle);
    };

    const isSelected = (vehicle) => {
        onListVehicle(selectedVehicles)
        return selectedVehicles.some(v => v._id === vehicle._id);
    };

    return (
        <div>
            <div style={{ margin: '30px', maxHeight: '600px', overflowY: 'auto' }}>
                <h2>Lista de Vehículos</h2>
                <input type="text" placeholder="Buscar..." onChange={handleSearchChange} className="input-search" />
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredVehicles.map(vehicle => (
                        <li onClick={() => handleSelectVehicleDetail(vehicle)} key={vehicle._id} style={{ margin: '10px 0', width: '97%', marginBottom: ' 8%', height: "100px" }}>
                            <div
                                style={{
                                    padding: '5px 10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    backgroundColor: isSelected(vehicle) ? '#00ff00' : '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '95%',
                                }}>
                                <input
                                    type="checkbox"
                                    checked={isSelected(vehicle)}
                                    onChange={() => handleSelectVehicle(vehicle)}
                                    style={{ marginRight: '10px' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <div style={{ flex: '1', minWidth: '30%' }}>
                                        <img src={imgCar} alt="Vehicle" style={{ width: '100px', height: '100px' }} />
                                    </div>
                                    <div style={{ flex: '1', minWidth: '70%', paddingLeft: '10px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <div style={{ fontSize: '18px', margin: 0, textAlign: 'left', marginBottom: '5px' }}>
                                            <strong>{vehicle.BRAND} {vehicle.MODEL} {vehicle.YEAR}</strong>
                                        </div>
                                        <div style={{ margin: 0, textAlign: 'left', marginBottom: '5px' }}>
                                            <strong>Color:</strong> {vehicle.COLOR}
                                        </div>
                                        <div style={{ margin: 0, textAlign: 'left', marginBottom: '5px' }}>
                                            <strong>VIN:</strong> {vehicle.vim}
                                        </div>
                                        <div style={{ margin: 0, textAlign: 'left', marginBottom: '5px' }}>
                                            <strong>Seguro:</strong> {vehicle.seguro}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {/* Botón de página anterior */}
                <button onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
                {/* Botón de página siguiente */}
                <button onClick={handleNextPage}>Siguiente</button>
            </div>
        </div>
    );
}

export default VehicleList;
