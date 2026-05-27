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

  featured?: boolean

  bedrooms?: number

  bathrooms?: number

  views?: number

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

  // SORTING

  const [
    sortBy,
    setSortBy,
  ] = useState("latest")

  // PAGINATION

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1)

  const [
    totalProperties,
    setTotalProperties,
  ] = useState(0)

  const propertiesPerPage = 6

  const totalPages =

    Math.ceil(
      totalProperties /
      propertiesPerPage
    )

  // FETCH PROPERTIES

  async function fetchProperties() {

    setLoading(true)

    let query =

      supabase

        .from("properties")

        .select("*", {
          count: "exact",
        })

    // SEARCH

    if (search) {

      query =
        query.or(

          `title.ilike.%${search}%,

          description.ilike.%${search}%`
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
          Number(minPrice)
        )
    }

    // MAX PRICE

    if (maxPrice) {

      query =
        query.lte(
          "price",
          Number(maxPrice)
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
            Number(
              bedrooms
            )
          )
      }
    }

    // SORTING

    if (
      sortBy === "latest"
    ) {

      query =
        query.order(
          "created_at",
          {
            ascending: false,
          }
        )
    }

    if (
      sortBy === "price-low"
    ) {

      query =
        query.order(
          "price",
          {
            ascending: true,
          }
        )
    }

    if (
      sortBy === "price-high"
    ) {

      query =
        query.order(
          "price",
          {
            ascending: false,
          }
        )
    }

    if (
      sortBy === "bedrooms"
    ) {

      query =
        query.order(
          "bedrooms",
          {
            ascending: false,
          }
        )
    }

    if (
      sortBy === "views"
    ) {

      query =
        query.order(
          "views",
          {
            ascending: false,
          }
        )
    }

    if (
      sortBy === "featured"
    ) {

      query =
        query.order(
          "featured",
          {
            ascending: false,
          }
        )
    }

    // PAGINATION

    const from =

      (currentPage - 1)
      *
      propertiesPerPage

    const to =

      from
      +
      propertiesPerPage
      -
      1

    query =
      query.range(
        from,
        to
      )

    const {
      data,
      error,
      count,
    } = await query

    if (error) {

      console.error(error)

    } else {

      setProperties(
        data || []
      )

      setTotalProperties(
        count || 0
      )
    }

    setLoading(false)
  }

  // RESET PAGE

  useEffect(() => {

    setCurrentPage(1)

  }, [

    search,
    location,
    category,
    minPrice,
    maxPrice,
    bedrooms,
    sortBy,
  ])

  // FETCH

  useEffect(() => {

    fetchProperties()

  }, [

    search,
    location,
    category,
    minPrice,
    maxPrice,
    bedrooms,
    sortBy,
    currentPage,
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

            Explore Properties

          </h1>

          <p
            className="
              text-lg
              text-gray-600
            "
          >

            Discover apartments,
            villas, studios,
            bedsitters and homes
            across Kenya.

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

          sortBy={sortBy}
          setSortBy={setSortBy}

        />

        {/* RESULTS INFO */}

        {!loading && (

          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >

            <p
              className="
                text-gray-600
                text-lg
              "
            >

              Showing

              <span
                className="
                  font-bold
                  text-gray-900
                  mx-2
                "
              >

                {properties.length}

              </span>

              of

              <span
                className="
                  font-bold
                  text-gray-900
                  mx-2
                "
              >

                {totalProperties}

              </span>

              properties

            </p>

          </div>
        )}

        {/* LOADING */}

        {loading && (

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

              Try adjusting your
              search filters.

            </p>

          </div>
        )}

        {/* PROPERTY GRID */}

        {!loading &&
          properties.length > 0 && (

          <>
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

                  <div
                    key={property.id}

                    className="
                      relative
                    "
                  >

                    {/* FEATURED BADGE */}

                    {property.featured && (

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
                    )}

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

            {/* PAGINATION */}

            {totalPages > 1 && (

              <div
                className="
                  flex
                  justify-center
                  items-center
                  gap-3
                  mt-14
                  flex-wrap
                "
              >

                {/* PREVIOUS */}

                <button

                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.max(
                          prev - 1,
                          1
                        )
                    )
                  }

                  disabled={
                    currentPage === 1
                  }

                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-white
                    shadow
                    font-semibold
                    disabled:opacity-50
                  "
                >

                  Previous

                </button>

                {/* PAGE NUMBERS */}

                {Array.from(
                  {
                    length:
                      totalPages,
                  },

                  (_, index) => (

                    <button

                      key={index}

                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }

                      className={`
                        px-5
                        py-3
                        rounded-2xl
                        font-semibold
                        transition

                        ${
                          currentPage ===
                          index + 1

                            ? `
                              bg-orange-500
                              text-white
                            `

                            : `
                              bg-white
                              shadow
                            `
                        }
                      `}
                    >

                      {index + 1}

                    </button>
                  )
                )}

                {/* NEXT */}

                <button

                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                    )
                  }

                  disabled={
                    currentPage ===
                    totalPages
                  }

                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-white
                    shadow
                    font-semibold
                    disabled:opacity-50
                  "
                >

                  Next

                </button>

              </div>
            )}

          </>
        )}

      </div>

    </main>
  )
}