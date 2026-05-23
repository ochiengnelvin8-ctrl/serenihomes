'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

interface Review {
  id: string
  name: string
  comment: string
  rating: number
  created_at: string
}

export default function ReviewsList({
  propertyId
}: {
  propertyId: string
}) {

  const [reviews, setReviews] =
    useState<Review[]>([])

  const [loading, setLoading] =
    useState(true)

  // FETCH REVIEWS

  const fetchReviews = async () => {

    const { data, error } =
      await supabase
        .from('reviews')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', {
          ascending: false
        })

    if (error) {

      console.log(error.message)

      setLoading(false)

      return
    }

    setReviews(data || [])

    setLoading(false)
  }

  useEffect(() => {

    fetchReviews()

  }, [])

  // LOADING

  if (loading) {

    return (

      <p className="text-gray-500">

        Loading reviews...

      </p>

    )
  }

  // NO REVIEWS

  if (reviews.length === 0) {

    return (

      <div className="bg-white rounded-2xl p-8 shadow-lg">

        <p className="text-gray-500 text-lg">

          No reviews yet.

        </p>

      </div>

    )
  }

  return (

    <div className="space-y-6">

      {reviews.map((review) => (

        <div
          key={review.id}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          {/* REVIEW HEADER */}

          <div className="flex items-center justify-between mb-4">

            <h3 className="text-2xl font-bold text-orange-500">

              {review.name}

            </h3>

            <div className="text-yellow-500 text-xl">

              {'⭐'.repeat(review.rating)}

            </div>

          </div>

          {/* COMMENT */}

          <p className="text-gray-600 text-lg leading-relaxed mb-4">

            {review.comment}

          </p>

          {/* DATE */}

          <p className="text-sm text-gray-400">

            {new Date(
              review.created_at
            ).toLocaleDateString()}

          </p>

        </div>

      ))}

    </div>
  )
}