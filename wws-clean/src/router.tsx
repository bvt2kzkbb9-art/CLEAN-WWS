import { createBrowserRouter } from 'react-router-dom'

// Pages will be implemented in ETAP 4
// Placeholder pages for routing structure

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page</div>,
  },
  {
    path: '/profile/:id',
    element: <div>Profile Page</div>,
  },
  {
    path: '/events',
    element: <div>Events Page</div>,
  },
  {
    path: '/search',
    element: <div>Search Page</div>,
  },
  {
    path: '/messages',
    element: <div>Messages Page</div>,
  },
])

export default router
