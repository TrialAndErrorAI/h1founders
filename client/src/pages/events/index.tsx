import { useState } from 'react'
import { getUpcomingEvents, getPastEvents, Event } from '../../data/events'
import EmailCapture from '../../components/EmailCapture'

export default function Events() {
  const [showPast, setShowPast] = useState(false)
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()
  const displayEvents = showPast ? pastEvents : upcomingEvents

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm} EST`
  }

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'call': return '📞'
      case 'workshop': return '🎓'
      case 'meetup': return '🤝'
      case 'webinar': return '📺'
      default: return '📅'
    }
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'call': return 'text-blue-400'
      case 'workshop': return 'text-purple-400'
      case 'meetup': return 'text-yellow-400'
      case 'webinar': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="terminal-prompt mb-2"></div>
          <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
            EVENTS/CALENDAR
          </h1>
          <p className="text-gray-400 text-lg">
            Virtual calls, workshops, and IRL meetups for immigrant founders.
          </p>
        </div>

        {/* Toggle between Upcoming and Past */}
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={() => setShowPast(false)}
            className={`px-4 py-2 font-mono text-sm rounded-lg border transition-all ${
              !showPast 
                ? 'bg-green-500 text-black border-green-500' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            UPCOMING ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setShowPast(true)}
            className={`px-4 py-2 font-mono text-sm rounded-lg border transition-all ${
              showPast 
                ? 'bg-green-500 text-black border-green-500' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            PAST_EVENTS ({pastEvents.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {displayEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getEventIcon(event.type)}</span>
                      <div>
                        <span className={`font-mono text-xs uppercase ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        {event.isRecurring && (
                          <span className="ml-2 text-xs text-yellow-400">🔄 RECURRING</span>
                        )}
                      </div>
                    </div>
                    {event.location && (
                      <span className="text-gray-400 text-sm">📍 {event.location}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="font-mono">{formatDate(event.date)}</span>
                    <span>•</span>
                    <span>{formatTime(event.time)}</span>
                    <span>•</span>
                    <span>{event.duration} min</span>
                  </div>

                  {/* Attendance */}
                  {(event.attendees || event.maxAttendees) && (
                    <div className="mb-4">
                      {event.isPast ? (
                        <span className="text-green-400 text-sm">
                          👥 {event.attendees} attended
                        </span>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Registered</span>
                            <span className="text-white font-mono">
                              {event.attendees || 0}/{event.maxAttendees || '∞'}
                            </span>
                          </div>
                          {event.maxAttendees && (
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                                style={{ width: `${((event.attendees || 0) / event.maxAttendees) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    {event.isPast && event.recordingUrl ? (
                      <a
                        href={event.recordingUrl}
                        className="flex-1 text-center px-4 py-2 bg-gray-800 text-white rounded-lg font-mono text-sm hover:bg-gray-700 transition-colors"
                      >
                        WATCH_RECORDING()
                      </a>
                    ) : !event.isPast && event.registrationUrl ? (
                      <>
                        <a
                          href={event.registrationUrl}
                          className="flex-1 text-center px-4 py-2 bg-green-500 text-black rounded-lg font-mono text-sm font-semibold hover:bg-green-400 transition-colors"
                        >
                          REGISTER()
                        </a>
                        <button className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg font-mono text-sm hover:border-gray-400 transition-colors">
                          ADD_TO_CAL()
                        </button>
                      </>
                    ) : null}
                  </div>

                  {/* Recurring Schedule Note */}
                  {event.recurringSchedule && (
                    <p className="mt-4 text-xs text-gray-500 font-mono">
                      // {event.recurringSchedule}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {displayEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 font-mono">
                  // No {showPast ? 'past' : 'upcoming'} events
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Next Event Highlight */}
            {!showPast && upcomingEvents.length > 0 && (
              <div className="bg-gradient-to-r from-green-900/20 to-transparent border border-green-500/30 rounded-lg p-6">
                <h3 className="text-lg font-mono text-green-400 mb-4">// NEXT_EVENT</h3>
                <div className="space-y-2">
                  <p className="text-white font-semibold">{upcomingEvents[0].title}</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(upcomingEvents[0].date)} at {formatTime(upcomingEvents[0].time)}
                  </p>
                  <a
                    href={upcomingEvents[0].registrationUrl}
                    className="inline-block mt-3 px-4 py-2 bg-green-500 text-black rounded font-mono text-sm font-semibold hover:bg-green-400 transition-colors"
                  >
                    REGISTER_NOW()
                  </a>
                </div>
              </div>
            )}

            {/* Email Updates */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono text-white mb-2">// Event Updates</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get notified about upcoming events and workshops.
              </p>
              <EmailCapture
                placeholder="founder@startup.com"
                buttonText="NOTIFY_ME()"
                context="events-updates"
              />
            </div>

            {/* Event Types Legend */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono text-green-400 mb-4">// EVENT_TYPES</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span>📞</span>
                  <div>
                    <span className="text-blue-400 font-mono text-sm">CALL</span>
                    <p className="text-gray-500 text-xs">Open Q&A sessions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🎓</span>
                  <div>
                    <span className="text-purple-400 font-mono text-sm">WORKSHOP</span>
                    <p className="text-gray-500 text-xs">Deep-dive training</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🤝</span>
                  <div>
                    <span className="text-yellow-400 font-mono text-sm">MEETUP</span>
                    <p className="text-gray-500 text-xs">IRL networking</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span>📺</span>
                  <div>
                    <span className="text-green-400 font-mono text-sm">WEBINAR</span>
                    <p className="text-gray-500 text-xs">Educational content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Your Own */}
            <div className="bg-black border border-red-500/30 rounded-lg p-6 text-center">
              <h3 className="text-lg font-mono text-white mb-2">
                Want to host?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Organize a meetup in your city
              </p>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-mono text-sm hover:bg-red-500 hover:text-white transition-all">
                PROPOSE_EVENT()
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}