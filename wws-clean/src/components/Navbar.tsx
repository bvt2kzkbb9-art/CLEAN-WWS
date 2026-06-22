import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAuthForm } from '../hooks/useAuthForm'
import './Navbar.css'

export function Navbar() {
  const navigate = useNavigate()
  const { userProfile } = useAuth()
  const { logout, isLoading } = useAuthForm()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">⚽</span>
          <span className="logo-text">Weekend Warrior</span>
        </div>
        <div className="navbar-actions">
          <button className="navbar-btn icon-btn">🔔</button>
          <div className="navbar-menu-wrapper">
            <button
              className="navbar-btn icon-btn"
              onClick={() => setShowMenu(!showMenu)}
              title={userProfile?.displayName}
            >
              👤
            </button>
            {showMenu && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <p className="navbar-username">{userProfile?.displayName}</p>
                  <p className="navbar-useremail">{userProfile?.email}</p>
                </div>
                <button
                  className="navbar-dropdown-item"
                  onClick={() => {
                    navigate(`/profile/${userProfile?.uid}`)
                    setShowMenu(false)
                  }}
                >
                  👤 Profile
                </button>
                <hr className="navbar-dropdown-divider" />
                <button
                  className="navbar-dropdown-item navbar-dropdown-logout"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  🚪 {isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
