import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VehicleCard.css'; // Importa los estilos CSS

function VehicleCard({ vehicle, onVehicleDelete }) {
    const handleDelete = async () => {
        try {
           // await axios.delete(`http://127.0.0.1:3006/ad/${vehicle._id}`, {
            //await axios.delete(`http://localhost:3006/ad/${vehicle._id}`, {
            await axios.delete(`https://www.api.merakimx.mx/gpd/vehicle/ad/${vehicle._id}`, {
            //await axios.delete(`http://127.0.0.1:3006/ad/${vehicle._id}`, {
                data: {
                    status: false
                }
            });
            console.log('Eliminación exitosa');
            onVehicleDelete(); // Llama a la función para limpiar selectedVehicle en Home
        } catch (error) {
            console.error('Error al eliminar el vehículo:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    return (
        <div className="vehicle-card">

            <div>
                <Link
                    to={`/update?id=${vehicle._id}`}
                    className="update-link"
                >
                    Actualizar
                </Link>
            </div>
            <button
                onClick={handleDelete}
                className="delete-button"
            >

                Eliminar
            </button>
            <h3>{vehicle.BRAND} {vehicle.MODEL}</h3>
            <p><strong>Año:</strong> {vehicle.YEAR}</p>
            <p><strong>Color:</strong> {vehicle.COLOR}</p>
            <p><strong>Placa:</strong> {vehicle.placa}</p>
            <p><strong>Número Económico:</strong> {vehicle['numero economico']}</p>
            <p><strong>VIN:</strong> {vehicle.vim}</p>
            <p><strong>Asientos:</strong> {vehicle.asientos}</p>
            <p><strong>Seguro:</strong> {vehicle.seguro}</p>
            <p><strong>Número de Seguro:</strong> {vehicle['segure numebr']}</p>
        </div>


    );
}

export default VehicleCard;
