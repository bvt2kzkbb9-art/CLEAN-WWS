import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Events } from './pages/Events'
import { Search } from './pages/Search'
import { Profile } from './pages/Profile'
import { Messages } from './pages/Messages'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

const router = createBrowserRouter([
  // Auth routes (public)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // Protected routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'search', element: <Search /> },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'messages', element: <Messages /> },
    ],
  },
])

export default router
