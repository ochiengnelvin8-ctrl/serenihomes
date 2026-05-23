'use client'

import { useState } from 'react'
import PropertyCard from './PropertyCard'

type Property = {
  id: string
  title: string
  description: string
  location: string
  price: string
  image_url: string
  category: string
}

export default function PropertySearch({
  properties
}: {
  properties: Property[]
}) {

  const [search, setSearch] =
    useState('')

  const [category, setCategory] =
    useState('All')

  // FILTER PROPERTIES
  const filteredProperties =
    properties.filter((property) => {

      const matchesSearch =

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

      const matchesCategory =

        category === 'All'
          ? true
          : property.category === category

      return (
        matchesSearch &&
        matchesCategory
      )
    })

  return (

    <div>

      {/* SEARCH + FILTERS */}

      <div className="bg-white p-6 rounded-3xl shadow-lg mb-10">

        <div className="grid md:grid-cols-2 gap-6">

          {/* SEARCH INPUT */}

          <input
            type="text"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-4 w-full"
          />

          {/* CATEGORY FILTER */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-4 w-full"
          >

            <option value="All">
              All Categories
            </option>

            <option value="Rental">
              Rental
            </option>

            <option value="Sale">
              Sale
            </option>

          </select>

        </div>

      </div>

      {/* RESULTS */}

      {filteredProperties.length === 0 && (

        <div className="text-center text-gray-500 text-xl">

          No matching properties found.

        </div>

      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {filteredProperties.map((property) => (

          <PropertyCard
  key={property.id}
  id={property.id}
  title={property.title}
  description={property.description}
  location={property.location}
  price={property.price}
  image_url={property.image_url}
  category={property.category}
/>

        ))}

      </div>

    </div>
  )
}