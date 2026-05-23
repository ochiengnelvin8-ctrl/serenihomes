import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { supabase } from '@/lib/supabase'

export default async function AdminBookingsPage() {

  const { data: bookings } =
    await supabase
      .from('bookings')
      .select('*')
      .order('created_at', {
        ascending: false
      })

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-orange-500 mb-12">

          Booking Requests

        </h1>

        <div className="space-y-8">

          {bookings?.map((booking) => (

            <div
              key={booking.id}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >

              <h2 className="text-2xl font-bold mb-4">

                {booking.full_name}

              </h2>

              <p className="mb-2">
                📞 {booking.phone}
              </p>

              <p className="mb-2">
                📅 {booking.viewing_date}
              </p>

              <p className="mb-4">
                💬 {booking.message}
              </p>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">

                {booking.status}

              </span>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  )
}