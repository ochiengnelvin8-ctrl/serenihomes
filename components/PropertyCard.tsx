"use client"

import Image from "next/image"

import Link from "next/link"

import {
  BedDouble,
  Bath,
  MapPin,
  Star,
} from "lucide-react"

interface PropertyCardProps {

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
}

export default function
PropertyCard({

  id,

  title,

  description,

  location,

  price,

  image_url,

  category,

  bedrooms,

  bathrooms,

  featured,
}: PropertyCardProps) {

  return (

    <Link
      href={`/properties/${id}`}
    >

      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-md
          hover:shadow-2xl
          transition
          duration-300
          group
        "
      >

        {/* IMAGE */}

        <div
          className="
            relative
            h-72
            overflow-hidden
          "
        >

          <Image

            src={
              image_url ||
              "/placeholder.jpg"
            }

            alt={title}

            fill

            className="
              object-cover
              group-hover:scale-110
              transition
              duration-500
            "
          />

          {/* FEATURED BADGE */}

          {featured && (

            <div
              className="
                absolute
                top-4
                left-4
                bg-orange-500
                text-white
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                shadow-lg
                z-10
                flex
                items-center
                gap-2
              "
            >

              <Star size={16} />

              Featured

            </div>
          )}

          {/* CATEGORY */}

          <div
            className="
              absolute
              bottom-4
              left-4
              bg-white/90
              backdrop-blur-md
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            "
          >

            {category}

          </div>

        </div>

        {/* CONTENT */}

        <div
          className="
            p-6
          "
        >

          {/* TITLE */}

          <h2
            className="
              text-2xl
              font-bold
              mb-3
              line-clamp-1
            "
          >

            {title}

          </h2>

          {/* LOCATION */}

          <div
            className="
              flex
              items-center
              gap-2
              text-gray-500
              mb-4
            "
          >

            <MapPin size={18} />

            <span>

              {location}

            </span>

          </div>

          {/* DESCRIPTION */}

          <p
            className="
              text-gray-600
              line-clamp-2
              mb-6
            "
          >

            {description}

          </p>

          {/* DETAILS */}

          <div
            className="
              flex
              items-center
              gap-6
              mb-6
            "
          >

            {bedrooms && (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-600
                "
              >

                <BedDouble
                  size={18}
                />

                <span>

                  {bedrooms} Beds

                </span>

              </div>
            )}

            {bathrooms && (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-600
                "
              >

                <Bath size={18} />

                <span>

                  {bathrooms} Baths

                </span>

              </div>
            )}

          </div>

          {/* PRICE */}

          <div
            className="
              flex
              justify-between
              items-center
            "
          >

            <div>

              <span
                className="
                  text-3xl
                  font-black
                  text-orange-500
                "
              >

                Ksh {price}

              </span>

              <span
                className="
                  text-gray-500
                  ml-1
                "
              >

                / month

              </span>

            </div>

            <button
              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition
              "
            >

              View

            </button>

          </div>

        </div>

      </div>

    </Link>
  )
}