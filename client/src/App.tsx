import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'

// Pages
const Programs = lazy(() => import('./pages/Programs'))
const Live = lazy(() => import('./pages/Live'))
const Join = lazy(() => import('./pages/Join'))
const EB1AQualifier = lazy(() => import('./pages/tools/EB1AQualifier'))

// Legacy redirects — keep old URLs working
const LegacyRedirect = lazy(() => import('./pages/LegacyRedirect'))

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="font-mono" style={{ color: 'var(--accent-primary)' }}>
              <div className="animate-pulse">Loading...</div>
            </div>
          </div>
        }>
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="programs" element={<Programs />} />
            <Route path="live" element={<Live />} />
            <Route path="join" element={<Join />} />
            <Route path="tools/eb1a-qualifier" element={<EB1AQualifier />} />

            {/* Legacy URL redirects */}
            <Route path="offerings" element={<LegacyRedirect to="/programs" />} />
            <Route path="coaching" element={<LegacyRedirect to="/programs" />} />
            <Route path="launch-club" element={<LegacyRedirect to="/programs" />} />
            <Route path="newsletter" element={<LegacyRedirect to="/join" />} />
            <Route path="*" element={<LegacyRedirect to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
