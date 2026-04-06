import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CollabRow } from '../types'

gsap.registerPlugin(ScrollTrigger)

// ── STATEMENT ─────────────────────────────────────────────
export function Statement() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLParagraphElement>(null)
  const footerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, y: 70, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 88%' },
      })
      gsap.from(footerRef.current, {
        opacity: 0, y: 30, duration: 0.9, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="statement" ref={sectionRef}>
      <p className="statement-text" ref={textRef}>
        I don't pick <em>one thing.</em><br />
        I pick the <span className="highlight">hardest version</span><br />
        of everything.
      </p>
      <div className="statement-footer" ref={footerRef}>
        <span className="statement-footer-text">On the mat, at the piano, behind the screen</span>
        <span className="statement-footer-text">MØE aka Mo-Zrt — 2025</span>
      </div>
    </section>
  )
}

// ── BRAND ─────────────────────────────────────────────────
const COLLABS: CollabRow[] = [
  { type: 'Fitness & Combat Sports', tag: 'BJJ Gear / Supplements / Apparel'     },
  { type: 'Music & Instruments',     tag: 'Guitar / Piano / Recording Gear'       },
  { type: 'Tech & Lifestyle',        tag: 'Apps / Gadgets / Wearables'            },
  { type: 'LGBTQ+ Brands',           tag: 'Pride-Aligned / Inclusive / Bold'      },
  { type: 'Personal Development',    tag: 'Courses / Coaching / Mindset'          },
]

export function Brand() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const listRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.utils.toArray<HTMLElement>('.collab-row').forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, x: -30, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
        })
        // Underline on hover
        const line = document.createElement('div')
        line.style.cssText =
          'position:absolute;bottom:0;left:0;height:0.5px;width:0;background:var(--electric);transition:width 0.4s cubic-bezier(0.16,1,0.3,1);'
        row.appendChild(line)
        row.addEventListener('mouseenter', () => (line.style.width = '100%'))
        row.addEventListener('mouseleave', () => (line.style.width = '0'))
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="brand" ref={sectionRef}>
      <div className="brand-header" ref={headerRef}>
        <h2 className="brand-big-text">
          OPEN<br />FOR<br />COLLABS
        </h2>
        <p className="brand-desc">
          I partner with brands that match the energy — authentic, inclusive, performance-driven.
          Whether you're in fitness, music, tech, or lifestyle, let's build something that resonates
          with people who actually give a damn.
        </p>
      </div>
      <div className="collab-list" ref={listRef}>
        {COLLABS.map(row => (
          <div className="collab-row" key={row.type}>
            <span className="collab-type">{row.type}</span>
            <div className="collab-meta">
              <span className="collab-tag">{row.tag}</span>
              <span className="collab-arrow">↗</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── CONTACT ───────────────────────────────────────────────
const SOCIALS = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube']

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const emailRef   = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word split headline
      const el = headRef.current
      if (el) {
        const raw = el.innerHTML.split(/<br\s*\/?>/i)
        el.innerHTML = raw
          .map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`)
          .join('<br />')
        gsap.from(el.querySelectorAll('.word'), {
          yPercent: 105, duration: 0.9, ease: 'power4.out', stagger: 0.1,
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        })
      }
      gsap.from(subRef.current,   { opacity: 0, y: 24, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '#contact', start: 'top 80%' } })
      gsap.from(emailRef.current, { opacity: 0, y: 20, duration: 0.7, delay: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '#contact', start: 'top 80%' } })
    }, sectionRef)

    // Magnetic email
    const email = emailRef.current
    if (email) {
      const onMove = (e: MouseEvent) => {
        const r = email.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.28
        const y = (e.clientY - r.top  - r.height / 2) * 0.28
        gsap.to(email, { x, y, duration: 0.4, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(email, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      email.addEventListener('mousemove', onMove)
      email.addEventListener('mouseleave', onLeave)
      return () => {
        ctx.revert()
        email.removeEventListener('mousemove', onMove)
        email.removeEventListener('mouseleave', onLeave)
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-bg">MØE</div>
      <div className="contact-inner">
        <h2 className="contact-headline" ref={headRef}>LET'S<br />BUILD.</h2>
        <p className="contact-sub" ref={subRef}>
          You found Mo-Zrt. Brand deals, collabs, music sessions, or just a conversation worth having.
          MØE responds to everything that's real.
        </p>
        <a href="mailto:hello@moe.co" className="contact-email" ref={emailRef}>
          hello@moe.co →
        </a>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
          {SOCIALS.map(s => (
            <a key={s} href="#" className="social-link">{s}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────
const PRIDE_COLORS = ['#FF3B3B', '#FF8C00', '#FFE44D', '#4CAF50', '#2979FF', '#AA00FF']

export function Footer() {
  return (
    <footer>
      <span className="footer-copy">© 2025 MØE — Mo-Zrt. All rights reserved</span>
      <div className="footer-pride">
        {PRIDE_COLORS.map(color => (
          <div key={color} className="pride-dot" style={{ background: color }} />
        ))}
      </div>
    </footer>
  )
}
