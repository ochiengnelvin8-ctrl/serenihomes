import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { supabase } from '@/lib/supabase'

export default async function AdminReviewsPage() {

  const { data: reviews } =
    await supabase
      .from('reviews')
      .select('*')
      .order('created_at', {
        ascending: false
      })

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-orange-500 mb-12">

          Client Reviews

        </h1>

        <div className="space-y-8">

          {reviews?.map((review) => (

            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold">

                  {review.reviewer_name}

                </h2>

                <div className="text-yellow-500 text-xl">

                  {'⭐'.repeat(review.rating)}

                </div>

              </div>

              <p className="text-gray-700 leading-7">

                {review.comment}

              </p>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  )
}