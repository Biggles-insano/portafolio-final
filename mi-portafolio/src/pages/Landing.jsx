import React, { useEffect } from "react";
import gsap from "gsap";

const Landing = () => {
  useEffect(() => {
    gsap.fromTo(
      ".landing-text",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, delay: 0.5 }
    );
  }, []);

  return (
    <section>
  <div className="landing-texto">
    <h1>Samuel Mejía</h1>
    <p>Desarrollador Web y Explorador del Código</p>
    <p>Transformando ideas en interfaces, del espacio al navegador.</p>
    <a href="#proyectos">Ver Proyectos</a>
  </div>
</section>
  );
};

export default Landing;
