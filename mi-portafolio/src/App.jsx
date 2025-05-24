import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Landing from "./pages/Landing";
import Proyectos from "./pages/Proyectos";
import Habilidades from "./pages/Habilidades";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function App() {
  const boxRef = useRef(null);
  const initialMarkerRef = useRef(null);
  const secondMarkerRef = useRef(null);
  const thirdMarkerRef = useRef(null);

  useEffect(() => {
    let flipCtx;

    const createTimeline = () => {
      flipCtx && flipCtx.revert();

      flipCtx = gsap.context(() => {
        const secondState = Flip.getState(secondMarkerRef.current);
        const thirdState = Flip.getState(thirdMarkerRef.current);
        const flipConfig = {
          ease: "power1.inOut", // animación más suave
          duration: 1,
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            // markers: true,
          },
        });

        tl.add(Flip.fit(boxRef.current, secondState, flipConfig)).add(
          Flip.fit(boxRef.current, thirdState, flipConfig),
          "+=0.5"
        );
      });
    };

    createTimeline();

    window.addEventListener("resize", createTimeline);
    return () => {
      flipCtx && flipCtx.revert();
      window.removeEventListener("resize", createTimeline);
    };
  }, []);

  return (
    <>
      {/* Cubos para animación: posicionados fijos */}
      <div
        ref={boxRef}
        style={{
          position: "fixed",
          width: 100,
          height: 100,
          background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
          borderRadius: 10,
          top: 100,
          left: 100,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Marcadores visibles para Flip */}
      <div
        ref={initialMarkerRef}
        style={{
          position: "fixed",
          width: 120,
          height: 120,
          top: 100,
          left: 100,
          border: "2px dashed #999",
          borderRadius: 10,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div
        ref={secondMarkerRef}
        style={{
          position: "fixed",
          width: 120,
          height: 120,
          top: window.innerHeight / 2,
          left: 100,
          border: "2px dashed #999",
          borderRadius: 10,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div
        ref={thirdMarkerRef}
        style={{
          position: "fixed",
          width: 120,
          height: 120,
          bottom: 100,
          left: 100,
          border: "2px dashed #999",
          borderRadius: 10,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Secciones normales con contenido real */}
      <section style={{ minHeight: "100vh", padding: "4rem" }}>
        <Landing />
      </section>
      <section style={{ minHeight: "100vh", padding: "4rem", backgroundColor: "#f3f4f6" }}>
        <Proyectos />
      </section>
      <section style={{ minHeight: "100vh", padding: "4rem", backgroundColor: "#fff" }}>
        <Habilidades />
      </section>

      <div style={{ height: "20vh" }} />
    </>
  );
}
