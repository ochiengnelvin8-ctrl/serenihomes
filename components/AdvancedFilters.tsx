"use client"

interface AdvancedFiltersProps {

  search: string
  setSearch: (
    value: string
  ) => void

  location: string
  setLocation: (
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

  bedrooms: string
  setBedrooms: (
    value: string
  ) => void

  sortBy: string
  setSortBy: (
    value: string
  ) => void
}

export default function AdvancedFilters({

  search,
  setSearch,

  location,
  setLocation,

  category,
  setCategory,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

  bedrooms,
  setBedrooms,

  sortBy,
  setSortBy,

}: AdvancedFiltersProps) {

  function clearFilters() {

    setSearch("")
    setLocation("")
    setCategory("")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("")
    setSortBy("latest")
  }

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-6
        mb-10
      "
    >

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        {/* SEARCH */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Search

          </label>

          <input

            type="text"

            placeholder="
            Search properties...
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
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

        </div>

        {/* LOCATION */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Location

          </label>

          <input

            type="text"

            placeholder="
            Nairobi, Kisumu...
            "

            value={location}

            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

        </div>

        {/* CATEGORY */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Category

          </label>

          <select

            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
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

            <option value="Studio">
              Studio
            </option>

            <option value="Maisonette">
              Maisonette
            </option>

            <option value="Villa">
              Villa
            </option>

          </select>

        </div>

        {/* BEDROOMS */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Bedrooms

          </label>

          <select

            value={bedrooms}

            onChange={(e) =>
              setBedrooms(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          >

            <option value="">
              Any Bedrooms
            </option>

            <option value="1">
              1 Bedroom
            </option>

            <option value="2">
              2 Bedrooms
            </option>

            <option value="3">
              3 Bedrooms
            </option>

            <option value="4">
              4+ Bedrooms
            </option>

          </select>

        </div>

        {/* MIN PRICE */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Min Price

          </label>

          <input

            type="number"

            placeholder="
            Minimum price
            "

            value={minPrice}

            onChange={(e) =>
              setMinPrice(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

        </div>

        {/* MAX PRICE */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Max Price

          </label>

          <input

            type="number"

            placeholder="
            Maximum price
            "

            value={maxPrice}

            onChange={(e) =>
              setMaxPrice(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

        </div>

        {/* SORT */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
              text-gray-700
            "
          >

            Sort By

          </label>

          <select

            value={sortBy}

            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          >

            <option value="latest">
              Latest Listings
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="bedrooms">
              Most Bedrooms
            </option>

            <option value="views">
              Most Viewed
            </option>

            <option value="featured">
              Featured First
            </option>

          </select>

        </div>

        {/* CLEAR BUTTON */}

        <div
          className="
            flex
            items-end
          "
        >

          <button

            onClick={clearFilters}

            className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              rounded-2xl
              p-4
              font-bold
              transition
            "
          >

            Clear Filters

          </button>

        </div>

      </div>

    </div>
  )
}