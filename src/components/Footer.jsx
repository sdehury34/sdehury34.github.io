import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer>
      <div className="container inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed &amp; built with React + Framer Motion</span>
      </div>
    </footer>
  )
}
