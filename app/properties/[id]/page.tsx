"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Eye,
  Phone,
  Star,
} from "lucide-react"

import { useParams }
from "next/navigation"

import { supabase }
from "@/lib/supabase"

import FavoriteButton
from "@/components/FavoriteButton"

import ReviewForm
from "@/components/ReviewForm"

import ReviewsList
from "@/components/ReviewsList"

import PropertyGallery
from "@/components/PropertyGallery"

import PropertyMap
from "@/components/PropertyMap"

import BookingForm
from "@/components/BookingForm"

import ChatBox
from "@/components/ChatBox"

interface Property {

  id: string

  user_id: string

  title: string

  description: string

  location: string

  price: string

  image_url: string

  category: string

  featured?: boolean

  bedrooms?: number

  bathrooms?: number

  views?: number

  landlord_phone?: string

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

export default function
PropertyDetailsPage() {

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
    reviews,
    setReviews,
  ] = useState<Review[]>([])

  const [
    galleryImages,
    setGalleryImages,
  ] = useState<string[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // FETCH PROPERTY

  async function fetchProperty() {

    try {

      setLoading(true)

      // PROPERTY

      const {
        data,
        error,
      } = await supabase

        .from("properties")

        .select("*")

        .eq("id", id)

        .single()

      if (error) {

        console.error(error)

        return
      }

      setProperty(data)

      // REVIEWS

      const {
        data: reviewsData,
      } = await supabase

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
      } = await supabase

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

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // INCREMENT VIEWS

  async function incrementViews() {

    const {
      data,
    } = await supabase

      .from("properties")

      .select("views")

      .eq("id", id)

      .single()

    if (!data)
      return

    const currentViews =

      data.views || 0

    await supabase

      .from("properties")

      .update({
        views:
          currentViews + 1,
      })

      .eq("id", id)
  }

  useEffect(() => {

    if (id) {

      fetchProperty()

      incrementViews()
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
            mb-5
          "
        >

          Property Not Found

        </h1>

        <Link

          href="/properties"

          className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-7
            py-4
            rounded-2xl
            font-bold
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
            text-orange-500
            hover:text-orange-600
            font-semibold
            mb-8
          "
        >

          <ArrowLeft
            size={22}
          />

          Back to Properties

        </Link>

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-8
          "
        >

          <div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
                mb-4
              "
            >

              <h1
                className="
                  text-5xl
                  font-extrabold
                "
              >

                {
                  property.title
                }

              </h1>

              {property.featured && (

                <div
                  className="
                    bg-yellow-400
                    text-black
                    px-4
                    py-2
                    rounded-full
                    font-bold
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Star
                    size={18}
                  />

                  Featured

                </div>
              )}

            </div>

            <div
              className="
                flex
                items-center
                gap-3
                text-gray-600
                text-lg
              "
            >

              <MapPin
                size={22}
              />

              {
                property.location
              }

            </div>

          </div>

          <div
            className="
              flex
              items-center
              gap-5
              flex-wrap
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

              Ksh {
                property.price
              }

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

        {/* MAIN CONTENT */}

        <div
          className="
            grid
            lg:grid-cols-3
            gap-10
            mt-12
          "
        >

          {/* LEFT SECTION */}

          <div
            className="
              lg:col-span-2
            "
          >

            {/* PROPERTY DETAILS */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-8
                mb-10
              "
            >

              {/* STATS */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-4
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

                  {
                    property.category
                  }

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
                    property.bedrooms || 0
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

                  <Bath
                    size={20}
                  />

                  {
                    property.bathrooms || 0
                  } Bathrooms

                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-blue-100
                    text-blue-600
                    px-5
                    py-3
                    rounded-2xl
                    font-semibold
                  "
                >

                  <Eye
                    size={20}
                  />

                  {
                    property.views || 0
                  } Views

                </div>

              </div>

              {/* DESCRIPTION */}

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

            {/* MAP */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-8
                mb-10
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  mb-8
                "
              >

                Property Location

              </h2>

              <PropertyMap
                location={
                  property.location
                }
              />

            </div>

            {/* REVIEWS */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-8
                mb-10
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

            {/* BOOKING FORM */}

            <div
              className="
                mb-10
              "
            >

              <BookingForm
                propertyId={
                  property.id
                }
              />

            </div>

            {/* REALTIME CHAT */}

            <ChatBox

              propertyId={
                property.id
              }

              receiverId={
                property.user_id
              }

            />

          </div>

          {/* SIDEBAR */}

          <div>

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

                Contact the landlord
                directly to schedule a
                viewing or ask
                questions.

              </p>

              {/* CALL BUTTON */}

              <a

                href={`tel:${property.landlord_phone}`}

                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  py-4
                  rounded-2xl
                  font-bold
                  text-lg
                  transition
                  mb-5
                "
              >

                <Phone
                  size={22}
                />

                Call Landlord

              </a>

              {/* WHATSAPP */}

              <a

                href={`https://wa.me/${property.landlord_phone?.replace(
                  /\+/g,
                  ""
                )}?text=${encodeURIComponent(
                  `Hello, I am interested in ${property.title}`
                )}`}

                target="_blank"

                rel="noopener noreferrer"

                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-green-500
                  hover:bg-green-600
                  text-white
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

        </div>

      </div>

    </main>
  )
}