import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  MapPin,
  BedDouble,
  Bath,
  ArrowLeft,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

import ReviewsList
from "@/components/ReviewsList"

import ReviewForm
from "@/components/ReviewForm"

import FavoriteButton
from "@/components/FavoriteButton"

import PropertyGallery
from "@/components/PropertyGallery"

interface PageProps {

  params: Promise<{
    id: string
  }>
}

export default async function PropertyPage({
  params,
}: PageProps) {

  const { id } =
    await params

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

  if (
    error ||
    !property
  ) {

    notFound()
  }

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

  // FETCH GALLERY IMAGES

  const {
    data: galleryImages,
  } =
    await supabase

      .from("property_images")

      .select("*")

      .eq(
        "property_id",
        id
      )

  // BUILD IMAGE ARRAY

  const images =

    galleryImages &&
    galleryImages.length > 0

      ? galleryImages.map(
          (img) =>
            img.image_url
        )

      : [
          property.image_url ||

          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop"
        ]

  // RELATED PROPERTIES

  const {
    data: relatedProperties,
  } =
    await supabase

      .from("properties")

      .select("*")

      .neq(
        "id",
        id
      )

      .eq(
        "category",
        property.category
      )

      .limit(3)

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        pb-20
      "
    >

      {/* TOP BAR */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          pt-8
          flex
          justify-between
          items-center
        "
      >

        <Link
          href="/properties"

          className="
            flex
            items-center
            gap-2
            text-orange-500
            font-semibold
            hover:underline
          "
        >

          <ArrowLeft size={20} />

          Back to Properties

        </Link>

        <FavoriteButton
          propertyId={property.id}
        />

      </div>

      {/* GALLERY */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pt-8
        "
      >

        <PropertyGallery
          images={images}
        />

      </section>

      {/* PROPERTY INFO */}

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

        {/* LEFT */}

        <div
          className="
            lg:col-span-2
          "
        >

          {/* TITLE */}

          <div
            className="
              mb-8
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                mb-4
              "
            >

              <span
                className="
                  bg-orange-500
                  text-white
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                "
              >

                {property.category}

              </span>

            </div>

            <h1
              className="
                text-5xl
                font-extrabold
                text-gray-900
                mb-4
              "
            >

              {property.title}

            </h1>

            <div
              className="
                flex
                items-center
                gap-2
                text-gray-600
                text-lg
              "
            >

              <MapPin
                size={20}
              />

              {property.location}

            </div>

          </div>

          {/* FEATURES */}

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
                md:grid-cols-3
                gap-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <BedDouble
                  size={32}
                  className="
                    text-orange-500
                  "
                />

                <div>

                  <p
                    className="
                      text-gray-500
                    "
                  >

                    Bedrooms

                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >

                    {property.bedrooms || 0}

                  </h3>

                </div>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <Bath
                  size={32}
                  className="
                    text-orange-500
                  "
                />

                <div>

                  <p
                    className="
                      text-gray-500
                    "
                  >

                    Bathrooms

                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >

                    {property.bathrooms || 0}

                  </h3>

                </div>

              </div>

              <div>

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >

                  Monthly Rent

                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                    text-orange-500
                  "
                >

                  Ksh {property.price}

                </h2>

              </div>

            </div>

          </div>

          {/* DESCRIPTION */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
              mb-10
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >

              Description

            </h2>

            <p
              className="
                text-gray-700
                leading-9
                text-lg
              "
            >

              {property.description}

            </p>

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

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >

              Reviews

            </h2>

            <ReviewForm
              propertyId={property.id}
            />

            <div
              className="
                mt-10
              "
            >

              <ReviewsList
                reviews={
                  reviews || []
                }
              />

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}

        <div>

          {/* CONTACT CARD */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
              sticky
              top-24
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >

              Interested?

            </h2>

            <p
              className="
                text-gray-600
                leading-8
                mb-8
              "
            >

              Contact the landlord
              today and schedule a
              property visit.

            </p>

            <button
              className="
                w-full
                bg-orange-500
                hover:bg-orange-600
                text-white
                py-5
                rounded-2xl
                font-bold
                text-lg
                transition
              "
            >

              Contact Landlord

            </button>

          </div>

        </div>

      </section>

      {/* RELATED PROPERTIES */}

      {relatedProperties &&
        relatedProperties.length > 0 && (

        <section
          className="
            max-w-7xl
            mx-auto
            px-6
            mt-10
          "
        >

          <h2
            className="
              text-4xl
              font-extrabold
              mb-10
            "
          >

            Similar Properties

          </h2>

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {relatedProperties.map(
              (related) => (

                <Link
                  key={related.id}

                  href={`/properties/${related.id}`}
                >

                  <div
                    className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      shadow-md
                      hover:shadow-xl
                      transition
                    "
                  >

                    <div
                      className="
                        relative
                        h-64
                      "
                    >

                      <Image
                        src={
                          related.image_url ||

                          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop"
                        }

                        alt={
                          related.title
                        }

                        fill

                        className="
                          object-cover
                        "
                      />

                    </div>

                    <div
                      className="
                        p-6
                      "
                    >

                      <h3
                        className="
                          text-2xl
                          font-bold
                          mb-3
                        "
                      >

                        {related.title}

                      </h3>

                      <p
                        className="
                          text-gray-500
                          mb-4
                        "
                      >

                        {related.location}

                      </p>

                      <p
                        className="
                          text-orange-500
                          text-3xl
                          font-extrabold
                        "
                      >

                        Ksh {related.price}

                      </p>

                    </div>

                  </div>

                </Link>
              )
            )}

          </div>

        </section>
      )}

    </main>
  )
}