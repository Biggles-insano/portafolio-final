import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([
    {
      id: 1,
      titulo: "Proyecto 1",
      descripcion: "Descripción breve del proyecto.",
      tecnologias: ["React", "Node.js", "MongoDB"],
      enlace: "https://github.com/usuario/proyecto1",
      imagen: "https://assets.codepen.io/16327/ui-flair-1.png",
      dataGrid: "img-1",
    },
    {
      id: 2,
      titulo: "Proyecto 2",
      descripcion: "Descripción breve del proyecto.",
      tecnologias: ["Vue.js", "Laravel", "MySQL"],
      enlace: "https://github.com/usuario/proyecto2",
      imagen: "https://assets.codepen.io/16327/ui-flair-2.png",
      dataGrid: "img-2",
    },
    {
      id: 3,
      titulo: "Proyecto 3",
      descripcion: "Otro proyecto interesante.",
      tecnologias: ["JavaScript", "CSS"],
      enlace: "https://github.com/usuario/proyecto3",
      imagen: "https://assets.codepen.io/16327/ui-flair-3.png",
      dataGrid: "img-3",
    },
    {
      id: 4,
      titulo: "Proyecto 4",
      descripcion: "Más cosas geniales.",
      tecnologias: ["HTML", "CSS"],
      enlace: "https://github.com/usuario/proyecto4",
      imagen: "https://assets.codepen.io/16327/ui-flair-4.png",
      dataGrid: "img-4",
    },
  ]);

  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const products = document.querySelectorAll(".product");

    products.forEach((el) => {
      el.addEventListener("click", () => changeGrid(el));
    });

    function changeGrid(el) {
      const clickedId = parseInt(el.getAttribute("data-id"));
      if (clickedId === activeId) return;

      const state = Flip.getState(products);

      setProyectos((prev) =>
        prev.map((p) => {
          if (p.id === clickedId) return { ...p, dataGrid: "img-1" };
          if (p.id === activeId) return { ...p, dataGrid: el.getAttribute("data-grid") };
          return p;
        })
      );

      setActiveId(clickedId);

      Flip.from(state, {
        duration: 0.3,
        absolute: true,
        ease: "power1.inOut",
      });
    }

    return () => {
      products.forEach((el) => {
        el.removeEventListener("click", () => changeGrid(el));
      });
    };
  }, [activeId]);

  return (
    <section id="Proyectos" className="proyectos-section py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Mis Proyectos</h2>
        <div className="image-container relative max-w-md mx-auto">
          <div className="images grid gap-2"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              gridTemplateAreas: `
                "img-1 img-1 img-1"
                "img-1 img-1 img-1"
                "img-1 img-1 img-1"
                "img-2 img-3 img-4"
              `,
            }}
          >
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="product bg-gray-200 p-4 rounded shadow cursor-pointer"
                data-grid={proyecto.dataGrid}
                data-id={proyecto.id}
                style={{
                  gridArea: proyecto.dataGrid,
                  backgroundImage: `url(${proyecto.imagen})`,
                  backgroundSize: "75%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <h3 className="font-semibold text-lg">{proyecto.titulo}</h3>
                <p className="text-sm mt-2">{proyecto.descripcion}</p>
                <p className="text-xs mt-1">Tecnologías: {proyecto.tecnologias.join(", ")}</p>
                <a href={proyecto.enlace} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs mt-2 inline-block">
                  Ver Repositorio
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proyectos;

