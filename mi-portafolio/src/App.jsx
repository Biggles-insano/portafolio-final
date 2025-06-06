import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Landing from "./pages/Landing";
import Habilidades from "./pages/Habilidades";
import Proyectos from "./pages/Proyectos";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function App() {
  const boxRef = useRef(null);
  const initialMarkerRef = useRef(null);
  const secondMarkerRef = useRef(null);
  const thirdMarkerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      
      // Event listeners para el audio
      const audio = audioRef.current;
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      
      // Reproducir automáticamente
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('No se pudo reproducir automáticamente, se requiere interacción del usuario:', error);
        }
      };
      
      playAudio();
      
      // Cleanup
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error al reproducir audio:', error);
        });
      }
    }
  };

  useEffect(() => {
    let flipCtx;

    const createTimeline = () => {
      flipCtx && flipCtx.revert();

      flipCtx = gsap.context(() => {
        const initialState = Flip.getState(initialMarkerRef.current);
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
          },
        });

        tl.add(Flip.fit(boxRef.current, initialState, { duration: 0 }))
          .add(Flip.fit(boxRef.current, secondState, flipConfig))
          .add(Flip.fit(boxRef.current, thirdState, flipConfig), "+=0.5");
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
      {/* Elemento de audio */}
      <audio
        ref={audioRef}
        src="/audio.mp3"
        preload="auto"
        loop
      />

      {/* Botón de control de audio estilo planeta */}
      <button
        onClick={toggleAudio}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          width: 35,
          height: 35,
          borderRadius: "50%",
          border: "none",
          background: isPlaying 
            ? "radial-gradient(circle at 30% 30%, #4a90e2, #2c5f8a, #1a3b5c)" 
            : "radial-gradient(circle at 30% 30%, #8b7355, #5d4e37, #3d3020)",
          cursor: "pointer",
          zIndex: 10000,
          transition: "all 0.4s ease",
          boxShadow: isPlaying 
            ? "0 0 20px rgba(74, 144, 226, 0.6), inset -5px -5px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)" 
            : "0 0 15px rgba(139, 115, 85, 0.4), inset -5px -5px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.15)";
          e.target.style.boxShadow = isPlaying 
            ? "0 0 25px rgba(74, 144, 226, 0.8), inset -5px -5px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)" 
            : "0 0 20px rgba(139, 115, 85, 0.6), inset -5px -5px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = isPlaying 
            ? "0 0 20px rgba(74, 144, 226, 0.6), inset -5px -5px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)" 
            : "0 0 15px rgba(139, 115, 85, 0.4), inset -5px -5px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)";
        }}
      >
        {/* Pequeños cráteres/manchas del planeta */}
        <div style={{
          position: "absolute",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.2)",
          top: "8px",
          left: "12px",
        }} />
        <div style={{
          position: "absolute",
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.15)",
          top: "20px",
          left: "8px",
        }} />
        <div style={{
          position: "absolute",
          width: "2px",
          height: "2px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.1)",
          top: "15px",
          left: "22px",
        }} />
      </button>
      
      <img
        ref={boxRef}
        src="/yct20hubfk061.png"
        alt="Elemento animado"
        style={{
          position: "fixed",
          width: 100,
          height: 100,
          top: 100,
          left: 40,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

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

      <div
        style={{
          minHeight: "100vh",
          scrollBehavior: "smooth",
          backgroundColor: "transparent",
          backgroundImage: "none",
        }}
      >
        <section
          style={{
            minHeight: "100vh",
            padding: "6rem 2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Landing />
        </section>

        <section
          style={{
            minHeight: "100vh",
            padding: "6rem 2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Proyectos />
        </section>

        <section
          style={{
            minHeight: "100vh",
            padding: "6rem 2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Habilidades />
        </section>

        <div style={{ height: "20vh" }} />
      </div>
    </>
  );
}