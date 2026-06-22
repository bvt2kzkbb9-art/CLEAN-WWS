import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">⚽</span>
          <span className="logo-text">Weekend Warrior</span>
        </div>
        <div className="navbar-actions">
          <button className="navbar-btn icon-btn">🔔</button>
          <button className="navbar-btn icon-btn">⚙️</button>
        </div>
      </div>
    </nav>
  )
}
