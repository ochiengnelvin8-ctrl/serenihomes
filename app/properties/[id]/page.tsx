import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import ReviewForm from '@/components/ReviewForm'
import ReviewsList from '@/components/ReviewsList'
import BookingForm from '@/components/BookingForm'

import { supabase } from '@/lib/supabase'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyDetailsPage({
  params
}: PageProps) {

  const { id } = await params

  // FETCH PROPERTY

  const { data: property } =
    await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

  // FETCH REVIEWS

  const { data: reviews } =
    await supabase
      .from('reviews')
      .select('*')
      .eq('property_id', id)
      .order('created_at', {
        ascending: false
      })

  // PROPERTY NOT FOUND

  if (!property) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Property not found
        </h1>

      </main>
    )
  }

  // WHATSAPP MESSAGE

  const whatsappMessage =
    encodeURIComponent(
      `Hello Sereni Homes, I am interested in "${property.title}" located at ${property.location}.`
    )

  const whatsappLink =
    `https://wa.me/254115416729?text=${whatsappMessage}`

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* IMAGE */}

          <div>

            <img
              src={property.image_url}
              alt={property.title}
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />

          </div>

          {/* DETAILS */}

          <div>

            <div className="flex justify-between items-center mb-6">

              <h1 className="text-5xl font-bold text-orange-500">
                {property.title}
              </h1>

              <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
                {property.category}
              </span>

            </div>

            <p className="text-2xl font-bold text-green-600 mb-6">

              Ksh {property.price}

            </p>

            <p className="text-lg font-semibold mb-6">

              📍 {property.location}

            </p>

            <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">

              <h2 className="text-2xl font-bold mb-4">
                Property Description
              </h2>

              <p className="text-gray-700 leading-8 text-lg">

                {property.description}

              </p>

            </div>

            {/* CONTACT */}

            <div className="bg-white p-8 rounded-3xl shadow-lg">

              <h2 className="text-2xl font-bold mb-6">
                Contact Seller
              </h2>

              <div className="space-y-4">

                <a
                  href={whatsappLink}
                  target="_blank"
                  className="block bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-2xl text-lg font-bold"
                >
                  WhatsApp Seller
                </a>

                <a
                  href="mailto:ochiengnevo8@gmail.com"
                  className="block bg-orange-500 hover:bg-orange-600 text-white text-center py-4 rounded-2xl text-lg font-bold"
                >
                  Email Seller
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* REVIEWS */}

        <div className="mt-20">

          <ReviewsList
  reviews={reviews || []}
/>

<ReviewForm
  propertyId={id}
/>

<BookingForm
  propertyId={id}
/>

        </div>

      </section>

      <Footer />

    </main>
  )
}