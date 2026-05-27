"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import {
  ArrowRight,
  Building2,
  MapPin,
  Star,
} from "lucide-react"

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

  bedrooms?: number

  bathrooms?: number

  featured?: boolean
}

export default function
HomePage() {

  const [
    featuredProperties,
    setFeaturedProperties,
  ] = useState<Property[]>([])

  const [
    latestProperties,
    setLatestProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // FETCH DATA

  async function fetchProperties() {

    try {

      setLoading(true)

      // FEATURED

      const {
        data: featuredData,
      } = await supabase

        .from("properties")

        .select("*")

        .eq(
          "featured",
          true
        )

        .limit(6)

      // LATEST

      const {
        data: latestData,
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

      setFeaturedProperties(
        featuredData || []
      )

      setLatestProperties(
        latestData || []
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchProperties()

  }, [])

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
      "
    >

      {/* HERO */}

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
            gap-16
            items-center
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-orange-100
                text-orange-600
                px-5
                py-2
                rounded-full
                font-semibold
                mb-6
              "
            >

              <Star
                size={18}
              />

              Trusted Housing Platform

            </div>

            <h1
              className="
                text-6xl
                lg:text-7xl
                font-black
                leading-tight
                mb-8
              "
            >

              Find Your

              <span
                className="
                  text-orange-500
                "
              >

                {" "}Perfect Home

              </span>

            </h1>

            <p
              className="
                text-xl
                text-gray-600
                leading-relaxed
                mb-10
              "
            >

              Discover apartments,
              bedsitters,
              hostels,
              and premium homes
              across Kenya with
              SereniHomes.

            </p>

            {/* BUTTONS */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
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
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition
                "
              >

                Browse Properties

                <ArrowRight
                  size={22}
                />

              </Link>

              <Link

                href="/dashboard/landlord"

                className="
                  bg-white
                  hover:bg-gray-100
                  text-gray-800
                  border
                  border-gray-200
                  px-8
                  py-5
                  rounded-2xl
                  font-bold
                  text-lg
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition
                "
              >

                List Your Property

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              relative
            "
          >

            <div
              className="
                bg-white
                rounded-[40px]
                p-10
                shadow-2xl
              "
            >

              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                "
              >

                <div
                  className="
                    bg-orange-100
                    rounded-3xl
                    p-8
                  "
                >

                  <Building2
                    size={42}
                    className="
                      text-orange-500
                      mb-5
                    "
                  />

                  <h3
                    className="
                      text-4xl
                      font-black
                      mb-2
                    "
                  >

                    500+

                  </h3>

                  <p
                    className="
                      text-gray-600
                    "
                  >

                    Verified Listings

                  </p>

                </div>

                <div
                  className="
                    bg-orange-500
                    text-white
                    rounded-3xl
                    p-8
                  "
                >

                  <MapPin
                    size={42}
                    className="
                      mb-5
                    "
                  />

                  <h3
                    className="
                      text-4xl
                      font-black
                      mb-2
                    "
                  >

                    20+

                  </h3>

                  <p>

                    Kenyan Cities

                  </p>

                </div>

                <div
                  className="
                    col-span-2
                    bg-gray-900
                    text-white
                    rounded-3xl
                    p-8
                  "
                >

                  <h3
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    Safe & Secure

                  </h3>

                  <p
                    className="
                      text-gray-300
                      text-lg
                    "
                  >

                    Trusted platform for
                    tenants and landlords.

                  </p>

                </div>

              </div>

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
              justify-between
              items-center
              mb-12
            "
          >

            <div>

              <h2
                className="
                  text-5xl
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

                Premium homes selected
                for you

              </p>

            </div>

            <Link

              href="/properties"

              className="
                hidden
                md:flex
                items-center
                gap-2
                text-orange-500
                font-bold
                text-lg
              "
            >

              View All

              <ArrowRight
                size={20}
              />

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

                Loading...

              </h3>

            </div>

          ) : featuredProperties.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-14
                text-center
                shadow-md
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-4
                "
              >

                No featured properties

              </h3>

              <p
                className="
                  text-gray-500
                "
              >

                Featured listings will
                appear here.

              </p>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
              "
            >

              {featuredProperties.map(
                (property) => (

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

                    featured={
                      property.featured
                    }

                  />
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
              justify-between
              items-center
              mb-12
            "
          >

            <div>

              <h2
                className="
                  text-5xl
                  font-extrabold
                  mb-3
                "
              >

                Latest Listings

              </h2>

              <p
                className="
                  text-gray-600
                  text-lg
                "
              >

                Recently added homes
                and apartments

              </p>

            </div>

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

                Loading...

              </h3>

            </div>

          ) : latestProperties.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-14
                text-center
                shadow-md
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-4
                "
              >

                No properties found

              </h3>

              <p
                className="
                  text-gray-500
                "
              >

                Listings will appear
                here once landlords
                upload them.

              </p>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
              "
            >

              {latestProperties.map(
                (property) => (

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

                    featured={
                      property.featured
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