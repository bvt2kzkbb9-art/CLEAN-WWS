import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { validateEnv } from './utils/env'
import './index.css'

// Validate environment variables before app starts
try {
  validateEnv()
} catch (error) {
  console.error('Configuration Error:', error)
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <div
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        color: '#d32f2f',
        backgroundColor: '#ffebee',
        minHeight: '100vh',
      }}
    >
      <h1>Configuration Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {String(error)}
      </pre>
    </div>
  )
  throw error
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
