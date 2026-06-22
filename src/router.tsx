import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { LoadingSpinner } from '@/components/LoadingSpinner'

// Code-split page components for better performance
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const Events = lazy(() => import('@/pages/Events').then(m => ({ default: m.Events })))
const Search = lazy(() => import('@/pages/Search').then(m => ({ default: m.Search })))
const Profile = lazy(() => import('@/pages/Profile').then(m => ({ default: m.Profile })))
const Messages = lazy(() => import('@/pages/Messages').then(m => ({ default: m.Messages })))
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })))
const Register = lazy(() => import('@/pages/Register').then(m => ({ default: m.Register })))

const SuspenseWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner message="Loading..." fullScreen />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  // Auth routes (public)
  {
    path: '/login',
    element: SuspenseWrapper(Login),
  },
  {
    path: '/register',
    element: SuspenseWrapper(Register),
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
      { index: true, element: SuspenseWrapper(Home) },
      { path: 'events', element: SuspenseWrapper(Events) },
      { path: 'search', element: SuspenseWrapper(Search) },
      { path: 'profile/:id', element: SuspenseWrapper(Profile) },
      { path: 'messages', element: SuspenseWrapper(Messages) },
    ],
  },
])

export default router
