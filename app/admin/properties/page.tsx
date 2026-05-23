import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { supabase } from '@/lib/supabase'

export default async function AdminPropertiesPage() {

  const { data: properties } =
    await supabase
      .from('properties')
      .select('*')
      .order('created_at', {
        ascending: false
      })

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-orange-500 mb-12">

          Manage Properties

        </h1>

        <div className="space-y-8">

          {properties?.map((property) => (

            <div
              key={property.id}
              className="bg-white p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row gap-8"
            >

              <img
                src={property.image_url}
                alt={property.title}
                className="w-full lg:w-72 h-60 object-cover rounded-2xl"
              />

              <div className="flex-1">

                <h2 className="text-3xl font-bold text-orange-500 mb-4">
                  {property.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {property.description}
                </p>

                <p className="font-semibold mb-2">
                  📍 {property.location}
                </p>

                <p className="text-green-600 font-bold text-xl">
                  Ksh {property.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  )
}