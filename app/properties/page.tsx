import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import PropertySearch from '@/components/PropertySearch'

import { supabase } from '@/lib/supabase'

export default async function PropertiesPage() {

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

      <section className="py-20 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-orange-500 mb-6">
            Available Properties
          </h1>

          <p className="text-xl text-gray-600">
            Find your perfect home with Sereni Homes.
          </p>

        </div>

        <PropertySearch
          properties={properties || []}
        />

      </section>

      <Footer />

    </main>
  )
}