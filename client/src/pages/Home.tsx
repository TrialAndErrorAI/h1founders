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
  const devBanner = getDevModeBanner();

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
      <MediaBanner />
      <Hero />
      <MissionStatement />
      <TheReceipts />
      <Transformation />
      <Coaching />
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
