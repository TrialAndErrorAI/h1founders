import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getDevModeBanner } from '../utils/devMode'
import MediaBanner from '../components/MediaBanner'
import Hero from '../components/Hero'
import MissionStatement from '../components/MissionStatement'
import TheReceipts from '../components/TheReceipts'
import Transformation from '../components/Transformation'
import Coaching from '../components/Coaching'
import SubstackFeed from '../components/SubstackFeed'
import Community from '../components/Community'
import Footer from '../components/Footer'

export default function Home() {
  const { user, loading } = useAuth()
  
  // Redirect logged-in users to offerings
  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/offerings'
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
  
  // Get dev mode banner configuration
  const devBanner = getDevModeBanner();

  // If user is authenticated, they'll be redirected above
  return (
    <>
      {/* DEV MODE TOOLBAR - LOCALHOST ONLY */}
      {devBanner && (
        <div className="bg-yellow-500 text-black p-2 font-mono text-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="font-bold">{devBanner.message}</span>
            <div className="flex gap-2">
              {devBanner.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1 bg-black text-yellow-500 rounded hover:bg-gray-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* CrisisBanner removed - crisis nav link removed */}
      <MediaBanner />
      <Hero />
      <MissionStatement />
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