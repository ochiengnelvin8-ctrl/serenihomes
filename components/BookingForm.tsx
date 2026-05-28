"use client"

import {
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string

  landlordId: string
}

export default function
BookingForm({

  propertyId,

  landlordId,
}: Props) {

  const [
    moveInDate,
    setMoveInDate,
  ] = useState("")

  const [
    message,
    setMessage,
  ] = useState("")

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function submitBooking(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setLoading(true)

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

      const {
        error,
      } = await supabase

        .from("bookings")

        .insert({

          property_id:
            propertyId,

          tenant_id:
            user.id,

          landlord_id:
            landlordId,

          move_in_date:
            moveInDate,

          message,

          status:
            "pending",
        })

      if (error) {

        console.error(error)

        alert(
          "Failed to send booking"
        )

        return
      }

      alert(
        "Booking request sent!"
      )

      setMoveInDate("")

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
        submitBooking
      }

      className="
        space-y-5
      "
    >

      {/* DATE */}

      <div>

        <label
          className="
            block
            mb-2
            font-semibold
          "
        >

          Preferred Move-in Date

        </label>

        <input

          type="date"

          required

          value={
            moveInDate
          }

          onChange={(e) =>

            setMoveInDate(
              e.target.value
            )
          }

          className="
            w-full
            border
            rounded-2xl
            px-5
            py-4
            outline-none
          "
        />

      </div>

      {/* MESSAGE */}

      <div>

        <label
          className="
            block
            mb-2
            font-semibold
          "
        >

          Message

        </label>

        <textarea

          rows={5}

          placeholder="
            Tell landlord about yourself...
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
            px-5
            py-4
            outline-none
            resize-none
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
          text-white
          py-4
          rounded-2xl
          font-bold
          transition
        "
      >

        {loading

          ? "Sending..."

          : "Request Booking"}
      </button>

    </form>
  )
}