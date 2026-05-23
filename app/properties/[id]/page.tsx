import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReviewsList from '@/components/ReviewsList'
import ReviewForm from '@/components/ReviewForm'

import { supabase } from '@/lib/supabase'

interface PropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyDetailsPage({
  params
}: PropertyPageProps) {

  const { id } = await params

  // FETCH PROPERTY

  const { data: property, error } =
    await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

  // PROPERTY NOT FOUND

  if (error || !property) {

    return (

      <main className="min-h-screen bg-orange-50">

        <Navbar />

        <section className="max-w-4xl mx-auto px-6 py-32 text-center">

          <h1 className="text-5xl font-bold text-red-500 mb-6">

            Property Not Found

          </h1>

          <p className="text-gray-600 text-xl">

            The property you are looking for
            does not exist.

          </p>

        </section>

        <Footer />

      </main>

    )
  }

  return (

    <main className="min-h-screen bg-orange-50">

      <Navbar />

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* PROPERTY IMAGE */}

        {property.image_url ? (

          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-3xl shadow-xl mb-12"
          />

        ) : (

          <div className="w-full h-[500px] bg-orange-100 rounded-3xl flex items-center justify-center text-orange-500 text-3xl font-bold mb-12">

            No Image Available

          </div>

        )}

        {/* PROPERTY DETAILS */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

            <div>

              <h1 className="text-5xl font-bold text-orange-500 mb-4">

                {property.title}

              </h1>

              <p className="text-2xl text-gray-600">

                📍 {property.location}

              </p>

            </div>

            <div>

              <p className="text-4xl font-bold text-gray-800">

                Ksh {property.price}

              </p>

            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mb-12">

            <h2 className="text-3xl font-bold text-orange-500 mb-6">

              Description

            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">

              {property.description}

            </p>

          </div>

          {/* PROPERTY FEATURES */}

          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-orange-100 rounded-2xl p-6 text-center">

              <h3 className="text-2xl font-bold text-orange-500 mb-2">

                Safe

              </h3>

              <p className="text-gray-600">

                Secure and family-friendly environment

              </p>

            </div>

            <div className="bg-orange-100 rounded-2xl p-6 text-center">

              <h3 className="text-2xl font-bold text-orange-500 mb-2">

                Comfortable

              </h3>

              <p className="text-gray-600">

                Warm and welcoming modern living

              </p>

            </div>

            <div className="bg-orange-100 rounded-2xl p-6 text-center">

              <h3 className="text-2xl font-bold text-orange-500 mb-2">

                Accessible

              </h3>

              <p className="text-gray-600">

                Easy access to nearby services

              </p>

            </div>

          </div>

          {/* CONTACT SECTION */}

          <div className="bg-orange-500 rounded-3xl p-10 text-white mb-12">

            <h2 className="text-4xl font-bold mb-6">

              Interested In This Property?

            </h2>

            <p className="text-xl mb-8">

              Contact Sereni Homes support for
              inquiries, bookings, or assistance.

            </p>

            <div className="space-y-4">

              <a
                href="https://wa.me/254115416729"
                target="_blank"
                className="block bg-white text-orange-500 text-center py-4 rounded-xl font-bold hover:bg-orange-100 transition"
              >

                Chat on WhatsApp

              </a>

              <a
                href="mailto:ochiengnevo8@gmail.com"
                className="block bg-white text-orange-500 text-center py-4 rounded-xl font-bold hover:bg-orange-100 transition"
              >

                Send Email

              </a>

            </div>

          </div>

          {/* REVIEWS SECTION */}

          <div className="mb-12">

            <h2 className="text-4xl font-bold text-orange-500 mb-8">

              Client Reviews

            </h2>

            <ReviewsList propertyId={property.id} />

          </div>

          {/* REVIEW FORM */}

          <div>

            <h2 className="text-4xl font-bold text-orange-500 mb-8">

              Leave A Review

            </h2>

            <ReviewForm propertyId={property.id} />

          </div>

        </div>

      </section>

      <Footer />

    </main>

  )
}