import React from 'react';

const DisclaimerOverlay = ({ onClose }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '0 1rem',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1a1a1a'
  };

  const contentStyle = {
    marginBottom: '1.5rem',
    color: '#4a4a4a',
    lineHeight: '1.6'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  };

  const paragraphStyle = {
    marginBottom: '1rem'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Aviso Importante</h2>
        <div style={contentStyle}>
          <p style={paragraphStyle}>
            La información proporcionada en esta página es únicamente para fines educativos e ilustrativos.
          </p>
          <p style={paragraphStyle}>
            Los datos mostrados pueden estar desactualizados y no representan una garantía de rendimiento futuro.
          </p>
          <p style={paragraphStyle}>
            Las inversiones siempre conllevan riesgos y es importante consultar con un asesor financiero profesional antes de tomar decisiones de inversión.
          </p>
        </div>
        <button
          onClick={onClose}
          style={buttonStyle}
          onMouseOver={e => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
        >
          Entiendo
        </button>
      </div>
    </div>
  );
};

export default DisclaimerOverlay;