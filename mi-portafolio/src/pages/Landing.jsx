import React, { useEffect, useRef, useState } from 'react'

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const Landing = () => {
  // Black hole WebGL refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const programRef = useRef(null);
  const glRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Estado para controlar la visibilidad del canvas
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Intersection Observer para detectar cuándo la sección está visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Se activa cuando al menos 10% de la sección es visible
        rootMargin: '-50px' // Margen para activar un poco antes/después
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // GSAP animations (simplified without external dependencies)
    const landingTexto = document.querySelector(".landing-texto")
    if (landingTexto) {
      landingTexto.style.opacity = "0"
      landingTexto.style.transform = "translateY(-50px)"
      landingTexto.style.transition = "opacity 2s ease 0.5s, transform 2s ease 0.5s"
      
      setTimeout(() => {
        landingTexto.style.opacity = "1"
        landingTexto.style.transform = "translateY(0)"
      }, 100)
    }

    // Scramble text effect (simplified)
    const scrambleElements = [
      { selector: ".nombre", text: "Samuel Mejía" },
      { selector: ".rol", text: "Front-end Developer" },
      { selector: ".mensaje", text: "no se que poner aquí" }
    ]

    const scrambleText = (element, targetText) => {
      const chars = defaultChars
      const originalText = targetText
      let iteration = 0
      
      const interval = setInterval(() => {
        element.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
        
        if (iteration >= originalText.length) {
          clearInterval(interval)
        }
        
        iteration += 1 / 3
      }, 30)
    }

    scrambleElements.forEach(({ selector, text }) => {
      const el = document.querySelector(selector)
      const applyScramble = () => {
        if (el && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
          scrambleText(el, text)
        }
      }

      el?.addEventListener("pointerenter", applyScramble)
      el?.addEventListener("focus", applyScramble)
    })

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Black Hole WebGL Setup - solo cuando es visible
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }
    glRef.current = gl;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader
    const fsSource = `
      precision mediump float;
      uniform float t;
      uniform vec2 r;
      
      vec2 myTanh(vec2 x) {
        vec2 ex = exp(x);
        vec2 emx = exp(-x);
        return (ex - emx) / (ex + emx);
      }
      
      void main() {
        vec4 o_bg = vec4(0.0);
        vec4 o_anim = vec4(0.0);

        {
          vec2 p_img = (gl_FragCoord.xy * 2.0 - r) / r.y * mat2(1.0, -1.0, 1.0, 1.0);
          vec2 l_val = myTanh(p_img * 5.0 + 2.0);
          l_val = min(l_val, l_val * 3.0);
          vec2 clamped = clamp(l_val, -2.0, 0.0);
          float diff_y = clamped.y - l_val.y;
          float safe_px = abs(p_img.x) < 0.001 ? 0.001 : p_img.x;
          float term = (0.1 - max(0.01 - dot(p_img, p_img) / 200.0, 0.0) * (diff_y / safe_px))
                       / abs(length(p_img) - 0.7);
          o_bg += vec4(term);
          o_bg *= max(o_bg, vec4(0.0));
        }

        {
          vec2 p_anim = (gl_FragCoord.xy * 2.0 - r) / r.y / 0.7;
          vec2 d = vec2(-1.0, 1.0);
          float denom = 0.1 + 5.0 / dot(5.0 * p_anim - d, 5.0 * p_anim - d);
          vec2 c = p_anim * mat2(1.0, 1.0, d.x / denom, d.y / denom);
          vec2 v = c;
          v *= mat2(cos(log(length(v)) + t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0))) * 5.0;
          vec4 animAccum = vec4(0.0);
          for (int i = 1; i <= 9; i++) {
            float fi = float(i);
            animAccum += sin(vec4(v.x, v.y, v.y, v.x)) + vec4(1.0);
            v += 0.7 * sin(vec2(v.y, v.x) * fi + t) / fi + 0.5;
          }
          vec4 animTerm = 1.0 - exp(-exp(c.x * vec4(0.6, -0.4, -1.0, 0.0))
                            / animAccum
                            / (0.1 + 0.1 * pow(length(sin(v / 0.3) * 0.2 + c * vec2(1.0, 2.0)) - 1.0, 2.0))
                            / (1.0 + 7.0 * exp(0.3 * c.y - dot(c, c)))
                            / (0.03 + abs(length(p_anim) - 0.7)) * 0.2);
          o_anim += animTerm;
        }

        vec4 finalColor = mix(o_bg, o_anim, 0.5) * 1.5;
        finalColor = clamp(finalColor, 0.0, 1.0);
        gl_FragColor = finalColor;
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile failed with: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl, vsSource, fsSource) {
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program failed to link: ' + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const program = createProgram(gl, vsSource, fsSource);
    if (!program) return;
    
    programRef.current = program;
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 't');
    const resolutionLocation = gl.getUniformLocation(program, 'r');

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    
    window.addEventListener('resize', resize);
    resize();

    let startTime = performance.now();
    
    function render() {
      if (!gl || !program || !isVisible) return;
      
      let currentTime = performance.now();
      let delta = (currentTime - startTime) / 1000;
      
      gl.useProgram(program);
      gl.uniform1f(timeLocation, delta);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    }
    
    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, [isVisible]) // Dependencia del estado de visibilidad

  return (
    <>
      <section className="landing" id="landing" ref={sectionRef}>
        {/* Black Hole Background Canvas - solo visible cuando la sección es visible */}
        <canvas 
          ref={canvasRef}
          className="webgl-canvas"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            background: '#000',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
        
        <div className="landing-texto">
          <h1 className="nombre">Samuel Mejía</h1>
          <p className="rol">Front-end Developer</p>
          <p className="mensaje">no se que poner aquí</p>
          <a href="#Proyectos">Ver Proyectos</a>
        </div>

        <style jsx>{`
          .landing {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            color: white;
            overflow: hidden;
          }

          .landing-texto {
            text-align: center;
            z-index: 10;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          }

          .nombre {
            font-size: 3.5rem;
            font-weight: 700;
            margin: 0 0 1rem 0;
            background: linear-gradient(45deg, #fff, #ccc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .nombre:hover {
            transform: scale(1.05);
            text-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
          }

          .rol {
            font-size: 1.5rem;
            font-weight: 300;
            margin: 0 0 1.5rem 0;
            opacity: 0.9;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .rol:hover {
            opacity: 1;
            transform: translateY(-2px);
          }

          .mensaje {
            font-size: 1.1rem;
            font-weight: 200;
            margin: 0 0 2rem 0;
            opacity: 0.8;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .mensaje:hover {
            opacity: 1;
            transform: translateY(-2px);
          }

          .landing-texto a {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            color: white;
            text-decoration: none;
            font-weight: 500;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
          }

          .landing-texto a:hover {
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
            border-color: rgba(255, 255, 255, 0.4);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }

          .webgl-canvas {
            display: block;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .nombre {
              font-size: 2.5rem;
            }
            
            .rol {
              font-size: 1.2rem;
            }
            
            .mensaje {
              font-size: 1rem;
            }
            
            .landing-texto {
              padding: 1.5rem;
              margin: 1rem;
            }
          }

          @media (max-width: 480px) {
            .nombre {
              font-size: 2rem;
            }
            
            .rol {
              font-size: 1rem;
            }
            
            .mensaje {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </section>

    </>
  )
}

export default Landing