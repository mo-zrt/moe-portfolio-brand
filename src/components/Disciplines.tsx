import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { DisciplineCard } from '../types'

gsap.registerPlugin(ScrollTrigger)

const CARDS: DisciplineCard[] = [
  {
    index: '01 / 03',
    icon: '🎸',
    title: 'MUSIC',
    body: 'Piano since childhood. Electric guitar as rebellion. Two instruments, one language — emotion translated into sound. Currently building a practice that\'s equal parts discipline and freedom.',
    tags: ['Piano', 'Electric guitar', 'Composition', 'Practice'],
    cta: 'Jam session',
    ctaHref: '#contact',
    cardClass: 'card-music',
  },
  {
    index: '02 / 03',
    icon: '🥋',
    title: 'COMPETE',
    body: 'BJJ, strength training, etc. Competition is the testing ground — it exposes everything you haven\'t fixed yet and forces you to come back sharper.',
    tags: ['Competition', 'Grappling', 'Strength Training', 'Mental fortitude'],
    cta: 'Train together',
    ctaHref: '#contact',
    cardClass: 'card-bjj',
  },
  {
    index: '03 / 03',
    icon: '⚡',
    title: 'BRAND',
    body: 'Building in public. The intersection of tech, sport, and music creates a niche worth owning. Seeking partnerships that are bold, inclusive, and built for people who don\'t fit a single box.',
    tags: ['Partnerships', 'Content', 'Lifestyle', 'LGBTQ+ Friendly'],
    cta: "Let's collab",
    ctaHref: '#contact',
    cardClass: 'card-brand',
  },
]

function Card({ card }: { card: DisciplineCard }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    gsap.to(el, { rotateY: x * 8, rotateX: -y * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }

  const onMouseLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div
      ref={ref}
      className={`discipline-card ${card.cardClass}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <p className="card-index">{card.index}</p>
        <span className="card-icon">{card.icon}</span>
        <h2 className="card-title">{card.title}</h2>
        <p className="card-body">{card.body}</p>
        <div className="card-tags">
          {card.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </div>
      <a className="card-cta" href={card.ctaHref}>{card.cta}</a>
    </div>
  )
}

export function Disciplines() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, x: -20, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 90%' },
      })
      gsap.utils.toArray<HTMLElement>('.discipline-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 80, duration: 1, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="disciplines" ref={sectionRef}>
      <p className="section-label" ref={labelRef}>02 — Disciplines</p>
      <div className="disciplines-grid" ref={gridRef}>
        {CARDS.map(card => <Card key={card.title} card={card} />)}
      </div>
    </section>
  )
}
