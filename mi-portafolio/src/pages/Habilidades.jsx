import React from "react";

const Habilidades = () => {
  const habilidades = [
    { nombre: "HTML", nivel: 90 },
    { nombre: "CSS", nivel: 85 },
    { nombre: "JavaScript", nivel: 80 },
    { nombre: "React", nivel: 75 },
    { nombre: "Node.js", nivel: 70 },
    // Agrega más habilidades aquí
  ];

  return (
    <section className="habilidades-section py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Habilidades</h2>
        <div className="space-y-6">
          {habilidades.map((habilidad, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-lg">{habilidad.nombre}</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${habilidad.nivel}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Habilidades;
