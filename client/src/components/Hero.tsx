export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          "You can't start a business on H1B."
        </h1>
        <p className="mt-6 text-2xl font-bold text-green-600 sm:text-3xl">
          I built $3M ARR, $0 VC, 95% gross profit anyway.
        </p>
        <p className="mt-6 text-xl leading-8 text-gray-700 sm:text-2xl max-w-3xl mx-auto">
          15 years. Always 60 days from deportation. Until I learned to bootstrap profitable businesses 
          despite all the myths hacking immigrant minds.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          Now 1,400+ immigrant founders are breaking free from visa slavery.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <a
            href="#community"
            className="rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-full sm:w-auto text-center"
          >
            Join 1,400+ Founders
          </a>
          <a
            href="#coaching"
            className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            Get 1:1 Coaching <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}