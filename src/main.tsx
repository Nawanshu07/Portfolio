import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { findPage, pageTitle } from './pages'
import './index.css'

document.title = pageTitle(findPage(location.pathname)?.label ?? 'Page not found')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
