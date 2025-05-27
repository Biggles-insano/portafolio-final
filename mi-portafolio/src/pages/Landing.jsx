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
    <p>Front-end Developer</p>
    <p>no se que poner aquí</p>
    <a href="#Proyectos">Ver Proyectos</a>
  </div>
</section>
  );
};

export default Landing;
