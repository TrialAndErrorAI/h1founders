import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Hero from '../components/Hero'
import TheReceipts from '../components/TheReceipts'
import Transformation from '../components/Transformation'
import Coaching from '../components/Coaching'
import Community from '../components/Community'
import Footer from '../components/Footer'

export default function Home() {
  const { user, loading } = useAuth()
  
  // Redirect logged-in users to their forum dashboard
  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/forum'
    }
  }, [user, loading])
  
  // Show landing page only for non-authenticated users
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-accent font-mono">Loading...</div>
      </div>
    )
  }
  
  // If user is authenticated, they'll be redirected above
  return (
    <>
      <Hero />
      <TheReceipts />
      {/* <WhatIActuallyDo /> */}
      {/* <FounderStory /> */}
      <Transformation />
      <Coaching />
      <Community />
      <Footer />
    </>
  )
}