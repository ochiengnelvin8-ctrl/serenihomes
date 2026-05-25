interface Review {

  id: number

  user_name: string

  comment: string

  rating: number

  created_at: string
}

interface ReviewsListProps {

  reviews: Review[]
}

export default function ReviewsList({
  reviews,
}: ReviewsListProps) {

  if (!reviews.length) {

    return (

      <div className="text-gray-500">

        No reviews yet.

      </div>
    )
  }

  return (

    <div className="space-y-6">

      {reviews.map((review) => (

        <div
          key={review.id}
          className="
            bg-orange-50
            rounded-2xl
            p-5
            border
          "
        >

          {/* HEADER */}

          <div className="flex justify-between items-center mb-3">

            <h3 className="font-bold text-lg">

              {review.user_name ||
                "Anonymous"}

            </h3>

            <span className="text-orange-500 font-semibold">

              ⭐ {review.rating}/5

            </span>

          </div>

          {/* COMMENT */}

          <p className="text-gray-700 leading-7">

            {review.comment}

          </p>

          {/* DATE */}

          <p className="text-sm text-gray-500 mt-4">

            {new Date(
              review.created_at
            ).toLocaleDateString()}

          </p>

        </div>

      ))}

    </div>
  )
}