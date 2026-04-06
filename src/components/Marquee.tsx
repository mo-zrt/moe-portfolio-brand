import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

interface MarqueeProps {
  lenis: React.RefObject<Lenis | null>
}

const ITEMS = [
  { text: 'Musician',            accent: false },
  { text: '✦',                   accent: true  },
  { text: 'BJJ Competitor',      accent: false },
  { text: '✦',                   accent: true  },
  { text: 'MØE',                 accent: false, electric: true },
  { text: '✦',                   accent: true  },
  { text: 'Piano & Electric Guitar', accent: false },
  { text: '✦',                   accent: true  },
  { text: 'Mo-Zrt',              accent: false },
  { text: '✦',                   accent: true  },
  { text: 'Unapologetically Me', accent: false },
  { text: '✦',                   accent: true  },
  { text: 'Brand Builder',       accent: false },
  { text: '✦',                   accent: true  },
  { text: 'ML Engineer',         accent: false },
  { text: '✦',                   accent: true  },
]

// Doubled for seamless loop
const ALL_ITEMS = [...ITEMS, ...ITEMS]

export function Marquee({ lenis }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lenis.current) return
    let timer: ReturnType<typeof setTimeout>

    const onScroll = ({ velocity }: { velocity: number }) => {
      if (!trackRef.current) return
      const speed = Math.max(4, 22 - Math.abs(velocity) * 3.5)
      trackRef.current.style.animationDuration = `${speed}s`
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (trackRef.current) trackRef.current.style.animationDuration = '22s'
      }, 300)
    }

    lenis.current.on('scroll', onScroll)
    return () => {
      lenis.current?.off('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [lenis])

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track" ref={trackRef}>
        {ALL_ITEMS.map((item, i) => (
          <span
            key={i}
            className={`marquee-item${item.accent ? ' accent' : ''}`}
            style={item.electric ? { color: 'var(--electric)', letterSpacing: '0.28em' } : undefined}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
