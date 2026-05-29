"use client"

import Link from "next/link"

import Image from "next/image"

import {
  Bath,
  BedDouble,
  Eye,
  Heart,
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

  category?: string

  bedrooms?: number

  bathrooms?: number

  views?: number

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

  views,

  featured,
}: PropertyCardProps) {

  return (

    <Link
      href={`/properties/${id}`}
      className="
        group
        block
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-md
          hover:shadow-2xl
          transition-all
          duration-300
          hover:-translate-y-2
          border
          border-orange-100
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
              transition-transform
              duration-500
            "
          />

          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/50
              via-transparent
              to-transparent
            "
          />

          {/* FEATURED BADGE */}

          {featured && (

            <div
              className="
                absolute
                top-4
                left-4
                bg-gradient-to-r
                from-yellow-400
                to-orange-500
                text-white
                px-4
                py-2
                rounded-full
                font-bold
                shadow-lg
                flex
                items-center
                gap-2
                z-20
              "
            >

              <Star size={16} />

              Featured

            </div>
          )}

          {/* CATEGORY */}

          {category && (

            <div
              className="
                absolute
                bottom-4
                left-4
                bg-white/90
                backdrop-blur-md
                text-gray-900
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                shadow-md
              "
            >

              {category}

            </div>
          )}

          {/* FAVORITE */}

          <button
            className="
              absolute
              top-4
              right-4
              bg-white/90
              hover:bg-white
              p-3
              rounded-full
              shadow-lg
              transition
              z-20
            "
          >

            <Heart
              size={20}
              className="
                text-red-500
              "
            />

          </button>

        </div>

        {/* CONTENT */}

        <div
          className="
            p-7
          "
        >

          {/* TITLE */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
              mb-4
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-gray-900
                line-clamp-1
                group-hover:text-orange-500
                transition
              "
            >

              {title}

            </h2>

            <div
              className="
                text-right
                shrink-0
              "
            >

              <h3
                className="
                  text-2xl
                  font-black
                  text-orange-500
                "
              >

                Ksh {price}

              </h3>

              <span
                className="
                  text-gray-500
                  text-sm
                "
              >

                / month

              </span>

            </div>

          </div>

          {/* LOCATION */}

          <div
            className="
              flex
              items-center
              gap-2
              text-gray-500
              mb-5
            "
          >

            <MapPin
              size={18}
            />

            <span
              className="
                line-clamp-1
              "
            >

              {location}

            </span>

          </div>

          {/* DESCRIPTION */}

          <p
            className="
              text-gray-600
              leading-relaxed
              mb-6
              line-clamp-2
            "
          >

            {description}

          </p>

          {/* DETAILS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
              pt-5
              border-t
            "
          >

            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              {bedrooms !== undefined && (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-700
                    font-medium
                  "
                >

                  <BedDouble
                    size={20}
                    className="
                      text-orange-500
                    "
                  />

                  {bedrooms}

                </div>
              )}

              {bathrooms !== undefined && (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-700
                    font-medium
                  "
                >

                  <Bath
                    size={20}
                    className="
                      text-orange-500
                    "
                  />

                  {bathrooms}

                </div>
              )}

            </div>

            {/* VIEWS */}

            <div
              className="
                flex
                items-center
                gap-2
                text-gray-500
                font-medium
              "
            >

              <Eye
                size={18}
              />

              {views || 0}

            </div>

          </div>

        </div>

      </div>

    </Link>
  )
}