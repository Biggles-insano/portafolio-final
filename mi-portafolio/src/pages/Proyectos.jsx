import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import Draggable from "gsap/Draggable"
import "./Proyectos.css"

gsap.registerPlugin(Draggable)

const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403",
  "https://i.scdn.co/image/ab67616d00001e021c0bcf8b536295438d26c70d",
  "https://i.scdn.co/image/ab67616d00001e029bbd79106e510d13a9a5ec33",
  "https://i.scdn.co/image/ab67616d00001e021d97ca7376f835055f828139",
  "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kanye-West-Yeezus.jpg",
]

export default function Proyectos() {
  const boxContainerRef = useRef(null)
  const dragProxyRef = useRef(null)
  const currentIndex = useRef(0)
  const startIndex = useRef(0)
  const startX = useRef(0)
  const scrollCooldown = useRef(false)
  const touchStartY = useRef(0)
  const BOXES = useRef([])

  useEffect(() => {
    BOXES.current = gsap.utils.toArray(".box")
  
    gsap.set(".box", {
      display: "block",
      yPercent: -50,
      xPercent: -50,
    })
  
    BOXES.current.forEach((box, index) => {
      gsap.set(box, {
        x: index * 300,
        rotateY: 0,
        opacity: 1,
        scale: 1,
        z: 0,
        zIndex: 1,
      })
    })
  
    const goToPosition = (targetIndex) => {
      const maxIndex = BOXES.current.length - 1
      currentIndex.current = Math.max(0, Math.min(maxIndex, targetIndex))
      const targetX = -currentIndex.current * 300
  
      BOXES.current.forEach((box, index) => {
        const distance = Math.abs(index - currentIndex.current)
        const isActive = index === currentIndex.current
  
        gsap.to(box, {
          x: targetX + index * 300,
          duration: 0.8,
          ease: "power2.inOut",
        })
  
        gsap.to(box, {
          scale: isActive ? 1.2 : Math.max(0.7, 1 - distance * 0.1),
          rotateY: isActive ? 0 : index < currentIndex.current ? -30 : 30,
          opacity: Math.max(0.3, 1 - distance * 0.2),
          z: isActive ? 50 : Math.max(-50, -distance * 20),
          zIndex: isActive ? BOXES.current.length : Math.max(1, BOXES.current.length - distance),
          duration: 0.8,
          ease: "power2.inOut",
        })
      })
    }
  
    const NEXT = () => {
      if (currentIndex.current < BOXES.current.length - 1) goToPosition(currentIndex.current + 1)
    }
  
    const PREV = () => {
      if (currentIndex.current > 0) goToPosition(currentIndex.current - 1)
    }
  
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") PREV()
      if (e.code === "ArrowRight" || e.code === "KeyD") NEXT()
    })
  
    boxContainerRef.current.addEventListener("click", (e) => {
      const box = e.target.closest(".box")
      if (box) {
        const targetIndex = BOXES.current.indexOf(box)
        goToPosition(targetIndex)
      }
    })
  
    // ✅ SCROLL limitado solo al carrusel
    boxContainerRef.current.addEventListener("wheel", (e) => {
      e.preventDefault()
      if (scrollCooldown.current) return
      scrollCooldown.current = true
  
      if (e.deltaY > 0) NEXT()
      else PREV()
  
      setTimeout(() => (scrollCooldown.current = false), 600)
    }, { passive: false })
  
    Draggable.create(dragProxyRef.current, {
      type: "x",
      trigger: boxContainerRef.current,
      onPress() {
        startIndex.current = currentIndex.current
        startX.current = this.x
      },
      onDrag() {
        const dragDistance = this.x - startX.current
        const sensitivity = 100
        const indexChange = Math.round(-dragDistance / sensitivity)
        const newIndex = Math.max(0, Math.min(BOXES.current.length - 1, startIndex.current + indexChange))
  
        if (newIndex !== currentIndex.current) {
          goToPosition(newIndex)
          startIndex.current = newIndex
          startX.current = this.x
        }
      },
    })
  
    document.addEventListener("touchstart", (e) => {
      touchStartY.current = e.touches[0].clientY
    })
  
    document.addEventListener("touchmove", (e) => {
      e.preventDefault()
    }, { passive: false })
  
    document.addEventListener("touchend", (e) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) > 30) deltaY > 0 ? NEXT() : PREV()
    })
  
    gsap.set("button", { z: 200 })
    goToPosition(0)
  }, [])

  return (
    <section className="boxes" ref={boxContainerRef}>
      {COVERS.map((src, i) => (
        <div className="box" key={i} style={{ "--src": `url(${src})` }}>
          <span>{i + 1}</span>
          <img src={src} alt={`cover-${i}`} />
        </div>
      ))}

      <svg className="scroll-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 6H23L19 2L15 6H18V18H15L19 22L23 18H20V6M9 3.09C11.83 3.57 14 6.04 14 9H9V3.09M14 11V15C14 18.3 11.3 21 8 21S2 18.3 2 15V11H14M7 9H2C2 6.04 4.17 3.57 7 3.09V9Z" />
      </svg>

      <div className="drag-proxy" ref={dragProxyRef}></div>
    </section>
  )
}