import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"

import ReviewsList
from "@/components/ReviewsList"

import FavoriteButton
from "@/components/FavoriteButton"

interface PageProps {

  params: Promise<{
    id: string
  }>
}

export default async function PropertyDetailsPage({
  params,
}: PageProps) {

  const { id } = await params

  // FETCH PROPERTY

  const {
    data: property,
    error,
  } =
    await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single()

  // FETCH REVIEWS

  const {
    data: reviews,
  } =
    await supabase
      .from("reviews")
      .select("*")
      .eq(
        "property_id",
        id
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      )

  // PROPERTY NOT FOUND

  if (
    error ||
    !property
  ) {

    return (

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-orange-50
        "
      >

        <div className="text-center">

          <h1
            className="
              text-5xl
              font-bold
              text-red-500
              mb-5
            "
          >

            Property Not Found

          </h1>

          <Link
            href="/properties"

            className="
              text-orange-500
              font-semibold
              text-lg
            "
          >

            ← Back to Properties

          </Link>

        </div>

      </main>
    )
  }

  return (

    <main className="min-h-screen bg-orange-50">

      {/* HERO SECTION */}

      <section
        className="
          relative
          h-[500px]
          w-full
        "
      >

        {/* IMAGE */}

        <Image
          src={
            property.image_url ||

            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1600&auto=format&fit=crop"
          }

          alt={property.title}

          fill

          priority

          className="object-cover"
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-black/50
          "
        />

        {/* FAVORITE BUTTON */}

        <div
          className="
            absolute
            top-6
            right-6
            z-20
          "
        >

          <FavoriteButton
            propertyId={property.id}
          />

        </div>

        {/* CONTENT */}

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            z-10
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              pb-10
              text-white
            "
          >

            <div
              className="
                inline-block
                bg-orange-500
                px-4
                py-2
                rounded-full
                font-semibold
                mb-5
              "
            >

              {property.category ||
                "Property"}

            </div>

            <h1
              className="
                text-5xl
                md:text-6xl
                font-extrabold
                mb-5
              "
            >

              {property.title}

            </h1>

            <p
              className="
                text-xl
                md:text-2xl
                text-orange-100
              "
            >

              📍 {property.location}

            </p>

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-12
          grid
          lg:grid-cols-3
          gap-10
        "
      >

        {/* LEFT SIDE */}

        <div
          className="
            lg:col-span-2
            space-y-10
          "
        >

          {/* DESCRIPTION */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
                text-gray-800
              "
            >

              Description

            </h2>

            <p
              className="
                text-gray-700
                leading-8
                text-lg
              "
            >

              {property.description}

            </p>

          </div>

          {/* DETAILS */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-8
                text-gray-800
              "
            >

              Property Details

            </h2>

            <div
              className="
                grid
                md:grid-cols-2
                gap-6
              "
            >

              {/* BEDROOMS */}

              <div
                className="
                  bg-orange-50
                  p-6
                  rounded-2xl
                "
              >

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >

                  Bedrooms

                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                  "
                >

                  {property.bedrooms || 0}

                </h3>

              </div>

              {/* BATHROOMS */}

              <div
                className="
                  bg-orange-50
                  p-6
                  rounded-2xl
                "
              >

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >

                  Bathrooms

                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                  "
                >

                  {property.bathrooms || 0}

                </h3>

              </div>

              {/* TYPE */}

              <div
                className="
                  bg-orange-50
                  p-6
                  rounded-2xl
                "
              >

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >

                  Property Type

                </p>

                <h3
                  className="
                    text-2xl
                    font-bold
                  "
                >

                  {property.type ||
                    "House"}

                </h3>

              </div>

              {/* STATUS */}

              <div
                className="
                  bg-orange-50
                  p-6
                  rounded-2xl
                "
              >

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >

                  Status

                </p>

                <h3
                  className="
                    text-2xl
                    font-bold
                    text-green-600
                  "
                >

                  {property.status ||
                    "Available"}

                </h3>

              </div>

            </div>

          </div>

          {/* REVIEWS */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
                mb-8
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  text-gray-800
                "
              >

                Reviews

              </h2>

              <div
                className="
                  bg-orange-100
                  text-orange-600
                  px-4
                  py-2
                  rounded-full
                  font-semibold
                "
              >

                {reviews?.length || 0}
                {" "}
                Reviews

              </div>

            </div>

            <ReviewsList
              reviews={
                reviews || []
              }
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-8">

          {/* PRICE CARD */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
              sticky
              top-28
            "
          >

            <h2
              className="
                text-5xl
                font-extrabold
                text-orange-500
                mb-2
              "
            >

              Ksh {property.price}

            </h2>

            <p
              className="
                text-gray-500
                mb-8
              "
            >

              Per Month

            </p>

            {/* CHAT */}

            <Link
              href={`/chat/${property.user_id}`}

              className="
                block
                w-full
                bg-orange-500
                hover:bg-orange-600
                text-white
                text-center
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
                mb-4
              "
            >

              Chat with Landlord

            </Link>

            {/* CALL */}

            <a
              href={`tel:${
                property.phone ||
                "+254700000000"
              }`}

              className="
                block
                w-full
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                text-center
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
                mb-4
              "
            >

              Call Landlord

            </a>

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${
                property.whatsapp ||
                "254700000000"
              }`}

              target="_blank"

              className="
                block
                w-full
                bg-green-500
                hover:bg-green-600
                text-white
                text-center
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
              "
            >

              WhatsApp Landlord

            </a>

          </div>

        </div>

      </section>

    </main>
  )
}