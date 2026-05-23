'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabase'

export default function ReviewForm({
  propertyId
}: {
  propertyId: string
}) {

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      reviewer_name: '',
      rating: 5,
      comment: ''
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
          .from('reviews')
          .insert([
            {
              property_id: propertyId,
              user_id: user.id,
              reviewer_name:
                formData.reviewer_name,
              rating: formData.rating,
              comment: formData.comment
            }
          ])

      if (error) {

        alert(error.message)

        setLoading(false)

        return
      }

      alert('Review submitted successfully!')

      window.location.reload()

    } catch (err) {

      alert('Something went wrong.')

    }

    setLoading(false)
  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold text-orange-500 mb-6">
        Leave a Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          placeholder="Your Name"
          value={formData.reviewer_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              reviewer_name:
                e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
          required
        />

        <select
          value={formData.rating}
          onChange={(e) =>
            setFormData({
              ...formData,
              rating:
                Number(e.target.value)
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
        >

          <option value={5}>
            ⭐⭐⭐⭐⭐ (5)
          </option>

          <option value={4}>
            ⭐⭐⭐⭐ (4)
          </option>

          <option value={3}>
            ⭐⭐⭐ (3)
          </option>

          <option value={2}>
            ⭐⭐ (2)
          </option>

          <option value={1}>
            ⭐ (1)
          </option>

        </select>

        <textarea
          placeholder="Write your review..."
          value={formData.comment}
          onChange={(e) =>
            setFormData({
              ...formData,
              comment:
                e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4 h-40"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >

          {loading
            ? 'Submitting...'
            : 'Submit Review'}

        </button>

      </form>

    </div>
  )
}