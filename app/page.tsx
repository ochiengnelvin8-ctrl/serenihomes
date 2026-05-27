"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import { supabase }
from "@/lib/supabase"

import PropertyCard
from "@/components/PropertyCard"

interface Property {

  id: string

  title: string

  description: string

  location: string

  price: string

  image_url: string

  category: string

  featured?: boolean

  views?: number
}

export default function HomePage() {

  const [
    latestProperties,
    setLatestProperties,
  ] = useState<Property[]>([])

  const [
    featuredProperties,
    setFeaturedProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // FETCH LATEST PROPERTIES

  async function fetchProperties() {

    const {
      data,
      error,
    } = await supabase

      .from("properties")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      )

      .limit(6)

    if (error) {

      console.error(error)

      return
    }

    setLatestProperties(
      data || []
    )
  }

  // FETCH FEATURED PROPERTIES

  async function fetchFeatured() {

    const {
      data,
      error,
    } = await supabase

      .from("properties")

      .select("*")

      .eq(
        "featured",
        true
      )

      .limit(6)

    if (error) {

      console.error(error)

      return
    }

    setFeaturedProperties(
      data || []
    )
  }

  useEffect(() => {

    async function loadData() {

      setLoading(true)

      await Promise.all([
        fetchProperties(),
        fetchFeatured(),
      ])

      setLoading(false)
    }

    loadData()

  }, [])

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
      "
    >

      {/* HERO SECTION */}

      <section
        className="
          relative
          overflow-hidden
          px-6
          py-28
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-2
            gap-14
            items-center
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                inline-block
                bg-orange-100
                text-orange-600
                px-5
                py-2
                rounded-full
                font-semibold
                mb-6
              "
            >

              Kenya's Modern
              Property Marketplace

            </div>

            <h1
              className="
                text-6xl
                font-extrabold
                leading-tight
                text-gray-900
                mb-8
              "
            >

              Find Your Perfect
              Home With
              Sereni Homes

            </h1>

            <p
              className="
                text-xl
                text-gray-600
                leading-9
                mb-10
              "
            >

              Discover apartments,
              villas, bedsitters,
              and rental homes
              across Kenya with
              trusted listings and
              direct landlord contact.

            </p>

            <div
              className="
                flex
                flex-wrap
                gap-5
              "
            >

              <Link

                href="/properties"

                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-8
                  py-5
                  rounded-2xl
                  font-bold
                  text-lg
                  transition
                "
              >

                Browse Properties

              </Link>

              <Link

                href="/membership"

                className="
                  bg-white
                  hover:bg-gray-100
                  text-gray-900
                  px-8
                  py-5
                  rounded-2xl
                  font-bold
                  text-lg
                  shadow-md
                  transition
                "
              >

                Become a Member

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              relative
            "
          >

            <img

              src="
              https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop
              "

              alt="
              Modern Home
              "

              className="
                rounded-[40px]
                shadow-2xl
                object-cover
                h-[550px]
                w-full
              "
            />

            <div
              className="
                absolute
                -bottom-8
                -left-8
                bg-white
                shadow-2xl
                rounded-3xl
                p-6
                w-72
              "
            >

              <h3
                className="
                  text-2xl
                  font-extrabold
                  mb-2
                "
              >

                1000+

              </h3>

              <p
                className="
                  text-gray-600
                "
              >

                Verified properties
                listed across Kenya

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURED PROPERTIES */}

      <section
        className="
          px-6
          py-20
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-10
            "
          >

            <div>

              <h2
                className="
                  text-4xl
                  font-extrabold
                  mb-3
                "
              >

                Featured Properties

              </h2>

              <p
                className="
                  text-gray-600
                  text-lg
                "
              >

                Premium hand-picked
                homes

              </p>

            </div>

          </div>

          {featuredProperties.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-16
                text-center
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-4
                "
              >

                No Featured Listings Yet

              </h3>

              <p
                className="
                  text-gray-600
                  text-lg
                "
              >

                Featured properties
                will appear here.

              </p>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-8
              "
            >

              {featuredProperties.map(
                (property) => (

                  <div
                    key={property.id}

                    className="
                      relative
                    "
                  >

                    {/* FEATURED BADGE */}

                    <div
                      className="
                        absolute
                        top-4
                        left-4
                        z-10
                        bg-yellow-400
                        text-black
                        px-4
                        py-2
                        rounded-full
                        font-bold
                        shadow-lg
                      "
                    >

                      ⭐ Featured

                    </div>

                    <PropertyCard

                      id={property.id}

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

                    />

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* LATEST PROPERTIES */}

      <section
        className="
          px-6
          pb-24
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-10
            "
          >

            <div>

              <h2
                className="
                  text-4xl
                  font-extrabold
                  mb-3
                "
              >

                Latest Properties

              </h2>

              <p
                className="
                  text-gray-600
                  text-lg
                "
              >

                Newly added homes
                and rentals

              </p>

            </div>

            <Link

              href="/properties"

              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-6
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >

              View All

            </Link>

          </div>

          {loading ? (

            <div
              className="
                text-center
                py-20
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  text-orange-500
                "
              >

                Loading properties...

              </h3>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-8
              "
            >

              {latestProperties.map(
                (property) => (

                  <PropertyCard

                    key={property.id}

                    id={property.id}

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

                  />
                )
              )}

            </div>
          )}

        </div>

      </section>

    </main>
  )
}