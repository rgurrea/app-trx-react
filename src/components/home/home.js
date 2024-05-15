import React, { useState, useEffect } from 'react';
import Mapa from '../../components/maps/Mapa';
import datosGeoJSON from '../../components/maps/datosGeoJSON'; // Importa los datos del archivo
import VehicleList from '../../components/vehicle/vehicleList'; // Importa los datos del archivo
import VehicleCard from '../../components/vehicle/vehicleCard'; // Asegúrate de importar correctamente el componente

function Home() {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedListVehicle, setSelectedListVehicle] = useState(null);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleVehicleSelection = (vehicle) => {
        // Establece el vehículo seleccionado en el estado
        setSelectedVehicle(vehicle);
    };

    const handleListVehicleSelection = (vehicle) => {
        setSelectedListVehicle(vehicle)
    };

    const handleVehicleDelete = () => {
        // Limpia selectedVehicle
        setSelectedVehicle(null);
    };

    return (
        <div>
            <div className="App" style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <div style={{ flex: '1', minWidth: isSmallScreen ? '100%' : '40%' }}>
                    <VehicleList onSelectVehicle={handleVehicleSelection} onListVehicle={handleListVehicleSelection} />
                </div>
                <div style={{ flex: '1', minWidth: isSmallScreen ? '100%' : '60%' }}>
                    <Mapa vehicles={selectedListVehicle} />
                    {/* Solo muestra la tarjeta si hay un vehículo seleccionado */}
                    {selectedVehicle && <VehicleCard vehicle={selectedVehicle} onVehicleDelete={handleVehicleDelete} />}
                </div>
            </div>
            {isSmallScreen && (
                <style>{`
                    .map-container {
                        flex: 1;
                    }
                `}</style>
            )}
        </div>
    );
}

export default Home;
