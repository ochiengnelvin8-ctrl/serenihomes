"use client"

import {
  useEffect,
  useState,
} from "react"

import Image from "next/image"

import Link from "next/link"

import {
  MapPin,
  BedDouble,
  Bath,
  ArrowLeft,
} from "lucide-react"

import { useParams }
from "next/navigation"

import { supabase }
from "@/lib/supabase"

import ReviewForm
from "@/components/ReviewForm"

import ReviewsList
from "@/components/ReviewsList"

import FavoriteButton
from "@/components/FavoriteButton"

import PropertyGallery
from "@/components/PropertyGallery"

interface Property {

  id: string

  title: string

  description: string

  location: string

  price: string

  image_url: string

  category: string

  bedrooms?: number

  bathrooms?: number

  created_at?: string
}

interface Review {

  id: string

  rating: number

  comment: string

  created_at: string

  profiles?: {

    full_name?: string
  }
}

export default function PropertyDetailsPage() {

  const params =
    useParams()

  const id =
    params.id as string

  const [
    property,
    setProperty,
  ] = useState<Property | null>(
    null
  )

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    reviews,
    setReviews,
  ] = useState<Review[]>([])

  const [
    galleryImages,
    setGalleryImages,
  ] = useState<string[]>([])

  // FETCH PROPERTY

  async function fetchProperty() {

    setLoading(true)

    // PROPERTY

    const {
      data,
      error,
    } =
      await supabase

        .from("properties")

        .select("*")

        .eq("id", id)

        .single()

    if (error) {

      console.error(error)

      setLoading(false)

      return
    }

    setProperty(data)

    // REVIEWS

    const {
      data: reviewsData,
    } =
      await supabase

        .from("reviews")

        .select(`
          *,
          profiles (
            full_name
          )
        `)

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

    setReviews(
      reviewsData || []
    )

    // GALLERY IMAGES

    const {
      data: galleryData,
    } =
      await supabase

        .from(
          "property_images"
        )

        .select("*")

        .eq(
          "property_id",
          id
        )

    if (galleryData) {

      setGalleryImages(

        galleryData.map(
          (item) =>

            item.image_url
        )
      )
    }

    setLoading(false)
  }

  useEffect(() => {

    if (id) {

      fetchProperty()
    }

  }, [id])

  // LOADING

  if (loading) {

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

        <h1
          className="
            text-3xl
            font-bold
            text-orange-500
          "
        >

          Loading property...

        </h1>

      </main>
    )
  }

  // NOT FOUND

  if (!property) {

    return (

      <main
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          bg-orange-50
          px-6
        "
      >

        <h1
          className="
            text-5xl
            font-extrabold
            mb-4
          "
        >

          Property Not Found

        </h1>

        <Link
          href="/properties"

          className="
            mt-5
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-6
            py-4
            rounded-2xl
            font-semibold
            transition
          "
        >

          Back to Properties

        </Link>

      </main>
    )
  }

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        px-6
        py-10
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* BACK BUTTON */}

        <Link
          href="/properties"

          className="
            inline-flex
            items-center
            gap-3
            mb-8
            text-orange-500
            hover:text-orange-600
            font-semibold
          "
        >

          <ArrowLeft size={22} />

          Back to Properties

        </Link>

        {/* TITLE */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-8
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-extrabold
                mb-4
              "
            >

              {property.title}

            </h1>

            <div
              className="
                flex
                items-center
                gap-3
                text-gray-600
                text-lg
              "
            >

              <MapPin size={22} />

              {property.location}

            </div>

          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <FavoriteButton
              propertyId={
                property.id
              }
            />

            <div
              className="
                text-4xl
                font-extrabold
                text-orange-500
              "
            >

              Ksh {property.price}

            </div>

          </div>

        </div>

        {/* GALLERY */}

        <PropertyGallery

          mainImage={
            property.image_url
          }

          galleryImages={
            galleryImages
          }

        />

        {/* DETAILS */}

        <div
          className="
            grid
            lg:grid-cols-3
            gap-10
            mt-12
          "
        >

          {/* LEFT */}

          <div
            className="
              lg:col-span-2
            "
          >

            {/* PROPERTY INFO */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-8
                mb-10
              "
            >

              <div
                className="
                  flex
                  flex-wrap
                  gap-5
                  mb-8
                "
              >

                <div
                  className="
                    bg-orange-100
                    text-orange-600
                    px-5
                    py-3
                    rounded-2xl
                    font-semibold
                  "
                >

                  {property.category}

                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-gray-100
                    px-5
                    py-3
                    rounded-2xl
                  "
                >

                  <BedDouble
                    size={20}
                  />

                  {
                    property.bedrooms
                  } Bedrooms

                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-gray-100
                    px-5
                    py-3
                    rounded-2xl
                  "
                >

                  <Bath size={20} />

                  {
                    property.bathrooms
                  } Bathrooms

                </div>

              </div>

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
                  leading-8
                  text-lg
                "
              >

                {
                  property.description
                }

              </p>

            </div>

            {/* REVIEWS */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-8
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
                propertyId={
                  property.id
                }

                onReviewAdded={
                  fetchProperty
                }
              />

              <div
                className="
                  mt-10
                "
              >

                <ReviewsList
                  reviews={
                    reviews
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
                shadow-md
                p-8
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
                  leading-7
                  mb-8
                "
              >

                Contact the landlord to
                schedule a viewing or
                ask questions about this
                property.

              </p>

              <button
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  py-4
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

        </div>

      </div>

    </main>
  )
}