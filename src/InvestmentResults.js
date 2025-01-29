import React from 'react';

const InvestmentResults = ({ results }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1.5rem' 
      }}>
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
            overflow: 'hidden',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#2563eb'
              }}>
                {result.institution}
              </h3>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Rendimiento */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Rendimiento:</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: '#16a34a'
                  }}>{result.yield}%</span>
                </div>

                {/* Monto Inicial */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Monto inicial:</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {formatCurrency(result.initialAmount)}
                  </span>
                </div>

                {/* Monto Final */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Monto final:</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: '#2563eb'
                  }}>
                    {formatCurrency(result.finalAmount)}
                  </span>
                </div>

                {/* Seguro */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Seguro:</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: result.insurance === 'Sí' ? '#16a34a' : '#dc2626'
                  }}>
                    {result.insurance}
                  </span>
                </div>

                {/* Confiabilidad */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Confiabilidad:</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: result.reliability === 'Alta' ? '#16a34a' : 
                          result.reliability === 'Media' ? '#ca8a04' : '#dc2626'
                  }}>
                    {result.reliability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentResults;