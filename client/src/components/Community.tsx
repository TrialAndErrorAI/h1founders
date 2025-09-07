export default function Community() {
  return (
    <section id="community" className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            "Each one of us has an inspiring story"
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            1,400+ immigrant founders helping each other build businesses and break free from visa slavery.
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
          <h3 className="text-xl font-bold text-gray-900 mb-6">Real Stories From Our WhatsApp</h3>
          <div className="space-y-6">
            <blockquote className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700 font-medium mb-2">
                "I was on an H1B but my grace period ended and I changed my status to B2. 
                I'm deciding if I should try for an EB2-NIW or an O1 or an H1B."
              </p>
              <p className="text-gray-600 italic text-sm">
                This is Girish - our first member. Started in panic, now building his company.
              </p>
            </blockquote>
            
            <blockquote className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-700 font-medium mb-2">
                "Thanks Sid for your selflessness and willingness to share your experience with many."
              </p>
              <p className="text-gray-600 italic text-sm">
                This community isn't about me selling you something. It's about us helping each other.
              </p>
            </blockquote>
            
            <blockquote className="border-l-4 border-purple-500 pl-4">
              <p className="text-gray-700 font-medium mb-2">
                "I am an ex-founder with an EB1-A green card. You can self sponsor your EB1-A green card. 
                I created PermanentResident.us to give back."
              </p>
              <p className="text-gray-600 italic text-sm">
                — Lindsey, got EB1-A, now helps others for free. That's our community DNA.
              </p>
            </blockquote>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-blue-800 font-semibold">
              "By sharing we make each other stronger with a sense of community." - Sid
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}