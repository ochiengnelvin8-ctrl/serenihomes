'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabase'

export default function BookingForm({
  propertyId
}: {
  propertyId: string
}) {

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      full_name: '',
      phone: '',
      viewing_date: '',
      message: ''
    })

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
          .from('bookings')
          .insert([
            {
              property_id: propertyId,
              user_id: user.id,
              full_name:
                formData.full_name,
              phone:
                formData.phone,
              viewing_date:
                formData.viewing_date,
              message:
                formData.message
            }
          ])

      if (error) {

        alert(error.message)

        setLoading(false)

        return
      }

      alert(
        'Viewing request submitted successfully!'
      )

      setFormData({
        full_name: '',
        phone: '',
        viewing_date: '',
        message: ''
      })

    } catch (err) {

      alert('Something went wrong.')

    }

    setLoading(false)
  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold text-orange-500 mb-6">

        Book Property Viewing

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              full_name:
                e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone:
                e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
          required
        />

        <input
          type="date"
          value={formData.viewing_date}
          onChange={(e) =>
            setFormData({
              ...formData,
              viewing_date:
                e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
          required
        />

        <textarea
          placeholder="Message..."
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message:
                e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4 h-40"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >

          {loading
            ? 'Submitting...'
            : 'Request Viewing'}

        </button>

      </form>

    </div>
  )
}