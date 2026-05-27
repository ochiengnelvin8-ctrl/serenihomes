"use client"

import {
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string
}

export default function
BookingForm({

  propertyId,

}: Props) {

  const [
    bookingDate,
    setBookingDate,
  ] = useState("")

  const [
    message,
    setMessage,
  ] = useState("")

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function
  handleBooking(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setLoading(true)

      // CURRENT USER

      const {
        data: authData,
      } =
        await supabase.auth.getUser()

      const user =
        authData.user

      if (!user) {

        alert(
          "Please login first"
        )

        return
      }

      // CREATE BOOKING

      const {
        error,
      } = await supabase

        .from("bookings")

        .insert({

          property_id:
            propertyId,

          tenant_id:
            user.id,

          booking_date:
            bookingDate,

          message,
        })

      if (error) {

        console.error(error)

        alert(
          "Booking failed"
        )

        return
      }

      alert(
        "Viewing request sent successfully!"
      )

      setBookingDate("")
      setMessage("")

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <form
      onSubmit={
        handleBooking
      }

      className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >

        Request Viewing

      </h2>

      {/* DATE */}

      <div
        className="
          mb-6
        "
      >

        <label
          className="
            block
            mb-3
            font-semibold
          "
        >

          Preferred Date

        </label>

        <input

          type="date"

          required

          value={bookingDate}

          onChange={(e) =>
            setBookingDate(
              e.target.value
            )
          }

          className="
            w-full
            border
            rounded-2xl
            p-4
          "
        />

      </div>

      {/* MESSAGE */}

      <div
        className="
          mb-8
        "
      >

        <label
          className="
            block
            mb-3
            font-semibold
          "
        >

          Message

        </label>

        <textarea

          rows={5}

          placeholder="
          Ask questions or leave a message...
          "

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          className="
            w-full
            border
            rounded-2xl
            p-4
          "
        />

      </div>

      {/* BUTTON */}

      <button

        type="submit"

        disabled={loading}

        className="
          w-full
          bg-orange-500
          hover:bg-orange-600
          disabled:opacity-50
          text-white
          py-4
          rounded-2xl
          font-bold
          text-lg
          transition
        "
      >

        {loading

          ? "Sending Request..."

          : "Book Viewing"}

      </button>

    </form>
  )
}