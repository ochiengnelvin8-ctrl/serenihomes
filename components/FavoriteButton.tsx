"use client"

import { useEffect, useState }
from "react"

import {
  Heart,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string
}

export default function FavoriteButton({

  propertyId,

}: Props) {

  const [
    favorited,
    setFavorited,
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
      data: {
        user,
      },
    } =
      await supabase.auth.getUser()

    if (!user) return

    const {
      data,
    } =
      await supabase

        .from("favorites")

        .select("*")

        .eq(
          "user_id",
          user.id
        )

        .eq(
          "property_id",
          propertyId
        )

        .single()

    if (data) {

      setFavorited(true)
    }
  }

  async function toggleFavorite() {

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

    if (favorited) {

      await supabase

        .from("favorites")

        .delete()

        .eq(
          "user_id",
          user.id
        )

        .eq(
          "property_id",
          propertyId
        )

      setFavorited(false)

    } else {

      await supabase

        .from("favorites")

        .insert([
          {
            user_id:
              user.id,

            property_id:
              propertyId,
          },
        ])

      setFavorited(true)
    }

    setLoading(false)
  }

  return (

    <button
      onClick={
        toggleFavorite
      }

      disabled={loading}

      className="
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-full
        bg-white
        shadow-md
        hover:scale-105
        transition
      "
    >

      <Heart

        size={26}

        className={

          favorited

            ? "fill-red-500 text-red-500"

            : "text-gray-500"
        }

      />

    </button>
  )
}