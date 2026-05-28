"use client"

import {
  useEffect,
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

interface Booking {

  id: string

  move_in_date: string

  message: string

  status: string

  properties: {

    title: string

    location: string
  }
}

export default function
BookingsPage() {

  const [
    bookings,
    setBookings,
  ] = useState<Booking[]>([])

  async function fetchBookings() {

    const {
      data: authData,
    } =
      await supabase.auth.getUser()

    const user =
      authData.user

    if (!user)
      return

    const {
      data,
      error,
    } = await supabase

      .from("bookings")

      .select(`
        *,
        properties (
          title,
          location
        )
      `)

      .eq(
        "landlord_id",
        user.id
      )

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

  async function updateStatus(
    id: string,
    status: string
  ) {

    const {
      error,
    } = await supabase

      .from("bookings")

      .update({
        status,
      })

      .eq("id", id)

    if (error) {

      console.error(error)

      return
    }

    fetchBookings()
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
        py-12
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >

          Booking Requests

        </h1>

        <div
          className="
            space-y-6
          "
        >

          {bookings.map(
            (booking) => (

              <div

                key={
                  booking.id
                }

                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-md
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-3
                  "
                >

                  {
                    booking
                    .properties
                    .title
                  }

                </h2>

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >

                  {
                    booking
                    .properties
                    .location
                  }

                </p>

                <p
                  className="
                    mb-3
                  "
                >

                  Move-in:
                  {" "}

                  {
                    booking
                    .move_in_date
                  }

                </p>

                <p
                  className="
                    mb-5
                  "
                >

                  {
                    booking.message
                  }

                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-orange-100
                      text-orange-600
                      font-semibold
                    "
                  >

                    {
                      booking.status
                    }

                  </span>

                  <button

                    onClick={() =>

                      updateStatus(
                        booking.id,
                        "approved"
                      )
                    }

                    className="
                      bg-green-500
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                    "
                  >

                    Approve

                  </button>

                  <button

                    onClick={() =>

                      updateStatus(
                        booking.id,
                        "rejected"
                      )
                    }

                    className="
                      bg-red-500
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                    "
                  >

                    Reject

                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </main>
  )
}