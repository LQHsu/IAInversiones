import React, {useMemo, useState} from 'react';
import InvestmentResults from './InvestmentResults';
import DisclaimerOverlay from './DisclamerOverlay';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, 
  BarElement, CategoryScale, LinearScale, ArcElement 
} from 'chart.js';
import InvestmentRecommendations from "./InvestmentRecomendations";

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
  const [recommendations, setRecommendations] = useState(null);

  const threshold = 135000;

  const investmentPeriods = [
    "DIA", "MES", "TRIMESTRE", "SEMESTRE", "YEAR", "TOW YEARS"
  ];

  const API_URL = "http://localhost:8000/inversion"; // Asegúrate de que sea la URL correcta

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(investmentAmount) < 50) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(API_URL, {
        monto_a_invertir: Number(investmentAmount),
        fija_o_flexible: investmentType,
        modelo_de_inversion: selectedPeriod,
      });

      console.log("📊 Datos recibidos:", response.data);
      setLoading(false);

      if (Array.isArray(response.data)) {
        // 🔥 Si la respuesta es un array, significa que es una recomendación de inversión
        setInvestmentData(null);
        setRecommendations(response.data);
      } else {
        // 🔥 Si la respuesta es un objeto con `inversiones`, es una inversión normal
        setInvestmentData(response.data);
        setRecommendations(null);
      }
    } catch (error) {
      console.error("Error en la API:", error);
    }
  };

  const recommendationsChartData = useMemo(() => ({
    labels: recommendations?.map(inv => inv.nombre) || [],
    datasets: [
      {
        label: 'Monto Asignado ($)',
        data: recommendations?.map(inv => inv.montoAsignado) || [],
        backgroundColor: ['rgba(24, 85, 152, 0.67)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  }), [recommendations]);

  const generateBarChartData = useMemo(() => ({
    labels: investmentData?.inversiones?.map(inv => inv.nombre) || [],
    datasets: [
      {
        label: 'Rendimiento total ($)',
        data: investmentData?.inversiones?.map(inv => inv.montoAsignado + inv.rendimiento) || [],
        backgroundColor: ['rgba(24, 85, 152, 0.67)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgb(75, 91, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        borderWidth: 1,
      }
    ]
  }), [investmentData]);

  const generatePieChartData = useMemo(() => ({
    labels: investmentData?.inversiones?.map(inv => inv.nombre) || [],
    datasets: [
      {
        label: 'Distribución de Inversión',
        data: investmentData?.inversiones?.map(inv => inv.montoAsignado) || [],
        backgroundColor: ['rgba(24, 85, 152, 0.67)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  }), [investmentData]);

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
                checked={investmentType === "Fija"}
                onChange={() => setInvestmentType("Fija")}
                style={{ marginRight: '0.5rem' }}
              />
              Fija
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={investmentType === "Flexible"}
                onChange={() => setInvestmentType("Flexible")}
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

 {/* Si el monto es menor a 130,000, mostramos los resultados normales */}
  {investmentData?.inversiones && (
    <>
      <InvestmentResults results={investmentData.inversiones} />
      <div style={{ marginTop: '2rem' }}>
        <Bar data={generateBarChartData} />

        {investmentAmount > 130000 &&
          <Pie data={generatePieChartData} options={{
                 plugins: {
                   title: { display: true, text: 'Distribución de Inversión', font: { size: 16 } }
                 }
               }} />}
      </div>
    </>
  )}

    </div>
  );
};

export default PantallaDeInversiones;