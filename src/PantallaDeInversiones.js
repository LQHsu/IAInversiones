import React, { useState } from 'react';
import InvestmentResults from './InvestmentResults';
import DisclaimerOverlay from './DisclamerOverlay';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, 
  BarElement, CategoryScale, LinearScale, ArcElement 
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);


const PantallaDeInversiones = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Seleccionar plazo');
  const [investmentType, setInvestmentType] = useState("Fija");
  const [showResults, setShowResults] = useState(false);
  const [showRecomendations, setShowRecomendatios] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [investmentData, setInvestmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const threshold = 135000;

  const investmentPeriods = [
    "DIA", "MES", "TRIMESTRE", "SEMESTRE", "YEAR", "TOW YEARS"
  ];

  const API_URL = "http://localhost:8000/inversion";  // Esta es la URL correcta

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(investmentAmount) < 50) return;
  
    setLoading(true);
    setError(null);
  
    const requestData = {
      monto_a_invertir: Number(investmentAmount),
      fija_o_flexible: investmentType,
      modelo_de_inversion: selectedPeriod,
    };
  
    console.log('Enviando petición a:', API_URL);
    console.log('Datos enviados:', requestData);
  
    try {
      const response = await axios.post(API_URL, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Respuesta completa:", response);
      setInvestmentData(response.data);
    } catch (error) {
      console.error("Error completo:", error);
      
      if (error.response) {
        setError(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setError("No se pudo conectar con el servidor. Verifica que la API esté corriendo en http://localhost:8000");
      } else {
        setError(`Error al procesar la solicitud: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResults = (e) => {
    e.preventDefault();
    if (Number(investmentAmount) >= 50) {
      setShowResults(true);
    }
    if(Number(investmentAmount) > threshold)
        {
            setShowRecomendatios(true);
        }
  };

  const generateBarChartData = () => ({
    labels: investmentData?.inversiones.map(inv => inv.nombre) || [],
    datasets: [
      {
        label: 'Rendimiento Total ($)',
        data: investmentData?.inversiones.map(inv => inv.rendimiento) || [],
        backgroundColor: ['rgba(24, 85, 152, 0.67)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgb(75, 91, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        borderWidth: 1,
      }
    ]
  });

  const generatePieChartData = () => ({
    labels: investmentData?.inversiones.map(inv => inv.nombre) || [],
    datasets: [
      {
        label: 'Distribución de Inversión',
        data: investmentData?.inversiones.map(inv => inv.montoAsignado) || [],
        backgroundColor: ['rgba(24, 85, 152, 0.67)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  });

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
  };

  const dropdownButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative'
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    marginTop: '0.25rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10
  };

  const dropdownItemStyle = {
    padding: '0.75rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f8fafc'
    }
  };

  const radioGroupStyle = {
    display: 'flex',
    gap: '2rem'
  };

  const radioLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#1d4ed8'
    }
  };

  return (

      
    <div style={containerStyle}>
        {/* Add the disclaimer overlay */}
      {showDisclaimer && (
        <DisclaimerOverlay onClose={() => setShowDisclaimer(false)} />
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            color: '#2563eb'
          }}>
            Simulador de Inversiones
          </h2>
          
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            placeholder="Cantidad a invertir"
            style={inputStyle}
            min="50"
          />
        </div>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={dropdownButtonStyle}
          >
            {selectedPeriod}
          </button>
          {isDropdownOpen && (
            <div style={dropdownMenuStyle}>
              {investmentPeriods.map((period) => (
                <div
                  key={period}
                  style={dropdownItemStyle}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                >
                  {period}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p style={{ marginBottom: '0.75rem', color: '#4b5563' }}>Tipo de inversión</p>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={investmentType === "Fijas"}
                onChange={() => setInvestmentType("Fijas")}
                style={{ marginRight: '0.5rem' }}
              />
              Fija
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={investmentType === "Flexibles"}
                onChange={() => setInvestmentType("Flexibles")}
                style={{ marginRight: '0.5rem' }}
              />
              Flexible
            </label>
          </div>
        </div>

        <button type="submit" style={{
          width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none',
          borderRadius: '0.375rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold'
        }}>
          {loading ? "Cargando..." : "Confirmar Inversión"}
        </button>

        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </form>

{investmentData&&showResults && Number(investmentAmount) >= 50 && Number(investmentAmount)<threshold && (
  <>
    <InvestmentResults results={investmentData} />
    <div style={{ marginTop: '2rem' }}>
      <Bar data={generateBarChartData()} options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparación de Ganancias de Inversión',
            font: {
              size: 16
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              stepSize: 50,
              max: Math.max(...investmentData.map(result => result.finalAmount))+50
            }
          }
        }
      }} />
      
    </div>

  </>
)}
{showRecomendations && Number(investmentAmount) > threshold && (
    
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
              <h3 style={{ color: '#dc2626' }}>💡 Recomendación de Inversión:</h3>
              <ul>
                {investmentData.map((rec, index) => (
                  <li key={index}>
                    <strong>{rec.institution}:</strong> ${rec.recommendedAmount}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '2rem' }}>
            <Pie data={generatePieChartData()} options={{
              plugins: {
                title: { display: true, text: 'Distribución de Inversión', font: { size: 16 } }
              }
            }} />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Bar data={generateBarChartData()} options={{
              responsive: true,
              plugins: { title: { display: true, text: 'Comparación de Ganancias de Inversión', font: { size: 16 } } },
              scales: { y: { beginAtZero: false } }
            }} />
          </div>
            </div>
            
          )}

          

    </div>
  );
};

export default PantallaDeInversiones;