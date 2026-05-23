import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { supabase } from '@/lib/supabase'

export default async function AnalyticsPage() {

  const { count: propertiesCount } =
    await supabase
      .from('properties')
      .select('*', {
        count: 'exact',
        head: true
      })

  const { count: bookingsCount } =
    await supabase
      .from('bookings')
      .select('*', {
        count: 'exact',
        head: true
      })

  const { count: reviewsCount } =
    await supabase
      .from('reviews')
      .select('*', {
        count: 'exact',
        head: true
      })

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-orange-500 mb-12">

          Platform Analytics

        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-6">
              🏠
            </div>

            <h2 className="text-4xl font-bold text-orange-500 mb-4">

              {propertiesCount || 0}

            </h2>

            <p className="text-gray-600 text-xl">
              Properties
            </p>

          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-6">
              📅
            </div>

            <h2 className="text-4xl font-bold text-orange-500 mb-4">

              {bookingsCount || 0}

            </h2>

            <p className="text-gray-600 text-xl">
              Bookings
            </p>

          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-6">
              ⭐
            </div>

            <h2 className="text-4xl font-bold text-orange-500 mb-4">

              {reviewsCount || 0}

            </h2>

            <p className="text-gray-600 text-xl">
              Reviews
            </p>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  )
}