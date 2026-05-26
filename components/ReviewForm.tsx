"use client"

import { useState }
from "react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string

  onReviewAdded?: () => void
}

export default function ReviewForm({

  propertyId,

  onReviewAdded,

}: Props) {

  const [
    rating,
    setRating,
  ] = useState(5)

  const [
    comment,
    setComment,
  ] = useState("")

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function submitReview() {

    setLoading(true)

    const {
      data: {
        user,
      },
    } =
      await supabase.auth.getUser()

    if (!user) {

      alert(
        "Please login first."
      )

      setLoading(false)

      return
    }

    const {
      error,
    } =
      await supabase

        .from("reviews")

        .insert([
          {
            property_id:
              propertyId,

            user_id:
              user.id,

            rating,

            comment,
          },
        ])

    if (error) {

      console.error(error)

      alert(
        "Failed to submit review."
      )

      setLoading(false)

      return
    }

    alert(
      "Review submitted!"
    )

    setComment("")

    setRating(5)

    onReviewAdded?.()

    setLoading(false)
  }

  return (

    <div
      className="
        bg-orange-50
        rounded-3xl
        p-6
      "
    >

      <h3
        className="
          text-2xl
          font-bold
          mb-5
        "
      >

        Leave a Review

      </h3>

      <select
        value={rating}

        onChange={(e) =>
          setRating(
            Number(
              e.target.value
            )
          )
        }

        className="
          w-full
          border
          rounded-2xl
          p-4
          mb-5
        "
      >

        <option value={5}>
          5 Stars
        </option>

        <option value={4}>
          4 Stars
        </option>

        <option value={3}>
          3 Stars
        </option>

        <option value={2}>
          2 Stars
        </option>

        <option value={1}>
          1 Star
        </option>

      </select>

      <textarea

        placeholder="
        Write your review...
        "

        value={comment}

        onChange={(e) =>
          setComment(
            e.target.value
          )
        }

        className="
          w-full
          border
          rounded-2xl
          p-4
          min-h-[140px]
          mb-5
        "
      />

      <button
        onClick={
          submitReview
        }

        disabled={loading}

        className="
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-8
          py-4
          rounded-2xl
          font-bold
          transition
        "
      >

        {
          loading

            ? "Submitting..."

            : "Submit Review"
        }

      </button>

    </div>
  )
}