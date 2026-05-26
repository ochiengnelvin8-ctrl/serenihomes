"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { supabase } from "@/lib/supabase"

import PropertyCard from "@/components/PropertyCard"

import SearchFilters from "@/components/SearchFilters"

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

  created_at?: string
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

  // FETCH PROPERTIES

  async function fetchProperties() {

    setLoading(true)

    let query =

      supabase

        .from("properties")

        .select("*")

        .order(
          "created_at",

          {
            ascending: false,
          }
        )

    // SEARCH

    if (search) {

      query =
        query.or(
          `title.ilike.%${search}%,
location.ilike.%${search}%`
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

    const {
      data,
      error,
    } = await query

    if (error) {

      console.error(error)

      setLoading(false)

      return
    }

    setProperties(
      data || []
    )

    setLoading(false)
  }

  // LIVE FILTERING

  useEffect(() => {

    fetchProperties()

  }, [

    search,

    category,

    minPrice,

    maxPrice,
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

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-extrabold
                text-orange-500
                mb-3
              "
            >

              Browse Properties

            </h1>

            <p
              className="
                text-gray-600
                text-lg
              "
            >

              Find your perfect home with Sereni Homes.

            </p>

          </div>

          <Link
            href="/dashboard/landlord"

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

            Add Property

          </Link>

        </div>

        {/* SEARCH FILTERS */}

        <SearchFilters

          search={search}
          setSearch={setSearch}

          category={category}
          setCategory={setCategory}

          minPrice={minPrice}
          setMinPrice={setMinPrice}

          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}

        />

        {/* LOADING */}

        {loading ? (

          <div
            className="
              text-center
              py-24
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

        ) : properties.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              p-16
              text-center
              shadow-md
            "
          >

            <h2
              className="
                text-4xl
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

              Try adjusting your filters or search terms.

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

            {properties.map(
              (property) => (

                <PropertyCard

                  key={property.id}

                  id={property.id}

                  title={property.title}

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