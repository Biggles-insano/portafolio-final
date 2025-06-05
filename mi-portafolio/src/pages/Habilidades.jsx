import React, { useEffect, useRef, useState } from 'react';

const Habilidades = () => {
  const svgRef = useRef(null);
  const [drift, setDrift] = useState(0);
  const [amplitude, setAmplitude] = useState(0);
  
  const habilidades = [
    { nombre: "HTML", nivel: 90, dimension: "Front-End Core" },
    { nombre: "CSS", nivel: 85, dimension: "Style & Layout" },
    { nombre: "JavaScript", nivel: 80, dimension: "Scripting Logic" },
    { nombre: "React", nivel: 75, dimension: "UI Components" },
    { nombre: "Node.js", nivel: 70, dimension: "Back-end Power" },
  ];
  
  // --- Scramble-text effect ---
  useEffect(() => {
    function scramble(element, originalText, chars = "!<>-_\\/[]{}—=+*^?#________") {
      let frame = 0;
      let scrambleInterval;
      const scrambleText = () => {
        const text = originalText;
        let output = '';
        for (let i = 0; i < text.length; i++) {
          if (frame < 10) {
            output += chars[Math.floor(Math.random() * chars.length)];
          } else {
            output += text[i];
          }
        }
        element.textContent = output;
        frame++;
        if (frame < 10) {
          scrambleInterval = setTimeout(scrambleText, 30);
        } else {
          element.textContent = text;
        }
      };
      scrambleText();
      return () => clearTimeout(scrambleInterval);
    }

    // Solo aplicar a elementos con scramble-text que NO tengan la clase no-scramble-text
    const nodes = document.querySelectorAll('.scramble-text:not(.no-scramble-text)');
    nodes.forEach(node => {
      const original = node.textContent;
      node.onmouseenter = () => scramble(node, original);
      node.onmouseleave = () => { node.textContent = original; };
    });
    return () => {
      nodes.forEach(node => {
        node.onmouseenter = null;
        node.onmouseleave = null;
      });
    };
  }, []);

  // Configuración de las ondas
  const width = 100;
  const freq = 20;
  const damp = 60;

  // Tamaños de los círculos (igual que en vanilla)
  const sizes = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20];

  // Función para generar puntos de onda
  const generateWavePoints = (amp = 0, currentDrift = 0) => {
    let points = [];
    let step = 0;
    
    for (let x = 0; x <= width; x++) {
      x < width / 2 ? step++ : step--;
      const y = (step / damp) * amp * Math.sin(((x + currentDrift) / damp) * freq);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Actualizar las líneas de onda
  const updateWaves = (newAmplitude, newDrift) => {
    const points = generateWavePoints(newAmplitude, newDrift);
    
    // Actualizar todas las líneas de onda
    const allPolylines = document.querySelectorAll('.wavelines polyline');
    allPolylines.forEach(line => {
      line.setAttribute('points', points);
      // Ajustar grosor de línea a 1
      line.style.strokeWidth = '1';
    });
  };

  // Manejar eventos de scroll y mouse
  useEffect(() => {
    let animationId;
    let currentDrift = 0;
    let currentAmplitude = 0;
    
    const handleScroll = (e) => {
      const velocity = e.deltaY || 0;
      currentDrift += velocity * 0.0002;
      currentAmplitude = Math.abs(velocity) * 0.0015;
      
      setDrift(currentDrift);
      setAmplitude(currentAmplitude);
      updateWaves(currentAmplitude, currentDrift);
      
      // Decaimiento gradual de la amplitud
      const decay = () => {
        currentAmplitude *= 0.95;
        if (currentAmplitude > 0.001) {
          updateWaves(currentAmplitude, currentDrift);
          animationId = requestAnimationFrame(decay);
        }
      };
      
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(decay);
    };

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      // Aumentar la intensidad del desplazamiento al pasar el mouse
      currentDrift += mouseX * 0.1 * 7.5;
      currentAmplitude = Math.abs(mouseY) * 2 * 7.5;
      
      updateWaves(currentAmplitude, currentDrift);
    };

    const container = svgRef.current?.closest('.cuerdas-container');
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: true });
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        container.removeEventListener('wheel', handleScroll);
        container.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
      };
    }
  }, []);

  return (
    <div className="habilidades-section" style={{ zIndex: 999, position: "relative" }}>
      <style>{`
        .scramble-text {
          display: inline-block;
          cursor: pointer;
          transition: color 0.2s;
        }
        .scramble-text:hover {
          color: #60a5fa;
        }
        .no-scramble-text {
          color: #333;
          font-size: 1rem;
          font-weight: 400;
          cursor: default;
        }
        .habilidades-section {
          padding: 4rem 0;
          background: transparent;
          color: #333333;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 2;
        }

        .habilidades-section h2 {
          font-size: 3rem;
          font-weight: 300;
          text-align: center;
          margin-bottom: 1rem;
          color: #333333;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          text-align: center;
          color: #666666;
          font-size: 1.1rem;
          margin-bottom: 3rem;
          font-style: italic;
        }

        .cuerdas-container {
          position: relative;
          margin: 1.5rem 0;
          padding: 1rem;
          background: transparent;
          border: none;
          border-radius: 12px;
          backdrop-filter: none;
          box-shadow: none;
        }

        .cuerdas-title {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #333333;
          border-radius: 20px;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .wavelines-container {
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background: transparent;
          backdrop-filter: blur(10px);
          position: relative;
        }

        .wavelines {
          width: 100%;
          height: auto;
          overflow: visible;
          filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
          background: transparent;
        }

        .wavelines polyline {
          fill: none;
          stroke: #60a5fa;
          stroke-linecap: round;
          stroke-width: 0.5;
          transform-box: fill-box;
          transform-origin: center;
          transition: stroke-width 0.3s ease;
          filter: drop-shadow(0 0 4px #60a5fa);
        }

        .wavelines:hover polyline {
          stroke-width: 1.5;
          filter: drop-shadow(0 0 8px #60a5fa);
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: start;
        }

        .habilidades-content {
          flex: 1;
        }

        .wavelines-side {
          width: 300px;
          position: sticky;
          top: 2rem;
        }

        .habilidades-lista {
          margin: 3rem 0;
          display: grid;
          gap: 1.5rem;
        }

        .habilidad-item {
          display: grid;
          grid-template-columns: 1fr auto 3fr auto;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .habilidad-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .habilidad-nombre {
          font-size: 1.2rem;
          color: #333333;
          font-weight: 500;
        }

        .dimension-label {
          font-size: 0.8rem;
          color: #666666;
          font-style: italic;
          padding: 0.2rem 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: 15px;
        }

        .barra-contenedor {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: 10px;
          height: 8px;
          position: relative;
          overflow: hidden;
        }

        .barra-progreso {
          background: linear-gradient(90deg, #60a5fa, #a855f7);
          height: 100%;
          border-radius: 10px;
          transition: width 0.8s ease;
          position: relative;
        }

        .barra-progreso::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }

        .nivel-texto {
          color: #333333;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .habilidad-waveline {
          width: 60px;
          height: 30px;
          background: transparent;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animacion-container {
          display: flex;
          justify-content: center;
          margin: 3rem 0;
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
          border: 1px solid rgba(0, 0, 0, 0.3);
          animation: quantumWave 2s ease-in-out infinite;
          transition: border-color 0.3s ease;
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

        @keyframes quantumWave {
          0%, 100% {
            transform: translateY(0px);
            border-color: rgba(0, 0, 0, 0.3);
            box-shadow: 0 0 0 rgba(96, 165, 250, 0);
          }
          50% {
            transform: translateY(-40px);
            border-color: rgba(96, 165, 250, 0.8);
            box-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
          }
        }

        .teoria-info {
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .teoria-info h3 {
          color: #60a5fa;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 300;
        }

        .teoria-info p {
          color: #666666;
          line-height: 1.6;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .wavelines-container {
            flex-direction: column;
            gap: 1rem;
          }
          
          .habilidad-item {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 0.5rem;
          }
          
          .habilidades-section h2 {
            font-size: 2rem;
          }
        }

        .orbita-container {
          position: relative;
          width: 40px;
          height: 40px;
          border: 1px dashed rgba(96, 165, 250, 0.5);
          border-radius: 50%;
          animation: orbitar 15s linear infinite;
        }

        .planeta {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #60a5fa;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform-origin: -20px center;
          animation: orbitar 10s linear infinite;
        }

        @keyframes orbitar {
          from {
            transform: rotate(0deg) translateX(20px);
          }
          to {
            transform: rotate(360deg) translateX(20px);
          }
        }
      `}</style>

      <div className="container">
        <h2><span className="scramble-text">Dimensiones Tecnológicas</span></h2>
        <p className="subtitle">
          <span className="scramble-text">
            "En el tejido del espacio-tiempo digital, cada habilidad vibra en su propia frecuencia cuántica"
          </span>
        </p>

        <div className="cuerdas-container">
          <div className="cuerdas-title"><span className="scramble-text">Vibraciones Cuánticas</span></div>
          
          <div className="wavelines-container">
            <svg ref={svgRef} className="wavelines" viewBox="0 0 100 50" style={{ background: 'transparent' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <polyline
                  key={i}
                  style={{
                    '--i': i,
                    '--height': 50,
                    '--count': 6,
                    transform: `translateY(${(50 * i / 6) - (50 / 6) * 0.5}px)`
                  }}
                  points="0,0 100,0"
                />
              ))}
            </svg>
          </div>

          <p style={{ textAlign: 'center', color: '#a0a0a0', fontSize: '0.9rem', marginTop: '1rem' }}>
            Mueve el mouse para perturbar las cuerdas 
          </p>
        </div>

        <div className="habilidades-lista">
          {habilidades.map((habilidad, index) => (
            <div key={index} className="habilidad-item">
              <span className="habilidad-nombre scramble-text">{habilidad.nombre}</span>
              <span className="dimension-label scramble-text">Dim. {habilidad.dimension}</span>
              <div className="orbita-container">
                <div className="planeta" style={{ animationDuration: `${100 - habilidad.nivel + 5}s` }}></div>
              </div>
              
              {/* Mini cuerdas al lado de cada habilidad */}
              <svg className="habilidad-waveline wavelines" viewBox="0 0 100 30" style={{ background: 'transparent' }}>
                {[1, 2, 3].map(i => (
                  <polyline
                    key={i}
                    style={{
                      transform: `translateY(${(30 * i / 3) - (30 / 3) * 0.5}px)`
                    }}
                    points="0,0 100,0"
                  />
                ))}
              </svg>
            </div>
          ))}
        </div>

        {/* Animación de círculos concéntricos cuánticos */}
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

        <div className="teoria-info">
          <h3>Soy Samuel Mejía</h3>
          <p className="no-scramble-text" style={{ whiteSpace: 'pre-line' }}>
            Soy Samuel Mejía
            {'\n'}Transformo ideas en interfaces vivas, donde cada clic cuenta una historia..
            {'\n'}No construyo páginas… construyo experiencias.
          </p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="/cv samuel mejia.pdf"
            download
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#60a5fa',
              color: '#ffffff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(96, 165, 250, 0.4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Descargar CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Habilidades;