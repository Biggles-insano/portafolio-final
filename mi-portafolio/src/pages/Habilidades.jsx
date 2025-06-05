import React from 'react';

const Habilidades = () => {
  const habilidades = [
    { nombre: "HTML", nivel: 90 },
    { nombre: "CSS", nivel: 85 },
    { nombre: "JavaScript", nivel: 80 },
    { nombre: "React", nivel: 75 },
    { nombre: "Node.js", nivel: 70 },
  ];

  // Tamaños de los círculos (igual que en vanilla)
  const sizes = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20];

  return (
    <>
      {/* CSS vanilla convertido a JSX */}
      <style>{`
        .habilidades-section {
          padding: 4rem 0;
          background-color: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .habilidades-section h2 {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 3rem;
          color: #333;
        }

        .habilidades-lista {
          margin-bottom: 3rem;
        }

        .habilidad-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .habilidad-nombre {
          font-size: 1.125rem;
          color: #333;
          margin-right: 1rem;
        }

        .barra-contenedor {
          flex: 1;
          background-color: #e5e7eb;
          border-radius: 9999px;
          height: 10px;
        }

        .barra-progreso {
          background-color: #3b82f6;
          height: 100%;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .animacion-container {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .perspective-container {
          width: 24rem;
          height: 24rem;
          position: relative;
          display: grid;
          place-items: center;
          transform: rotateX(50deg);
        }

        .circle {
          border-radius: 50%;
          position: absolute;
          border: 1px solid #525252;
          animation: wave 2s ease-in-out infinite;
        }

        .circle:nth-child(1) { animation-delay: 0.8s; }
        .circle:nth-child(2) { animation-delay: 0.75s; }
        .circle:nth-child(3) { animation-delay: 0.7s; }
        .circle:nth-child(4) { animation-delay: 0.65s; }
        .circle:nth-child(5) { animation-delay: 0.6s; }
        .circle:nth-child(6) { animation-delay: 0.55s; }
        .circle:nth-child(7) { animation-delay: 0.5s; }
        .circle:nth-child(8) { animation-delay: 0.45s; }
        .circle:nth-child(9) { animation-delay: 0.4s; }
        .circle:nth-child(10) { animation-delay: 0.35s; }
        .circle:nth-child(11) { animation-delay: 0.3s; }
        .circle:nth-child(12) { animation-delay: 0.25s; }
        .circle:nth-child(13) { animation-delay: 0.2s; }
        .circle:nth-child(14) { animation-delay: 0.15s; }
        .circle:nth-child(15) { animation-delay: 0.1s; }
        .circle:nth-child(16) { animation-delay: 0.05s; }
        .circle:nth-child(17) { animation-delay: 0s; }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0px);
            border-color: #525252;
          }
          50% {
            transform: translateY(-40px);
            border-color: #f87171;
          }
        }
      `}</style>

      {/* HTML vanilla convertido a JSX */}
      <section className="habilidades-section">
        <div className="container">
          <h2>Habilidades</h2>
          
          {/* Lista de habilidades */}
          <div className="habilidades-lista">
            {habilidades.map((habilidad, index) => (
              <div key={index} className="habilidad-item">
                <span className="habilidad-nombre">{habilidad.nombre}</span>
                <div className="barra-contenedor">
                  <div 
                    className="barra-progreso" 
                    style={{ width: `${habilidad.nivel}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Animación de círculos concéntricos */}
          <div className="animacion-container">
            <div className="perspective-container">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className="circle"
                  style={{
                    width: `${size}%`,
                    height: `${size}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Habilidades;