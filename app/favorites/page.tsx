"use client"

import {
  useEffect,
  useState,
} from "react"

import PropertyCard
from "@/components/PropertyCard"

import { supabase }
from "@/lib/supabase"

interface Favorite {

  id: string

  property_id: string

  properties: {

    id: string

    title: string

    description: string

    location: string

    price: string

    image_url: string

    category: string

    bedrooms?: number

    bathrooms?: number

    featured?: boolean
  }
}

export default function
FavoritesPage() {

  const [
    favorites,
    setFavorites,
  ] = useState<Favorite[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  async function fetchFavorites() {

    try {

      setLoading(true)

      const {
        data: authData,
      } =
        await supabase.auth.getUser()

      const user =
        authData.user

      if (!user) {

        setLoading(false)

        return
      }

      const {
        data,
        error,
      } = await supabase

        .from("favorites")

        .select(`
          *,
          properties (*)
        `)

        .eq(
          "user_id",
          user.id
        )

      if (error) {

        console.error(error)

        return
      }

      setFavorites(
        data || []
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchFavorites()

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
          max-w-7xl
          mx-auto
        "
      >

        {/* HEADER */}

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              font-black
              mb-4
            "
          >

            My Favorites

          </h1>

          <p
            className="
              text-gray-600
              text-lg
            "
          >

            Your saved dream
            properties.

          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div
            className="
              py-24
              text-center
            "
          >

            <h2
              className="
                text-4xl
                font-black
                text-orange-500
              "
            >

              Loading...

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
              p-14
              text-center
              shadow-md
            "
          >

            <h2
              className="
                text-4xl
                font-black
                mb-4
              "
            >

              No favorites yet

            </h2>

            <p
              className="
                text-gray-500
              "
            >

              Start saving
              properties you love.

            </p>

          </div>
        )}

        {/* FAVORITES GRID */}

        {!loading &&
          favorites.length > 0 && (

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {favorites.map(
              (favorite) => {

                const property =
                  favorite.properties

                return (

                  <PropertyCard

                    key={
                      property.id
                    }

                    id={
                      property.id
                    }

                    title={
                      property.title
                    }

                    description={
                      property.description
                    }

                    location={
                      property.location
                    }

                    price={
                      property.price
                    }

                    image_url={
                      property.image_url
                    }

                    category={
                      property.category
                    }

                    bedrooms={
                      property.bedrooms
                    }

                    bathrooms={
                      property.bathrooms
                    }

                    featured={
                      property.featured
                    }

                  />

                )
              }
            )}

          </div>
        )}

      </div>

    </main>
  )
}