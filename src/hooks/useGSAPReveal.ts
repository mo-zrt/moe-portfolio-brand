import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  y?: number
  x?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
}

export function useGSAPReveal(
  ref: RefObject<Element | null>,
  options: RevealOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: options.y ?? 50,
        x: options.x ?? 0,
        duration: options.duration ?? 0.9,
        delay: options.delay ?? 0,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [ref, options.delay, options.duration, options.ease, options.start, options.x, options.y])
}
