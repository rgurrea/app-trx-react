import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import carIconImg from '../../car.svg';

function Mapa({ vehicles }) {
    const carIcon = L.icon({
        iconUrl: carIconImg,
        iconSize: [32, 32],
    });

    const TrazarRutas = ({ vehiculos }) => {
        const map = useMap();

        // Eliminar todas las capas de rutas existentes antes de trazar nuevas
        map.eachLayer(layer => {
            if (layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        if (vehiculos && vehiculos.length) {
            vehiculos.forEach(vehiculo => {
                const { init, end } = vehiculo;
                const polyline = L.polyline([init, end], { color: 'blue' }).addTo(map);
                map.fitBounds(polyline.getBounds());
            });

        }

        return null;
    };

    return (
        <MapContainer center={[19.5, -99.14946]} zoom={13} style={{ height: '400px', width: 'auto', margin: '33px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <TrazarRutas vehiculos={vehicles} />
            {vehicles && vehicles.length > 0 && vehicles.map(vehiculo => (
                <div key={vehiculo._id}>
                    <Marker position={vehiculo.init} icon={carIcon}>
                        <Popup>
                            Inicio - <strong>{vehiculo && vehiculo.BRAND} {vehiculo && vehiculo.MODEL} {vehiculo && vehiculo.BRAND}</strong>
                            Placa: <strong>{vehiculo && vehiculo.placa}</strong>
                        </Popup>
                    </Marker>
                    <Marker position={vehiculo.end} icon={carIcon}>
                        <Popup>
                            Fin - <strong>{vehiculo && vehiculo.BRAND} {vehiculo && vehiculo.MODEL} {vehiculo && vehiculo.BRAND}</strong>
                            Placa: <strong>{vehiculo && vehiculo.placa}</strong>
                        </Popup>
                    </Marker>
                </div>
            ))}
        </MapContainer>
    );
}

export default Mapa;
