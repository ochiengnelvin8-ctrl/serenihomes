"use client"

import { useEffect, useState }
from "react"

import PropertyCard
from "@/components/PropertyCard"

import SearchFilters
from "@/components/SearchFilters"

import { supabase }
from "@/lib/supabase"

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
    filteredProperties,
    setFilteredProperties,
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
    location,
    setLocation,
  ] = useState("")

  const [
    maxPrice,
    setMaxPrice,
  ] = useState("")

  useEffect(() => {

    fetchProperties()

  }, [])

  useEffect(() => {

    filterProperties()

  }, [
    search,
    category,
    location,
    maxPrice,
    properties,
  ])

  async function fetchProperties() {

    setLoading(true)

    const {
      data,
      error,
    } =
      await supabase

        .from("properties")

        .select("*")

        .order(
          "created_at",

          {
            ascending: false,
          }
        )

    if (error) {

      console.error(error)

      setLoading(false)

      return
    }

    setProperties(data || [])

    setFilteredProperties(
      data || []
    )

    setLoading(false)
  }

  function filterProperties() {

    let filtered =
      [...properties]

    // SEARCH

    if (search) {

      filtered =
        filtered.filter(
          (property) =>

            property.title
              .toLowerCase()

              .includes(
                search.toLowerCase()
              )
        )
    }

    // CATEGORY

    if (category) {

      filtered =
        filtered.filter(
          (property) =>

            property.category ===
            category
        )
    }

    // LOCATION

    if (location) {

      filtered =
        filtered.filter(
          (property) =>

            property.location
              .toLowerCase()

              .includes(
                location.toLowerCase()
              )
        )
    }

    // MAX PRICE

    if (maxPrice) {

      filtered =
        filtered.filter(
          (property) =>

            Number(
              property.price
            ) <=
            Number(maxPrice)
        )
    }

    setFilteredProperties(
      filtered
    )
  }

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

            Browse Properties

          </h1>

          <p
            className="
              text-gray-600
              text-lg
            "
          >

            Find your perfect home
            with advanced filters.
          </p>

        </div>

        {/* FILTERS */}

        <SearchFilters

          search={search}

          setSearch={setSearch}

          category={category}

          setCategory={setCategory}

          location={location}

          setLocation={setLocation}

          maxPrice={maxPrice}

          setMaxPrice={setMaxPrice}
        />

        {/* RESULTS */}

        <div
          className="
            flex
            justify-between
            items-center
            mb-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
            "
          >

            {filteredProperties.length}
            {" "}
            Properties Found

          </h2>

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
                text-3xl
                font-bold
                text-orange-500
              "
            >

              Loading properties...

            </h2>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          filteredProperties.length === 0 && (

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

              No properties found

            </h2>

            <p
              className="
                text-gray-600
              "
            >

              Try adjusting your filters.

            </p>

          </div>
        )}

        {/* GRID */}

        {!loading &&
          filteredProperties.length > 0 && (

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {filteredProperties.map(
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

                  bedrooms={
                    property.bedrooms
                  }

                  bathrooms={
                    property.bathrooms
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