import {
  Star,
} from "lucide-react"

interface Review {

  id: string

  rating: number

  comment: string

  created_at: string

  profiles?: {

    full_name?: string
  }
}

interface ReviewsListProps {

  reviews: Review[]
}

export default function ReviewsList({

  reviews,

}: ReviewsListProps) {

  if (reviews.length === 0) {

    return (

      <div
        className="
          text-center
          py-10
        "
      >

        <p
          className="
            text-gray-500
            text-lg
          "
        >

          No reviews yet.

        </p>

      </div>
    )
  }

  return (

    <div
      className="
        space-y-6
      "
    >

      {reviews.map(
        (review) => (

          <div
            key={review.id}

            className="
              bg-gray-50
              rounded-3xl
              p-6
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
              "
            >

              <div>

                <h3
                  className="
                    font-bold
                    text-lg
                  "
                >

                  {
                    review
                      .profiles
                      ?.full_name ||

                    "Anonymous User"
                  }

                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  {new Date(
                    review.created_at
                  ).toLocaleDateString()}

                </p>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                {Array.from({
                  length:
                    review.rating,
                }).map(
                  (
                    _,
                    index
                  ) => (

                    <Star
                      key={index}

                      size={18}

                      className="
                        fill-yellow-400
                        text-yellow-400
                      "
                    />
                  )
                )}

              </div>

            </div>

            <p
              className="
                text-gray-700
                leading-7
              "
            >

              {
                review.comment
              }

            </p>

          </div>
        )
      )}

    </div>
  )
}