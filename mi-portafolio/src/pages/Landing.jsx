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
    <section
      className="landing-page relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/your-background-image.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-white text-center landing-text">
          <h1 className="text-4xl md:text-5xl font-bold">Hola, soy Samuel Mejía</h1>
          <p className="text-xl mt-4">Desarrollador Web | Programador | Entusiasta de la Tecnología</p>
          <button className="mt-8 px-6 py-3 bg-blue-500 rounded-full text-white hover:bg-blue-600">
            Ver Proyectos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
