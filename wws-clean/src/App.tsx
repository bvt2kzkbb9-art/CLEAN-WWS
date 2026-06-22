import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { BottomNav } from './components/BottomNav'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default App
