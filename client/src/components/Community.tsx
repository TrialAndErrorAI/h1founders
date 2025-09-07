export default function Community() {
  return (
    <section id="community" className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join 1,400+ Founders Taking Action
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real paths, not lawyer ads. Success stories, not false promises.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">W</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">WhatsApp</h3>
            </div>
            <p className="text-gray-600 mb-4">781 active members sharing real-time updates and wins</p>
            <a
              href="https://chat.whatsapp.com/h1founders"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              Join WhatsApp →
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold">S</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Substack</h3>
            </div>
            <p className="text-gray-600 mb-4">648+ subscribers, 50% open rate, weekly immigration intel</p>
            <a
              href="https://h1founders.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              Subscribe →
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">S</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Slack</h3>
            </div>
            <p className="text-gray-600 mb-4">Deep discussions, attorney AMAs, profile reviews</p>
            <a
              href="https://h1founders.slack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              Join Slack →
            </a>
          </div>
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Success Stories</h3>
          <div className="space-y-4">
            <blockquote className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700 italic">
                "Got my EB1-A approved in 14 months. The community's guidance was invaluable."
              </p>
              <cite className="text-sm text-gray-500">— Lindsey, PermanentResident.us founder</cite>
            </blockquote>
            <blockquote className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700 italic">
                "From grace period panic to self-sponsored founder. This group changed my trajectory."
              </p>
              <cite className="text-sm text-gray-500">— Girish, First member</cite>
            </blockquote>
            <blockquote className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700 italic">
                "100+ joined in 24 hours after Sid's post. We all felt the same pain. Now we're solving it together."
              </p>
              <cite className="text-sm text-gray-500">— Community member</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}