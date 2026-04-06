import { useRef } from 'react'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'

interface NavProps {
  lenis: React.RefObject<Lenis | null>
}

export function Nav({ lenis }: NavProps) {
  const overlayRef = useRef<HTMLDivElement>(
    document.getElementById('page-overlay') as HTMLDivElement
  )

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target || !lenis.current) return

    gsap.timeline()
      .to(overlayRef.current, {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.5,
        ease: 'power3.inOut',
      })
      .call(() => lenis.current?.scrollTo(target as HTMLElement, { immediate: true }))
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.6,
        ease: 'power3.inOut',
        delay: 0.1,
      })
  }

  return (
    <nav>
      <a href="#" className="nav-logo">
        M<span className="slash">Ø</span>E
      </a>
      <ul className="nav-links">
        <li><a href="#disciplines" onClick={e => handleNav(e, '#disciplines')}>Work</a></li>
        <li><a href="#brand"       onClick={e => handleNav(e, '#brand')}>Collabs</a></li>
        <li><a href="#contact"     onClick={e => handleNav(e, '#contact')}>Contact</a></li>
      </ul>
    </nav>
  )
}
