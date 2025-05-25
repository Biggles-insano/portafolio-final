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
          ease: "power1.inOut",
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
      {/* Cuadro animado azul */}
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

      {/* Cubos marcadores de destino */}
      <div
        ref={initialMarkerRef}
        style={{
          position: "fixed",
          width: 120,
          height: 120,
          top: 100,
          left: 100,
          border: "none",
          borderRadius: 10,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0,
        }}
      />
      <div
        ref={secondMarkerRef}
        style={{
          position: "fixed",
          width: 120,
          height: 120,
          top: "50%",
          left: 100,
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: 10,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0,
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
          border: "none",
          borderRadius: 10,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0,
        }}
      />

      {/* Secciones normales */}
      <section style={{ minHeight: "100vh", padding: "6rem 2rem", backgroundColor: "#fff" }}>
        <Landing />
      </section>

      <section style={{ minHeight: "100vh", padding: "6rem 2rem", backgroundColor: "#f3f4f6" }}>
        <Proyectos />
      </section>

      <section style={{ minHeight: "100vh", padding: "6rem 2rem", backgroundColor: "#ffffff" }}>
        <Habilidades />
      </section>

      <div style={{ height: "20vh" }} />
    </>
  );
}