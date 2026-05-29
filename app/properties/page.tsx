"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Building2,
  Search,
  SlidersHorizontal,
} from "lucide-react"

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

  category?: string

  bedrooms?: number

  bathrooms?: number

  views?: number

  featured?: boolean
}

export default function
PropertiesPage() {

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

  const [
    search,
    setSearch,
  ] = useState("")

  const [
    showFilters,
    setShowFilters,
  ] = useState(false)

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All")

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

    try {

      setLoading(true)

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

      if (error) {

        console.error(error)

        return
      }

      const sorted =
        (data || []).sort(

          (a, b) => {

            // FEATURED FIRST

            if (
              a.featured &&
              !b.featured
            ) return -1

            if (
              !a.featured &&
              b.featured
            ) return 1

            // MOST VIEWED SECOND

            return (
              (b.views || 0)
              -
              (a.views || 0)
            )
          }
        )

      setProperties(sorted)

      setFilteredProperties(
        sorted
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

  // FILTERS

  useEffect(() => {

    let filtered =
      [...properties]

    // SEARCH

    if (search) {

      filtered =
        filtered.filter(

          (
            property
          ) =>

            property.title
              .toLowerCase()

              .includes(
                search.toLowerCase()
              )

            ||

            property.location
              .toLowerCase()

              .includes(
                search.toLowerCase()
              )

            ||

            property.description
              .toLowerCase()

              .includes(
                search.toLowerCase()
              )
        )
    }

    // CATEGORY

    if (
      selectedCategory !==
      "All"
    ) {

      filtered =
        filtered.filter(

          (
            property
          ) =>

            property.category ===
            selectedCategory
        )
    }

    // MIN PRICE

    if (minPrice) {

      filtered =
        filtered.filter(

          (
            property
          ) =>

            Number(
              property.price
            ) >=
            Number(minPrice)
        )
    }

    // MAX PRICE

    if (maxPrice) {

      filtered =
        filtered.filter(

          (
            property
          ) =>

            Number(
              property.price
            ) <=
            Number(maxPrice)
        )
    }

    // BEDROOMS

    if (bedrooms) {

      filtered =
        filtered.filter(

          (
            property
          ) =>

            Number(
              property.bedrooms
            ) >=
            Number(bedrooms)
        )
    }

    // SORT AGAIN

    const sorted =
      [...filtered].sort(

        (a, b) => {

          if (
            a.featured &&
            !b.featured
          ) return -1

          if (
            !a.featured &&
            b.featured
          ) return 1

          return (
            (b.views || 0)
            -
            (a.views || 0)
          )
        }
      )

    setFilteredProperties(
      sorted
    )

  }, [

    search,

    selectedCategory,

    minPrice,

    maxPrice,

    bedrooms,

    properties,
  ])

  // CATEGORIES

  const categories =
    useMemo(() => {

      const all =
        properties.map(
          (
            property
          ) =>

            property.category
        )

      return [

        "All",

        ...new Set(
          all.filter(Boolean)
        ),
      ]

    }, [properties])

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
          bg-gradient-to-r
          from-orange-500
          to-yellow-500
          text-white
          py-24
          px-6
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
              gap-4
              mb-6
            "
          >

            <Building2
              size={42}
            />

            <h1
              className="
                text-6xl
                font-black
              "
            >

              Discover Properties

            </h1>

          </div>

          <p
            className="
              text-2xl
              max-w-3xl
              text-white/90
            "
          >

            Browse premium rental
            apartments, bedsitters,
            studios and houses across
            Kenya.

          </p>

        </div>

      </section>

      {/* SEARCH + FILTERS */}

      <section
        className="
          px-6
          -mt-10
          relative
          z-20
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            bg-white
            rounded-3xl
            shadow-2xl
            p-6
          "
        >

          {/* SEARCH BAR */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-4
            "
          >

            <div
              className="
                flex-1
                relative
              "
            >

              <Search
                size={22}
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input

                type="text"

                placeholder="
                  Search by title,
                  location or keyword...
                "

                value={search}

                onChange={(e) =>

                  setSearch(
                    e.target.value
                  )
                }

                className="
                  w-full
                  border
                  border-gray-200
                  rounded-2xl
                  py-5
                  pl-14
                  pr-5
                  text-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-400
                "
              />

            </div>

            <button

              onClick={() =>

                setShowFilters(
                  !showFilters
                )
              }

              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-8
                rounded-2xl
                font-bold
                flex
                items-center
                justify-center
                gap-3
                transition
              "
            >

              <SlidersHorizontal
                size={22}
              />

              Filters

            </button>

          </div>

          {/* ADVANCED FILTERS */}

          {showFilters && (

            <div
              className="
                mt-8
                border-t
                pt-8
              "
            >

              <AdvancedFilters

                categories={
                  categories
                }

                selectedCategory={
                  selectedCategory
                }

                setSelectedCategory={
                  setSelectedCategory
                }

                minPrice={
                  minPrice
                }

                setMinPrice={
                  setMinPrice
                }

                maxPrice={
                  maxPrice
                }

                setMaxPrice={
                  setMaxPrice
                }

                bedrooms={
                  bedrooms
                }

                setBedrooms={
                  setBedrooms
                }

              />

            </div>
          )}

        </div>

      </section>

      {/* PROPERTIES */}

      <section
        className="
          px-6
          py-16
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          {/* TOP */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              mb-10
            "
          >

            <div>

              <h2
                className="
                  text-4xl
                  font-black
                  mb-2
                "
              >

                Available Properties

              </h2>

              <p
                className="
                  text-gray-500
                  text-lg
                "
              >

                {
                  filteredProperties.length
                }
                {" "}
                properties found

              </p>

            </div>

          </div>

          {/* LOADING */}

          {loading ? (

            <div
              className="
                py-32
                text-center
              "
            >

              <h3
                className="
                  text-4xl
                  font-black
                  text-orange-500
                "
              >

                Loading properties...

              </h3>

            </div>

          ) : filteredProperties.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-20
                text-center
                shadow-md
              "
            >

              <h3
                className="
                  text-4xl
                  font-black
                  mb-4
                "
              >

                No Properties Found

              </h3>

              <p
                className="
                  text-gray-500
                  text-lg
                "
              >

                Try changing your
                search or filters.

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

              {filteredProperties.map(
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

                    bedrooms={
                      property.bedrooms
                    }

                    bathrooms={
                      property.bathrooms
                    }

                    views={
                      property.views
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