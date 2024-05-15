import React, { useState } from 'react';
import axios from 'axios';
import './vehicle.css'; // Importa los estilos CSS

function VehicleForm() {
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

    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (emptyFields.includes(e.target.name) && e.target.value !== '') {
            setEmptyFields(emptyFields.filter(field => field !== e.target.name));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFieldsArray = Object.keys(formData).filter(key => formData[key] === '');
        if (emptyFieldsArray.length > 0) {
            setEmptyFields(emptyFieldsArray);
        } else {
            setEmptyFields([]);
            setLoading(true);
            try {
                const response = await axios.post('https://www.api.merakimx.mx/gpd/vehicle/creates', formData);
                console.log('Datos del formulario enviados correctamente.');
                setSuccessMessage('¡Los datos del formulario se enviaron correctamente!');
                setFormData({
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
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);

            } catch (error) {
                console.error('Error al enviar los datos del formulario:', error);
            }
        }
    };


    return (
        <div>
            <h2 className='loading-indicator'>Alta de Vehículo</h2>
            <div className='vehicle-form-container'>
                {loading ? (
                    <div className='loading-indicator'>
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
                                <div key={key} className='form-item'>
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
                                    {emptyFields.includes(key) && <span className='error-message'>Campo requerido</span>}
                                </div>
                            )
                        ))}
                        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                            <button type="submit" className='submit-button'>Crear</button>
                        </div>
                    </form>)}
                {successMessage && (
                    <div style={{ color: 'green', marginTop: '10px' }}>
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VehicleForm;
