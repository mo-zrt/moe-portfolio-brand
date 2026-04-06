import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    const ticker = gsap.ticker.add(() => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      gsap.set(dot,  { x: mx, y: my })
      gsap.set(ring, { x: rx, y: ry })
    })

    const hoverEls = document.querySelectorAll(
      'a, button, .discipline-card, .collab-row, .identity-stat'
    )
    const addHover   = () => ring.classList.add('hover')
    const removeHover = () => ring.classList.remove('hover')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(ticker)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  id="cursor-dot"  />
      <div className="cursor-ring" ref={ringRef} id="cursor-ring" />
    </>
  )
}
