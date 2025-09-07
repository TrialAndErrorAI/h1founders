export default function Transformation() {
  return (
    <section className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-16">
          Your Path to EB1-A
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">FROM: The EB2 Trap</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Waiting 150 years in EB2 queue
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                60 days from deportation if laid off
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Can't start a company (you think)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Dependent on employer sponsorship
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Kids age out at 21, lose status
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-4">TO: EB1-A Freedom</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Green card in 12-18 months
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Self-sponsored, no employer needed
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Build companies freely
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                "Extraordinary ability" recognition
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Full family gets green cards
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold text-gray-900">
            The path exists. I took it. Now I'll show you how.
          </p>
        </div>
      </div>
    </section>
  )
}