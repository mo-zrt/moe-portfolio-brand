import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { StatItem } from '../types'

gsap.registerPlugin(ScrollTrigger)

const STATS: StatItem[] = [
  { number: '3+',   label: 'Instruments',              sub: 'Piano, electric guitar, and the ongoing pursuit',      countTo: 3,   suffix: '+' },
  { number: '∞',    label: 'Rolls on the mat',          sub: 'Brazilian Jiu-Jitsu — the art of controlled chaos' },
  { number: '01',   label: 'Personal brand in progress', sub: 'Authentic collabs only. No filter, no performance.',   countTo: 1,   prefix: '0' },
  { number: '100%', label: 'Authentic',                  sub: 'LGBTQ+ friendly. Come as you are.',                   countTo: 100, suffix: '%' },
]

export function Identity() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, x: -20, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 90%' },
      })
      gsap.from(gridRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 88%' },
      })

      // CountUp
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el || stat.countTo === undefined) return
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: stat.countTo!,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = (stat.prefix ?? '') + Math.round(obj.val) + (stat.suffix ?? '')
              },
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="identity" ref={sectionRef}>
      <p className="section-label" ref={labelRef}>01 — Identity</p>
      <div className="identity-grid" ref={gridRef}>
        {STATS.map((stat, i) => (
          <div className="identity-stat" key={stat.label}>
            <span
              className="stat-number"
              ref={el => { numRefs.current[i] = el }}
            >
              {stat.number}
            </span>
            <span className="stat-label">{stat.label}</span>
            <p className="stat-sub">{stat.sub}</p>
            <div className="stat-accent" />
          </div>
        ))}
      </div>
    </section>
  )
}
