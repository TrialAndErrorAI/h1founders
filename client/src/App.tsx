import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ToolsIndex from './pages/tools'
import SalaryExplorer from './pages/tools/SalaryExplorer'
import EB1AQualifier from './pages/tools/EB1AQualifier'
import Resources from './pages/resources'
import Stories from './pages/stories'
import Events from './pages/events'
import Network from './pages/network'
import Academy from './pages/academy'
import Forum from './pages/forum'
import ForumThread from './pages/forum/ForumThread'
import CreateThread from './pages/forum/CreateThread'
import Partners from './pages/Partners'

const ENABLE_PARTNERSHIPS = import.meta.env.VITE_ENABLE_PARTNERSHIPS === 'true'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
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
  )
}

export default App