"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import Image from "next/image"

import {
  MapPin,
  BedDouble,
  Bath,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string

  category: string

  location: string

  price: string
}

interface Property {

  id: string

  title: string

  location: string

  price: string

  image_url: string

  bedrooms?: number

  bathrooms?: number

  category?: string
}

export default function
RecommendedProperties({

  propertyId,

  category,

  location,

  price,

}: Props) {

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  async function
  fetchRecommendations() {

    try {

      setLoading(true)

      const numericPrice =
        Number(price)

      const minPrice =
        numericPrice - 5000

      const maxPrice =
        numericPrice + 5000

      const {
        data,
        error,
      } = await supabase

        .from("properties")

        .select("*")

        .neq(
          "id",
          propertyId
        )

        .eq(
          "category",
          category
        )

        .ilike(
          "location",
          `%${location}%`
        )

        .gte(
          "price",
          minPrice
        )

        .lte(
          "price",
          maxPrice
        )

        .limit(6)

      if (error) {

        console.error(error)

        return
      }

      setProperties(
        data || []
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchRecommendations()

  }, [])

  if (
    loading ||
    properties.length === 0
  ) {

    return null
  }

  return (

    <div
      className="
        mt-14
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >

        <h2
          className="
            text-4xl
            font-extrabold
          "
        >

          You may also like

        </h2>

        <Link

          href="/properties"

          className="
            text-orange-500
            font-bold
            hover:text-orange-600
          "
        >

          View More

        </Link>

      </div>

      <div
        className="
          grid
          sm:grid-cols-2
          xl:grid-cols-3
          gap-8
        "
      >

        {properties.map(
          (property) => (

            <Link

              key={property.id}

              href={`/properties/${property.id}`}

              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition
                group
              "
            >

              {/* IMAGE */}

              <div
                className="
                  relative
                  h-64
                  overflow-hidden
                "
              >

                <Image

                  src={
                    property.image_url
                  }

                  alt={
                    property.title
                  }

                  fill

                  className="
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-500
                  "
                />

              </div>

              {/* CONTENT */}

              <div
                className="
                  p-6
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                    gap-4
                    mb-4
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >

                    {
                      property.title
                    }

                  </h3>

                  <div
                    className="
                      text-orange-500
                      font-extrabold
                      text-xl
                      whitespace-nowrap
                    "
                  >

                    Ksh {
                      property.price
                    }

                  </div>

                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-500
                    mb-5
                  "
                >

                  <MapPin
                    size={18}
                  />

                  {
                    property.location
                  }

                </div>

                <div
                  className="
                    flex
                    gap-6
                    text-gray-600
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <BedDouble
                      size={18}
                    />

                    {
                      property.bedrooms || 0
                    } Beds

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Bath
                      size={18}
                    />

                    {
                      property.bathrooms || 0
                    } Baths

                  </div>

                </div>

              </div>

            </Link>
          )
        )}

      </div>

    </div>
  )
}