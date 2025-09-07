export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Skip the{' '}
          <span className="text-red-600">150-Year</span>{' '}
          EB2 Line
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-700 sm:text-2xl">
          Join 1,400+ immigrant founders building their EB1-A profile
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#coaching"
            className="rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Book EB1-A Strategy Session
          </a>
          <a
            href="#community"
            className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            Join Community <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}