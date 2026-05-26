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

  minPrice: string

  setMinPrice: (
    value: string
  ) => void

  maxPrice: string

  setMaxPrice: (
    value: string
  ) => void
}

export default function SearchFilters({

  search,
  setSearch,

  category,
  setCategory,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

}: Props) {

  return (

    <div
      className="
        bg-white
        p-6
        rounded-3xl
        shadow-md
        mb-10
      "
    >

      <div
        className="
          grid
          md:grid-cols-4
          gap-5
        "
      >

        {/* SEARCH */}

        <input
          type="text"

          placeholder="
          Search location or title
          "

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
            border
            rounded-2xl
            p-4
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
            rounded-2xl
            p-4
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

        {/* MIN PRICE */}

        <input
          type="number"

          placeholder="Min Price"

          value={minPrice}

          onChange={(e) =>
            setMinPrice(
              e.target.value
            )
          }

          className="
            border
            rounded-2xl
            p-4
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
            rounded-2xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />

      </div>

    </div>
  )
}