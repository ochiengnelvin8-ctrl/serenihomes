"use client"

interface Props {

  search: string

  setSearch: (
    value: string
  ) => void

  category: string

  setCategory: (
    value: string
  ) => void

  maxPrice: string

  setMaxPrice: (
    value: string
  ) => void

  location: string

  setLocation: (
    value: string
  ) => void
}

export default function SearchFilters({

  search,

  setSearch,

  category,

  setCategory,

  maxPrice,

  setMaxPrice,

  location,

  setLocation,

}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-md
        mb-10
      "
    >

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        {/* SEARCH */}

        <input
          type="text"

          placeholder="Search properties..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />

        {/* CATEGORY */}

        <select
          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }

          className="
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        >

          <option value="">
            All Categories
          </option>

          <option value="Apartment">
            Apartment
          </option>

          <option value="Bedsitter">
            Bedsitter
          </option>

          <option value="Maisonette">
            Maisonette
          </option>

          <option value="Villa">
            Villa
          </option>

        </select>

        {/* LOCATION */}

        <input
          type="text"

          placeholder="Location"

          value={location}

          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }

          className="
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />

        {/* MAX PRICE */}

        <input
          type="number"

          placeholder="Max Price"

          value={maxPrice}

          onChange={(e) =>
            setMaxPrice(
              e.target.value
            )
          }

          className="
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />

      </div>

    </div>
  )
}