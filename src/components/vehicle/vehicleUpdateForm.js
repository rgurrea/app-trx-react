import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function VehicleUpdateForm() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const vehicleId = id;

    const [formData, setFormData] = useState({
        BRAND: '',
        MODEL: '',
        YEAR: '',
        COLOR: '',
        placa: '',
        'numero economico': '',
        vim: '',
        asientos: '',
        seguro: '',
        'segure numebr': ''
    });

    const [modifiedFields, setModifiedFields] = useState({}); // Estado para almacenar los campos modificados
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await axios.get(`https://www.api.merakimx.mx/gpd/vehicle/ads/${vehicleId}`);
                const vehicleData = response.data;
                setFormData(vehicleData);
            } catch (error) {
                console.error('Error al obtener los datos del vehículo:', error);
            }
        };

        fetchVehicleData();
    }, [vehicleId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setModifiedFields({
            ...modifiedFields,
            [name]: value
        });
        if (emptyFields.includes(name) && value !== '') {
            setEmptyFields(emptyFields.filter(field => field !== name));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithoutIdAndStatus = Object.fromEntries(
            Object.entries(modifiedFields).filter(([key]) => key !== '_id' && key !== 'status')
        );
        const emptyFieldsArray = Object.keys(formDataWithoutIdAndStatus).filter(key => formDataWithoutIdAndStatus[key] === '');
        if (emptyFieldsArray.length > 0) {
            setEmptyFields(emptyFieldsArray);
        } else {
            setEmptyFields([]);
            setLoading(true);
            try {
                const response = await axios.put(`https://www.api.merakimx.mx/gpd/vehicle/ad/${vehicleId}`, formDataWithoutIdAndStatus);
                console.log(response)
                setSuccessMessage('¡Los datos del formulario se actualizaron correctamente!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } catch (error) {
                console.error('Error al enviar los datos del formulario:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Actualización de Vehículo</h2>
            <div style={{ margin: '7%' }}>
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <p>Enviando datos...</p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "1rem",
                        }}
                    >
                        {Object.entries(formData).map(([key, value]) => (
                            // Excluye _id y status del mapeo
                            key !== '_id' && key !== 'status' && (
                                <div key={key} style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: "0.5rem" }}>
                                    <label htmlFor={key}>{key}{emptyFields.includes(key) && " *"}:</label>
                                    {key === 'YEAR' || key === 'asientos' ? (
                                        <input
                                            type="number"
                                            id={key}
                                            name={key}
                                            value={value}
                                            onChange={handleChange}
                                            required
                                            style={{ height: '25px' }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            id={key}
                                            name={key}
                                            value={value}
                                            onChange={handleChange}
                                            required
                                            style={{ height: '25px' }}
                                        />
                                    )}
                                    {emptyFields.includes(key) && <span style={{ color: 'red' }}>Campo requerido</span>}
                                </div>
                            )
                        ))}

                        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                            <button type="submit" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', border: 'aliceblue', }}>Actualizar</button>
                        </div>
                    </form>
                )}
                {successMessage && (
                    <div style={{ color: 'green', marginTop: '10px' }}>
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VehicleUpdateForm;
