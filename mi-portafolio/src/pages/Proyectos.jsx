import "./Proyectos.css";
import React, { useState } from "react";

export default function Proyectos() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      id: 'mercury',
      name: 'Proyecto Mercury',
      image: '/mercury.png',
      description: 'Descripción del proyecto Mercury aquí',
      github: 'https://github.com/tu-usuario/proyecto-mercury',
      tech: 'React, Node.js, MongoDB'
    },
    {
      id: 'venus',
      name: 'Proyecto Venus',
      image: '/venus.png',
      description: 'Descripción del proyecto Venus aquí',
      github: 'https://github.com/tu-usuario/proyecto-venus',
      tech: 'Vue.js, Express, PostgreSQL'
    },
    {
      id: 'earth',
      name: 'Proyecto Earth',
      image: '/earth.png',
      description: 'Descripción del proyecto Earth aquí',
      github: 'https://github.com/tu-usuario/proyecto-earth',
      tech: 'Angular, Django, MySQL'
    },
    {
      id: 'sun',
      name: 'Proyecto Principal',
      image: '/sun.png',
      description: 'Mi proyecto más importante y destacado',
      github: 'https://github.com/tu-usuario/proyecto-principal',
      tech: 'Full Stack - React, Node.js, AWS'
    }
  ];

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };

  const closeModal = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className="solar-system-wrapper">
      <div className="solar-system-container">
        
        {/* Título */}
        <div className="projects-title">
          <h1>Mis Proyectos</h1>
          <p>Explora mi sistema solar de proyectos</p>
        </div>

        {/* Planetas en línea */}
        <div className="planets-row">
          {planets.map((planet, index) => (
            <div 
              key={planet.id}
              className={`planet-item ${planet.id}`}
              onClick={() => handlePlanetClick(planet)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="planet-container-inline">
                <img src={planet.image} alt={planet.name} />
                <div className="planet-glow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedPlanet && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>×</button>
              
              <div className="modal-header">
                <img src={selectedPlanet.image} alt={selectedPlanet.name} className="modal-planet-image" />
                <h2>{selectedPlanet.name}</h2>
              </div>
              
              <div className="modal-body">
                <p className="project-description">{selectedPlanet.description}</p>
                
                <div className="tech-stack">
                  <h3>Tecnologías:</h3>
                  <p>{selectedPlanet.tech}</p>
                </div>
                
                <div className="project-links">
                  <a 
                    href={selectedPlanet.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    🔗 Ver en GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .solar-system-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 40px 20px;
        }

        .solar-system-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .projects-title {
          text-align: center;
          margin-bottom: 60px;
          z-index: 5;
        }

        .projects-title h1 {
          font-size: 3rem;
          color: #000;
          margin-bottom: 10px;
          text-shadow: none;
          font-weight: 300;
        }

        .projects-title p {
          font-size: 1.2rem;
          color: rgba(0, 0, 0, 0.7);
          margin: 0;
        }

        .planets-row {
          display: flex;
          gap: 80px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          z-index: 5;
        }

        .planet-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards;
        }

        .planet-item:hover {
          transform: translateY(-10px) scale(1.1);
        }

        .planet-container-inline {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .planet-container-inline img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transition: all 0.3s ease;
          z-index: 2;
          position: relative;
        }

        .planet-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .planet-item:hover .planet-glow {
          opacity: 1;
        }

        .mercury .planet-glow {
          box-shadow: 0 0 20px rgba(255, 198, 73, 0.6);
        }

        .venus .planet-glow {
          box-shadow: 0 0 35px rgba(255, 149, 0, 0.9);
        }

        .earth .planet-glow {
          box-shadow: 0 0 25px rgba(107, 147, 214, 0.7);
        }

        .sun .planet-glow {
          box-shadow: 0 0 60px rgba(255, 215, 0, 1.0);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }

        .modal-content {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.8);
          animation: modalSlideIn 0.3s ease forwards;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          color: #fff;
          font-size: 2rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .close-btn:hover {
          opacity: 1;
        }

        .modal-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          gap: 20px;
        }

        .modal-planet-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }

        .modal-header h2 {
          color: #fff;
          margin: 0;
          font-size: 1.8rem;
          font-weight: 300;
        }

        .modal-body {
          color: #fff;
        }

        .project-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 25px;
          opacity: 0.9;
        }

        .tech-stack {
          margin-bottom: 25px;
        }

        .tech-stack h3 {
          color: #ffd700;
          font-size: 1.2rem;
          margin-bottom: 10px;
          font-weight: 400;
        }

        .tech-stack p {
          opacity: 0.8;
          font-size: 1rem;
        }

        .project-links {
          text-align: center;
        }

        .github-link {
          display: inline-block;
          padding: 12px 25px;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .github-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* Animaciones */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .planets-row {
            gap: 40px;
          }
          
          .planet-container-inline {
            width: 90px;
            height: 90px;
          }
          
          .projects-title h1 {
            font-size: 2rem;
          }
          
          .modal-content {
            padding: 20px;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
}