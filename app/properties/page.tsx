"use client"

import {
  useEffect,
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

import PropertyCard
from "@/components/PropertyCard"

import AdvancedFilters
from "@/components/AdvancedFilters"

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
}

export default function PropertiesPage() {

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // FILTER STATES

  const [
    search,
    setSearch,
  ] = useState("")

  const [
    location,
    setLocation,
  ] = useState("")

  const [
    category,
    setCategory,
  ] = useState("")

  const [
    minPrice,
    setMinPrice,
  ] = useState("")

  const [
    maxPrice,
    setMaxPrice,
  ] = useState("")

  const [
    bedrooms,
    setBedrooms,
  ] = useState("")

  // FETCH PROPERTIES

  async function fetchProperties() {

    setLoading(true)

    let query =

      supabase

        .from("properties")

        .select("*")

    // SEARCH

    if (search) {

      query =
        query.ilike(
          "title",
          `%${search}%`
        )
    }

    // LOCATION

    if (location) {

      query =
        query.ilike(
          "location",
          `%${location}%`
        )
    }

    // CATEGORY

    if (category) {

      query =
        query.eq(
          "category",
          category
        )
    }

    // MIN PRICE

    if (minPrice) {

      query =
        query.gte(
          "price",
          minPrice
        )
    }

    // MAX PRICE

    if (maxPrice) {

      query =
        query.lte(
          "price",
          maxPrice
        )
    }

    // BEDROOMS

    if (bedrooms) {

      if (
        bedrooms === "4"
      ) {

        query =
          query.gte(
            "bedrooms",
            4
          )

      } else {

        query =
          query.eq(
            "bedrooms",
            bedrooms
          )
      }
    }

    const {
      data,
      error,
    } = await query.order(
      "created_at",
      {
        ascending: false,
      }
    )

    if (error) {

      console.error(error)

    } else {

      setProperties(
        data || []
      )
    }

    setLoading(false)
  }

  // REFETCH ON FILTER CHANGE

  useEffect(() => {

    fetchProperties()

  }, [

    search,
    location,
    category,
    minPrice,
    maxPrice,
    bedrooms,
  ])

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        px-6
        py-10
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
              text-gray-900
              mb-4
            "
          >

            Discover Properties

          </h1>

          <p
            className="
              text-lg
              text-gray-600
            "
          >

            Find apartments,
            villas, bedsitters,
            and homes across Kenya.

          </p>

        </div>

        {/* FILTERS */}

        <AdvancedFilters

          search={search}
          setSearch={setSearch}

          location={location}
          setLocation={setLocation}

          category={category}
          setCategory={setCategory}

          minPrice={minPrice}
          setMinPrice={setMinPrice}

          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}

          bedrooms={bedrooms}
          setBedrooms={setBedrooms}

        />

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
                text-3xl
                font-bold
                text-orange-500
              "
            >

              Loading properties...

            </h2>

          </div>
        )}

        {/* EMPTY STATE */}

        {!loading &&
          properties.length === 0 && (

          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-16
              text-center
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >

              No Properties Found

            </h2>

            <p
              className="
                text-gray-600
                text-lg
              "
            >

              Try changing your
              filters or search terms.

            </p>

          </div>
        )}

        {/* PROPERTY GRID */}

        {!loading &&
          properties.length > 0 && (

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {properties.map(
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

    </main>
  )
}