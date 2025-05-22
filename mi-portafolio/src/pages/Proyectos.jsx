import React from "react";

const Proyectos = () => {
  const proyectos = [
    {
      titulo: "Proyecto 1",
      descripcion: "Descripción breve del proyecto.",
      tecnologias: ["React", "Node.js", "MongoDB"],
      enlace: "https://github.com/usuario/proyecto1",
    },
    {
      titulo: "Proyecto 2",
      descripcion: "Descripción breve del proyecto.",
      tecnologias: ["Vue.js", "Laravel", "MySQL"],
      enlace: "https://github.com/usuario/proyecto2",
    },
    // Agrega más proyectos aquí
  ];

  return (
    <section className="proyectos-section py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Mis Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">{proyecto.titulo}</h3>
              <p className="mt-4">{proyecto.descripcion}</p>
              <p className="mt-2 text-gray-500">Tecnologías: {proyecto.tecnologias.join(", ")}</p>
              <a
                href={proyecto.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                Ver Repositorio
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
