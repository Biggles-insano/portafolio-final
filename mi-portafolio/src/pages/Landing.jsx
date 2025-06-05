import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import './landing.css'

gsap.registerPlugin(ScrambleTextPlugin)

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const Landing = () => {
  useEffect(() => {
    gsap.fromTo(
      ".landing-texto",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, delay: 0.5 }
    )

    const scrambleElements = [
      { selector: ".nombre", text: "Samuel Mejía" },
      { selector: ".rol", text: "Front-end Developer" },
      { selector: ".mensaje", text: "no se que poner aquí" }
    ]

    scrambleElements.forEach(({ selector, text }) => {
      const el = document.querySelector(selector)
      const applyScramble = () => {
        if (
          el &&
          !gsap.isTweening(el) &&
          window.matchMedia("(prefers-reduced-motion: no-preference)").matches
        ) {
          gsap.to(el, {
            duration: 0.8,
            ease: "sine.in",
            scrambleText: {
              text,
              speed: 2,
              chars: defaultChars
            }
          })
        }
      }

      el?.addEventListener("pointerenter", applyScramble)
      el?.addEventListener("focus", applyScramble)
    })

    const links = document.querySelectorAll(".landing-animated a")
    const scramble = (event) => {
      const target = event.target.firstElementChild
      if (!gsap.isTweening(target) && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        gsap.to(target, {
          duration: 0.8,
          ease: "sine.in",
          scrambleText: {
            text: target.innerText,
            speed: 2,
            chars: defaultChars
          }
        })
      }
    }

    links.forEach((link) => {
      link.addEventListener("pointerenter", scramble)
      link.addEventListener("focus", scramble)
    })

    return () => {
      scrambleElements.forEach(({ selector }) => {
        const el = document.querySelector(selector)
        el?.removeEventListener("pointerenter", scramble)
        el?.removeEventListener("focus", scramble)
      })

      links.forEach((link) => {
        link.removeEventListener("pointerenter", scramble)
        link.removeEventListener("focus", scramble)
      })
    }
  }, [])

  return (
    <section className="landing" id="landing">
      <div className="landing-texto">
        <h1 className="nombre">Samuel Mejía</h1>
        <p className="rol">Front-end Developer</p>
        <p className="mensaje">no se que poner aquí</p>
        <a href="#Proyectos">Ver Proyectos</a>
      </div>
      

      {/* Aquí puede ir tu botón u otro contenido adicional */}
    </section>
  )
}

export default Landing