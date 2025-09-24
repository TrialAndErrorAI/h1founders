import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import CrisisBanner from '../components/CrisisBanner'
import Hero from '../components/Hero'
import TheReceipts from '../components/TheReceipts'
import Transformation from '../components/Transformation'
import Coaching from '../components/Coaching'
import SubstackFeed from '../components/SubstackFeed'
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
  
  // Dev mode quick access toolbar
  const isDevMode = window.location.hostname === 'localhost' && import.meta.env.DEV;

  // If user is authenticated, they'll be redirected above
  return (
    <>
      {/* DEV MODE TOOLBAR - LOCALHOST ONLY */}
      {isDevMode && (
        <div className="bg-yellow-500 text-black p-2 font-mono text-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="font-bold">🚧 DEV MODE - LOCALHOST ONLY</span>
            <div className="flex gap-2">
              <a href="/win-club/coach" className="px-3 py-1 bg-black text-yellow-500 rounded hover:bg-gray-900">
                WIN CLUB Coach →
              </a>
              <a href="/admin" className="px-3 py-1 bg-black text-yellow-500 rounded hover:bg-gray-900">
                Admin Panel →
              </a>
              <a href="/forum" className="px-3 py-1 bg-black text-yellow-500 rounded hover:bg-gray-900">
                Forum →
              </a>
            </div>
          </div>
        </div>
      )}
      <CrisisBanner />
      <Hero />
      <TheReceipts />
      {/* <WhatIActuallyDo /> */}
      {/* <FounderStory /> */}
      <Transformation />
      <Coaching />
      {/* Substack Feed - Latest Insights */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <SubstackFeed />
        </div>
      </div>
      <Community />
      <Footer />
    </>
  )
}