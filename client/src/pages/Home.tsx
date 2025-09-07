import Hero from '../components/Hero'
import TheReceipts from '../components/TheReceipts'
import WhatIActuallyDo from '../components/WhatIActuallyDo'
import FounderStory from '../components/FounderStory'
import Transformation from '../components/Transformation'
import Coaching from '../components/Coaching'
import Community from '../components/Community'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <TheReceipts />
      <WhatIActuallyDo />
      <FounderStory />
      <Transformation />
      <Coaching />
      <Community />
      <Footer />
    </>
  )
}