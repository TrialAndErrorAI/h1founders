import Hero from './components/Hero'
import TheReceipts from './components/TheReceipts'
import WhatIActuallyDo from './components/WhatIActuallyDo'
import FounderStory from './components/FounderStory'
import Transformation from './components/Transformation'
import Coaching from './components/Coaching'
import Community from './components/Community'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <TheReceipts />
      <WhatIActuallyDo />
      <FounderStory />
      <Transformation />
      <Coaching />
      <Community />
      <Footer />
    </div>
  )
}

export default App