import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const nameRef    = useRef<HTMLHeadingElement>(null)
  const bgTextRef  = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const descRef    = useRef<HTMLParagraphElement>(null)
  const locRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Character split
      const el = nameRef.current
      if (el) {
        const text = el.textContent ?? ''
        el.innerHTML = ''
        const chars = [...text].map(ch => {
          const wrap = document.createElement('span')
          wrap.className = 'char-wrap'
          const span = document.createElement('span')
          span.className = 'char'
          span.textContent = ch === ' ' ? '\u00A0' : ch
          wrap.appendChild(span)
          el.appendChild(wrap)
          return span
        })
        gsap.from(chars, {
          yPercent: 115,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.045,
          delay: 0.15,
        })
      }

      // ── Supporting elements
      gsap.from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.8, delay: 0.9,  ease: 'power3.out' })
      gsap.from(descRef.current,    { opacity: 0, y: 20, duration: 0.8, delay: 1.05, ease: 'power3.out' })
      gsap.from(locRef.current,     { opacity: 0, y: 20, duration: 0.8, delay: 1.2,  ease: 'power3.out' })

      // ── Parallax on ghost Ø
      gsap.to(bgTextRef.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero">
      <div className="hero-bg-text" ref={bgTextRef}>Ø</div>

      <p className="hero-eyebrow" ref={eyebrowRef}>South Florida — Available Worldwide</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
        <span style={{
          fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--electric)', border: '0.5px solid var(--electric)', padding: '4px 12px',
        }}>
          aka Mo-Zrt
        </span>
        <span style={{
          fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)',
        }}>
          Brand mark: MØE
        </span>
      </div>

      <h1 className="hero-name" ref={nameRef}>RELENTLESS.</h1>

      <div className="hero-sub">
        <p className="hero-descriptor" ref={descRef}>
          Music. Combat sports. Code.<br />
          One name. Two faces. Zero apologies.
        </p>
        <div className="hero-location" ref={locRef}>
          <p>Est. 2024</p>
          <p style={{ marginTop: '4px', color: '#5a5a52' }}>South Florida, USA</p>
        </div>
      </div>
    </section>
  )
}
