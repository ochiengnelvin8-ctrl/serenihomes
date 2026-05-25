"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import Image from "next/image"

import { supabase } from "@/lib/supabase"

interface Property {

  id: number

  title: string

  location: string

  price: number

  image_url: string
}

interface FavoriteProperty {

  id: number

  property_id: number

  properties: Property[]
}

export default function FavoritesPage() {

  const [
    favorites,
    setFavorites,
  ] = useState<
    FavoriteProperty[]
  >([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  useEffect(() => {

    fetchFavorites()

  }, [])

  async function fetchFavorites() {

    setLoading(true)

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      setLoading(false)

      return
    }

    const {
      data,
      error,
    } =
      await supabase
        .from("favorites")
        .select(`
          id,
          property_id,
          properties (
            id,
            title,
            location,
            price,
            image_url
          )
        `)
        .eq("user_id", user.id)

    if (error) {

      console.error(error)

      setLoading(false)

      return
    }

    setFavorites(
      data as FavoriteProperty[]
    )

    setLoading(false)
  }

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        p-8
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* PAGE HEADER */}

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              font-extrabold
              text-orange-500
              mb-3
            "
          >

            Saved Properties

          </h1>

          <p
            className="
              text-gray-600
              text-lg
            "
          >

            Your favorite homes in one place ❤️

          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div
            className="
              text-center
              py-20
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-orange-500
              "
            >

              Loading favorites...

            </h2>

          </div>
        )}

        {/* EMPTY STATE */}

        {!loading &&
          favorites.length === 0 && (

          <div
            className="
              bg-white
              rounded-3xl
              p-12
              text-center
              shadow-md
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >

              No Saved Properties

            </h2>

            <p
              className="
                text-gray-600
                text-lg
                mb-8
              "
            >

              Start saving properties you love.

            </p>

            <Link
              href="/properties"

              className="
                inline-block
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                transition
              "
            >

              Browse Properties

            </Link>

          </div>
        )}

        {/* FAVORITES GRID */}

        {!loading &&
          favorites.length > 0 && (

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {favorites.map(
              (favorite) => {

                // IMPORTANT FIX HERE

                const property =
                  favorite.properties?.[0]

                // SAFETY CHECK

                if (!property)
                  return null

                return (

                  <Link
                    key={favorite.id}

                    href={`/properties/${property.id}`}
                  >

                    <div
                      className="
                        bg-white
                        rounded-3xl
                        overflow-hidden
                        shadow-md
                        hover:shadow-2xl
                        transition
                        hover:-translate-y-2
                        duration-300
                      "
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          h-64
                          w-full
                        "
                      >

                        <Image
                          src={
                            property.image_url ||

                            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop"
                          }

                          alt={property.title}

                          fill

                          className="
                            object-cover
                          "
                        />

                      </div>

                      {/* CONTENT */}

                      <div
                        className="
                          p-6
                        "
                      >

                        <h2
                          className="
                            text-2xl
                            font-bold
                            mb-3
                            text-gray-800
                          "
                        >

                          {property.title}

                        </h2>

                        <p
                          className="
                            text-gray-600
                            mb-5
                          "
                        >

                          📍 {property.location}

                        </p>

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <p
                            className="
                              text-orange-500
                              text-3xl
                              font-extrabold
                            "
                          >

                            Ksh {property.price}

                          </p>

                          <span
                            className="
                              bg-orange-100
                              text-orange-600
                              px-4
                              py-2
                              rounded-full
                              font-semibold
                              text-sm
                            "
                          >

                            Saved ❤️

                          </span>

                        </div>

                      </div>

                    </div>

                  </Link>
                )
              }
            )}

          </div>
        )}

      </div>

    </main>
  )
}