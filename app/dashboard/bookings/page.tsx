"use client"

import {
  useEffect,
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

interface Booking {

  id: string

  booking_date: string

  message: string

  status: string

  properties?: {

    title: string
  }
}

export default function
BookingsPage() {

  const [
    bookings,
    setBookings,
  ] = useState<Booking[]>([])

  async function
  fetchBookings() {

    const {
      data,
      error,
    } = await supabase

      .from("bookings")

      .select(`
        *,
        properties (
          title
        )
      `)

      .order(
        "created_at",
        {
          ascending: false,
        }
      )

    if (error) {

      console.error(error)

      return
    }

    setBookings(
      data || []
    )
  }

  useEffect(() => {

    fetchBookings()

  }, [])

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        px-6
        py-10
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <h1
          className="
            text-5xl
            font-extrabold
            mb-10
          "
        >

          Viewing Requests

        </h1>

        <div
          className="
            space-y-6
          "
        >

          {bookings.map(
            (booking) => (

              <div

                key={booking.id}

                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-8
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                    gap-6
                    flex-wrap
                  "
                >

                  <div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                        mb-3
                      "
                    >

                      {
                        booking.properties
                          ?.title
                      }

                    </h2>

                    <p
                      className="
                        text-gray-600
                        mb-3
                      "
                    >

                      Viewing Date:

                      <span
                        className="
                          font-semibold
                          ml-2
                        "
                      >

                        {
                          booking.booking_date
                        }

                      </span>

                    </p>

                    <p
                      className="
                        text-gray-700
                        leading-7
                      "
                    >

                      {
                        booking.message
                      }

                    </p>

                  </div>

                  <div
                    className="
                      bg-orange-100
                      text-orange-600
                      px-5
                      py-3
                      rounded-full
                      font-semibold
                    "
                  >

                    {
                      booking.status
                    }

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </main>
  )
}