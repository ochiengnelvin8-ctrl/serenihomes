type Review = {
  id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
}

export default function ReviewsList({
  reviews
}: {
  reviews: Review[]
}) {

  return (

    <div className="bg-white p-8 rounded-3xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold text-orange-500 mb-8">
        Client Reviews
      </h2>

      {reviews.length === 0 && (

        <p className="text-gray-500">
          No reviews yet.
        </p>

      )}

      <div className="space-y-8">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="border-b pb-6"
          >

            <div className="flex justify-between items-center mb-4">

              <h3 className="font-bold text-xl">
                {review.reviewer_name}
              </h3>

              <div className="text-yellow-500 text-lg">

                {'⭐'.repeat(review.rating)}

              </div>

            </div>

            <p className="text-gray-700 leading-7">

              {review.comment}

            </p>

            <p className="text-sm text-gray-400 mt-3">

              {new Date(
                review.created_at
              ).toLocaleDateString()}

            </p>

          </div>

        ))}

      </div>

    </div>
  )
}