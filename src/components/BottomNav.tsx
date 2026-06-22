import { useLocation, useNavigate } from 'react-router-dom'
import './BottomNav.css'

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </button>
      <button
        className={`nav-item ${isActive('/events') ? 'active' : ''}`}
        onClick={() => navigate('/events')}
      >
        <span className="nav-icon">📅</span>
        <span className="nav-label">Events</span>
      </button>
      <button
        className={`nav-item ${isActive('/search') ? 'active' : ''}`}
        onClick={() => navigate('/search')}
      >
        <span className="nav-icon">🔍</span>
        <span className="nav-label">Search</span>
      </button>
      <button
        className={`nav-item ${isActive('/messages') ? 'active' : ''}`}
        onClick={() => navigate('/messages')}
      >
        <span className="nav-icon">💬</span>
        <span className="nav-label">Chat</span>
      </button>
      <button
        className={`nav-item ${isActive('/profile/me') ? 'active' : ''}`}
        onClick={() => navigate('/profile/me')}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-label">Profile</span>
      </button>
    </nav>
  )
}
