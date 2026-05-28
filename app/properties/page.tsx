"use client"

import {
  useEffect,
  useState,
} from "react"

import PropertyCard
from "@/components/PropertyCard"

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

  featured?: boolean

  created_at?: string
}

export default function
PropertiesPage() {

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // SEARCH STATES

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("")

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
    sortOption,
    setSortOption,
  ] = useState("newest")

  // FETCH PROPERTIES

  async function fetchProperties() {

    try {

      setLoading(true)

      let query =
        supabase

          .from("properties")

          .select("*")

      // SEARCH

      if (searchTerm) {

        query = query.or(

          `title.ilike.%${searchTerm}%,

          location.ilike.%${searchTerm}%,

          description.ilike.%${searchTerm}%`
        )
      }

      // CATEGORY

      if (
        selectedCategory &&
        selectedCategory !== "All"
      ) {

        query = query.eq(

          "category",

          selectedCategory
        )
      }

      // MIN PRICE

      if (minPrice) {

        query = query.gte(

          "price",

          Number(minPrice)
        )
      }

      // MAX PRICE

      if (maxPrice) {

        query = query.lte(

          "price",

          Number(maxPrice)
        )
      }

      // SORTING

      if (
        sortOption === "newest"
      ) {

        query = query.order(

          "created_at",

          {
            ascending: false,
          }
        )
      }

      if (
        sortOption === "cheapest"
      ) {

        query = query.order(

          "price",

          {
            ascending: true,
          }
        )
      }

      if (
        sortOption === "expensive"
      ) {

        query = query.order(

          "price",

          {
            ascending: false,
          }
        )
      }

      const {
        data,
        error,
      } = await query

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

  // AUTO REFRESH

  useEffect(() => {

    fetchProperties()

  }, [

    searchTerm,

    selectedCategory,

    minPrice,

    maxPrice,

    sortOption,
  ])

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

            Explore Properties

          </h1>

          <p
            className="
              text-gray-600
              text-lg
            "
          >

            Find your perfect
            home with advanced
            search and filters.

          </p>

        </div>

        {/* FILTERS */}

        <div
          className="
            bg-white
            rounded-3xl
            p-8
            shadow-md
            mb-10
          "
        >

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-5
              gap-5
            "
          >

            {/* SEARCH */}

            <input

              type="text"

              placeholder="
                Search properties...
              "

              value={searchTerm}

              onChange={(e) =>

                setSearchTerm(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            />

            {/* CATEGORY */}

            <select

              value={
                selectedCategory
              }

              onChange={(e) =>

                setSelectedCategory(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option>
                All
              </option>

              <option>
                Apartment
              </option>

              <option>
                Bedsitter
              </option>

              <option>
                Hostel
              </option>

              <option>
                Mansion
              </option>

            </select>

            {/* MIN PRICE */}

            <input

              type="number"

              placeholder="
                Min price
              "

              value={minPrice}

              onChange={(e) =>

                setMinPrice(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            />

            {/* MAX PRICE */}

            <input

              type="number"

              placeholder="
                Max price
              "

              value={maxPrice}

              onChange={(e) =>

                setMaxPrice(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            />

            {/* SORT */}

            <select

              value={sortOption}

              onChange={(e) =>

                setSortOption(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option value="newest">
                Newest
              </option>

              <option value="cheapest">
                Cheapest
              </option>

              <option value="expensive">
                Most Expensive
              </option>

            </select>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div
            className="
              flex
              justify-center
              py-24
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
          properties.length === 0 && (

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

              No properties found

            </h2>

            <p
              className="
                text-gray-500
              "
            >

              Try adjusting your
              filters or search.

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
              xl:grid-cols-3
              gap-8
            "
          >

            {properties.map(
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

                  featured={
                    property.featured
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