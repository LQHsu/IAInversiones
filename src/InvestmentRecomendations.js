import React from 'react';

const InvestmentRecommendations = ({ recommendations = [] }) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return <p>No hay recomendaciones disponibles.</p>;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        📊 Distribución Recomendada de Inversión
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {recommendations.map((rec, index) => (
          <div key={index} style={{
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
              {rec.nombre}
            </h3>
            <p><strong>Tipo:</strong> {rec.tipo}</p>
            <p><strong>Monto Asignado:</strong> ${rec.montoAsignado}</p>
            <p><strong>Rendimiento Estimado:</strong> {rec.rendimiento.toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentRecommendations;
