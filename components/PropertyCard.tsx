"use client"

import Image from "next/image"
import Link from "next/link"

import {
  BedDouble,
  Bath,
  MapPin,
  Heart,
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
}

export default function PropertyCard({

  id,

  title,

  description,

  location,

  price,

  image_url,

  category,

  bedrooms,

  bathrooms,

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
          hover:-translate-y-2
          group
        "
      >

        {/* IMAGE SECTION */}

        <div
          className="
            relative
            h-72
            w-full
            overflow-hidden
          "
        >

          <Image
            src={
              image_url ||

              "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop"
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

          {/* CATEGORY */}

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
              font-semibold
              shadow-md
            "
          >

            {category}

          </div>

          {/* HEART ICON */}

          <div
            className="
              absolute
              top-4
              right-4
              bg-white/90
              backdrop-blur-sm
              p-3
              rounded-full
              shadow-md
            "
          >

            <Heart
              size={20}
              className="
                text-orange-500
              "
            />

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
              text-gray-800
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

            <MapPin
              size={18}
            />

            <span>

              {location}

            </span>

          </div>

          {/* DESCRIPTION */}

          <p
            className="
              text-gray-600
              leading-7
              mb-6
              line-clamp-3
            "
          >

            {description}

          </p>

          {/* FEATURES */}

          <div
            className="
              flex
              items-center
              gap-6
              mb-6
            "
          >

            {/* BEDROOMS */}

            <div
              className="
                flex
                items-center
                gap-2
                text-gray-600
              "
            >

              <BedDouble
                size={20}
                className="
                  text-orange-500
                "
              />

              <span
                className="
                  font-medium
                "
              >

                {bedrooms || 0}
                {" "}
                Beds

              </span>

            </div>

            {/* BATHROOMS */}

            <div
              className="
                flex
                items-center
                gap-2
                text-gray-600
              "
            >

              <Bath
                size={20}
                className="
                  text-orange-500
                "
              />

              <span
                className="
                  font-medium
                "
              >

                {bathrooms || 0}
                {" "}
                Baths

              </span>

            </div>

          </div>

          {/* FOOTER */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              pt-5
            "
          >

            {/* PRICE */}

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Starting From

              </p>

              <h3
                className="
                  text-3xl
                  font-extrabold
                  text-orange-500
                "
              >

                Ksh {price}

              </h3>

            </div>

            {/* BUTTON */}

            <div
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

              View Details

            </div>

          </div>

        </div>

      </div>

    </Link>
  )
}