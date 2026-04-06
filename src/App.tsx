import { useLenis } from './hooks/useLenis'
import { Cursor }      from './components/Cursor'
import { Nav }         from './components/Nav'
import { Hero }        from './components/Hero'
import { Marquee }     from './components/Marquee'
import { Identity }    from './components/Identity'
import { Disciplines } from './components/Disciplines'
import { Statement, Brand, Contact, Footer } from './components/Sections'

export default function App() {
  const lenis = useLenis()

  return (
    <>
      {/* Motion layer */}
      <div id="page-overlay" />
      <Cursor />

      {/* Pride line */}
      <div className="pride-line" />

      {/* Layout */}
      <Nav lenis={lenis} />
      <Hero />
      <Marquee lenis={lenis} />
      <Identity />
      <Disciplines />
      <Statement />
      <Brand />
      <Contact />
      <Footer />
    </>
  )
}
