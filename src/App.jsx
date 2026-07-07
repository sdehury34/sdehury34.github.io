import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Milestones from './components/Milestones.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero started={!loading} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Milestones />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
