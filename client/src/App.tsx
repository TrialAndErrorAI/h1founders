import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'

// Lazy load all non-essential pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ToolsIndex = lazy(() => import('./pages/tools'))
const SalaryExplorer = lazy(() => import('./pages/tools/SalaryExplorer'))
const EB1AQualifier = lazy(() => import('./pages/tools/EB1AQualifier'))
const Resources = lazy(() => import('./pages/resources'))
const Stories = lazy(() => import('./pages/stories'))
const Events = lazy(() => import('./pages/events'))
const Network = lazy(() => import('./pages/network'))
const Academy = lazy(() => import('./pages/academy'))
const Forum = lazy(() => import('./pages/forum'))
const ForumThread = lazy(() => import('./pages/forum/ForumThread'))
const CreateThread = lazy(() => import('./pages/forum/CreateThread'))
const Partners = lazy(() => import('./pages/Partners'))

const ENABLE_PARTNERSHIPS = import.meta.env.VITE_ENABLE_PARTNERSHIPS === 'true'

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-green-400 font-mono">
            <div className="animate-pulse">Initializing Matrix...</div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tools" element={<ToolsIndex />} />
            <Route path="tools/salary-explorer" element={<SalaryExplorer />} />
            <Route path="tools/eb1a-qualifier" element={<EB1AQualifier />} />
            <Route path="resources" element={<Resources />} />
            <Route path="stories" element={<Stories />} />
            <Route path="events" element={<Events />} />
            <Route path="network" element={<Network />} />
            <Route path="academy" element={<Academy />} />
            <Route path="forum" element={<Forum />} />
            <Route path="forum/thread/:threadId" element={<ForumThread />} />
            <Route path="forum/create" element={<CreateThread />} />
            {ENABLE_PARTNERSHIPS && <Route path="partners" element={<Partners />} />}
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}

export default App