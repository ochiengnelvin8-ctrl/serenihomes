'use client'

import Link from 'next/link'

interface PropertyCardProps {

  property: {
    id: string
    title: string
    location: string
    price: string
    description: string
    image_url?: string
  }
}

export default function PropertyCard({
  property
}: PropertyCardProps) {

  return (

    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* PROPERTY IMAGE */}

      {property.image_url ? (

        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-64 object-cover"
        />

      ) : (

        <div className="w-full h-64 bg-orange-100 flex items-center justify-center text-orange-500 text-xl font-semibold">

          No Image Available

        </div>

      )}

      {/* PROPERTY DETAILS */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-orange-500 mb-3">

          {property.title}

        </h2>

        <p className="text-gray-600 mb-2">

          📍 {property.location}

        </p>

        <p className="text-2xl font-bold text-gray-800 mb-4">

          Ksh {property.price}

        </p>

        <p className="text-gray-500 mb-6 line-clamp-3">

          {property.description}

        </p>

        {/* ACTION BUTTONS */}

        <div className="flex gap-4">

          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-xl font-semibold transition"
          >

            View Property

          </Link>

          <button
            className="bg-orange-100 hover:bg-orange-200 text-orange-500 px-4 rounded-xl transition"
          >

            ❤️

          </button>

        </div>

      </div>

    </div>
  )
}