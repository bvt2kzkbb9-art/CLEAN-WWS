import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Home } from './pages/Home'
import { Events } from './pages/Events'
import { Search } from './pages/Search'
import { Profile } from './pages/Profile'
import { Messages } from './pages/Messages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
