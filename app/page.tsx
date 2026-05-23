import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="hero-gradient min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-6xl font-bold leading-tight text-gray-800">
              Welcome to
              <span className="text-orange-500"> Sereni Homes</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Connecting tenants, landlords, movers, homeowners,
              and household service providers in one welcoming
              community platform.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="btn-primary">
                Get Started
               </button>

              <button className="border border-teal-600 text-teal-700 px-6 py-3 rounded-full hover:bg-teal-700 hover:text-white transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Sereni Homes"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="section-title">
            Why Sereni Homes?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-orange-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-orange-500">
                Trusted Community
              </h3>
              <p>
                Verified tenants, landlords, movers, and service providers.
              </p>
            </div>

            <div className="bg-teal-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-teal-700">
                Easy Connections
              </h3>
              <p>
                Quickly connect with housing and home service providers.
              </p>
           </div>

            <div className="bg-green-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Safe & Reliable
              </h3>
              <p>
                Ratings and reviews help maintain quality and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}