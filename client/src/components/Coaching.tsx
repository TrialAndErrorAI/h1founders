export default function Coaching() {
  return (
    <section id="coaching" className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 px-8 py-16 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              EB1-A Strategy Session with Sid
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              I got my EB1-A. I'll show you exactly how to build your profile for extraordinary ability recognition.
            </p>
          </div>
          
          <div className="mx-auto mt-12 max-w-sm">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">45-minute session</p>
                  <p className="text-3xl font-bold text-gray-900">$185</p>
                </div>
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Review your current profile</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">EB1-A criteria assessment</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">90-day action plan</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Attorney recommendations</span>
                </li>
              </ul>
              
              <a
                href="https://cal.com/sid-sarasvati/eb1a-strategy"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-green-600 px-4 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Book Your Session
              </a>
            </div>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Limited slots available. Sessions typically book 2 weeks out.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}