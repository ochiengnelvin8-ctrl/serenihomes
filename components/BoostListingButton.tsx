"use client"

import {
  useState,
} from "react"

import {
  Crown,
  Loader2,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string
}

export default function
BoostListingButton({

  propertyId,
}: Props) {

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function boostListing() {

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

      // CREATE PAYMENT RECORD

      const {
        error:
          paymentError,
      } = await supabase

        .from(
          "premium_payments"
        )

        .insert({

          property_id:
            propertyId,

          landlord_id:
            user.id,

          amount:
            999,

          payment_method:
            "mpesa",

          status:
            "completed",
        })

      if (paymentError) {

        console.error(
          paymentError
        )

        alert(
          "Payment failed"
        )

        return
      }

      // UPDATE PROPERTY

      const premiumUntil =
        new Date()

      premiumUntil.setDate(
        premiumUntil.getDate()
        + 30
      )

      const {
        error:
          updateError,
      } = await supabase

        .from("properties")

        .update({

          featured: true,

          premium_until:
            premiumUntil
            .toISOString(),
        })

        .eq(
          "id",
          propertyId
        )

      if (updateError) {

        console.error(
          updateError
        )

        return
      }

      alert(
        "Listing boosted successfully!"
      )

      window.location.reload()

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <button

      onClick={
        boostListing
      }

      disabled={loading}

      className="
        bg-gradient-to-r
        from-orange-500
        to-yellow-500
        hover:scale-105
        transition
        text-white
        px-6
        py-4
        rounded-2xl
        font-bold
        flex
        items-center
        gap-3
        shadow-lg
      "
    >

      {loading ? (

        <Loader2
          className="
            animate-spin
          "
        />

      ) : (

        <Crown size={22} />

      )}

      {loading

        ? "Processing..."

        : "Boost Listing"}
    </button>
  )
}