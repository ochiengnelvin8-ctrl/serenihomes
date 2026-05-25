"use client"

import { useEffect, useState }
from "react"

import { Heart }
from "lucide-react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: number
}

export default function FavoriteButton({
  propertyId,
}: Props) {

  const [
    isFavorite,
    setIsFavorite,
  ] = useState(false)

  const [
    loading,
    setLoading,
  ] = useState(false)

  useEffect(() => {

    checkFavorite()

  }, [])

  async function checkFavorite() {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) return

    const { data } =
      await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq(
          "property_id",
          propertyId
        )
        .single()

    setIsFavorite(!!data)
  }

  async function toggleFavorite() {

    setLoading(true)

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      alert(
        "Please login first."
      )

      setLoading(false)

      return
    }

    if (isFavorite) {

      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq(
          "property_id",
          propertyId
        )

      setIsFavorite(false)

    } else {

      await supabase
        .from("favorites")
        .insert({

          user_id: user.id,

          property_id:
            propertyId,
        })

      setIsFavorite(true)
    }

    setLoading(false)
  }

  return (

    <button
      onClick={toggleFavorite}

      disabled={loading}

      className="
        bg-white
        shadow-md
        p-3
        rounded-full
        hover:scale-110
        transition
      "
    >

      <Heart

        size={24}

        className={`
          transition

          ${
            isFavorite

              ? "fill-red-500 text-red-500"

              : "text-gray-500"
          }
        `}
      />

    </button>
  )
}