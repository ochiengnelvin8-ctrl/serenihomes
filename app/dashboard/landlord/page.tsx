'use client'

import { useEffect, useState } from 'react'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ImageUpload from '@/components/ImageUpload'

import { supabase } from '@/lib/supabase'

interface Property {
  id: string
  title: string
  location: string
  price: string
  description: string
  image_url: string
}

export default function LandlordDashboard() {

  const [loading, setLoading] =
    useState(false)

  const [properties, setProperties] =
    useState<Property[]>([])

  const [formData, setFormData] =
    useState({
      title: '',
      location: '',
      price: '',
      description: '',
      image_url: ''
    })

  // FETCH LANDLORD PROPERTIES

  const fetchProperties = async () => {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } =
      await supabase
        .from('properties')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false
        })

    if (error) {

      console.log(error.message)

      return
    }

    setProperties(data || [])
  }

  useEffect(() => {

    fetchProperties()

  }, [])

  // CREATE PROPERTY

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {

        alert('Please login first.')

        setLoading(false)

        return
      }

      const { error } =
        await supabase
          .from('properties')
          .insert([
            {
              user_id: user.id,
              title: formData.title,
              location: formData.location,
              price: formData.price,
              description:
                formData.description,
              image_url:
                formData.image_url
            }
          ])

      if (error) {

        alert(error.message)

        setLoading(false)

        return
      }

      alert('Property added successfully!')

      setFormData({
        title: '',
        location: '',
        price: '',
        description: '',
        image_url: ''
      })

      fetchProperties()

    } catch (error) {

      alert('Something went wrong.')

    }

    setLoading(false)
  }

  // DELETE PROPERTY

  const deleteProperty = async (
    id: string
  ) => {

    const confirmed =
      confirm(
        'Are you sure you want to delete this property?'
      )

    if (!confirmed) return

    const { error } =
      await supabase
        .from('properties')
        .delete()
        .eq('id', id)

    if (error) {

      alert(error.message)

      return
    }

    alert('Property deleted.')

    fetchProperties()
  }

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-orange-500 mb-6">

            Landlord Dashboard

          </h1>

          <p className="text-xl text-gray-600">

            Add and manage your properties
            on Sereni Homes.

          </p>

        </div>

        {/* PROPERTY FORM */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-20">

          <h2 className="text-3xl font-bold text-orange-500 mb-10">

            Add New Property

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              placeholder="Property Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <textarea
              placeholder="Property Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4 h-40"
              required
            />

            {/* IMAGE UPLOAD */}

            <div>

              <h3 className="text-xl font-semibold mb-4">

                Upload Property Image

              </h3>

              <ImageUpload
                onUpload={(url) =>
                  setFormData({
                    ...formData,
                    image_url: url
                  })
                }
              />

            </div>

            {/* IMAGE PREVIEW */}

            {formData.image_url && (

              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-80 object-cover rounded-2xl"
              />

            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition w-full"
            >

              {loading
                ? 'Adding Property...'
                : 'Add Property'}

            </button>

          </form>

        </div>

        {/* PROPERTY LIST */}

        <div>

          <h2 className="text-4xl font-bold text-orange-500 mb-10">

            Your Properties

          </h2>

          {properties.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

              <p className="text-gray-500 text-lg">

                No properties added yet.

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {properties.map((property) => (

                <div
                  key={property.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >

                  {property.image_url && (

                    <img
                      src={property.image_url}
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />

                  )}

                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-orange-500 mb-3">

                      {property.title}

                    </h3>

                    <p className="text-gray-600 mb-2">

                      📍 {property.location}

                    </p>

                    <p className="text-gray-800 font-semibold mb-4">

                      Ksh {property.price}

                    </p>

                    <p className="text-gray-500 mb-6">

                      {property.description}

                    </p>

                    <button
                      onClick={() =>
                        deleteProperty(property.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl w-full"
                    >

                      Delete Property

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

      <Footer />

    </main>
  )
}
