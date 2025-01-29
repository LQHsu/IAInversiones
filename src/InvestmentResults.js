import React from 'react';

const InvestmentResults = ({ results = [] }) => { // 🔥 Le damos un valor por defecto
  if (!Array.isArray(results)) {
    console.error("❌ Error: 'results' no es un array", results);
    return <p>Error al cargar los resultados.</p>;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Resultados de Inversión
      </h2>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {results.map((result, index) => (
          <div key={index} style={{
                 border: '1px solid #e2e8f0',
                 borderRadius: '0.5rem',
                 backgroundColor: 'white',
                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                 padding: '1.5rem'
               }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
              {result.nombre}
            </h3>
            <p><strong>Tipo:</strong> {result.tipo}</p>
            <p><strong>Monto Asignado:</strong> ${result.montoAsignado}</p>
            <p><strong>Rendimiento:</strong> {result.rendimiento.toFixed(2)}</p>
            <p><strong>Total al finalizar plazo:</strong> {(result.rendimiento + result.montoAsignado).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InvestmentResults;