import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import Link from 'next/link'

export default function AdminDashboard() {

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-16">

          <h1 className="text-5xl font-bold text-orange-500 mb-4">
            Sereni Homes Admin Dashboard
          </h1>

          <p className="text-xl text-gray-600">
            Manage properties, bookings, reviews and platform activity.
          </p>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* PROPERTIES */}

          <Link href="/admin/properties">

            <div className="bg-white p-10 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">

              <div className="text-5xl mb-6">
                🏠
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Properties
              </h2>

              <p className="text-gray-600">
                Manage all property listings.
              </p>

            </div>

          </Link>

          {/* BOOKINGS */}

          <Link href="/admin/bookings">

            <div className="bg-white p-10 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">

              <div className="text-5xl mb-6">
                📅
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Bookings
              </h2>

              <p className="text-gray-600">
                View property viewing requests.
              </p>

            </div>

          </Link>

          {/* REVIEWS */}

          <Link href="/admin/reviews">

            <div className="bg-white p-10 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">

              <div className="text-5xl mb-6">
                ⭐
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Reviews
              </h2>

              <p className="text-gray-600">
                Monitor customer reviews.
              </p>

            </div>

          </Link>

          {/* ANALYTICS */}

          <Link href="/admin/analytics">

            <div className="bg-white p-10 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">

              <div className="text-5xl mb-6">
                📊
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Analytics
              </h2>

              <p className="text-gray-600">
                Track platform activity.
              </p>

            </div>

          </Link>

        </div>

      </section>

      <Footer />

    </main>
  )
}