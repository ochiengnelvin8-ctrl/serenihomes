"use client"

import {
  useEffect,
  useState,
} from "react"

import Image from "next/image"

import { useParams }
from "next/navigation"

import {
  Bath,
  BedDouble,
  Eye,
  MapPin,
  Phone,
  Share2,
  Star,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

import PropertyGallery
from "@/components/PropertyGallery"

import PropertyMap
from "@/components/PropertyMap"

import FavoriteButton
from "@/components/FavoriteButton"

import ChatBox
from "@/components/ChatBox"

import ReviewForm
from "@/components/ReviewForm"

import ReviewsList
from "@/components/ReviewsList"

import BookingForm
from "@/components/BookingForm"

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

  landlord_phone?: string

  featured?: boolean

  views?: number

  user_id?: string
}

interface PropertyImage {

  id: string

  image_url: string
}

interface Review {

  id: string

  user_name: string

  rating: number

  comment: string

  created_at: string
}

export default function
PropertyDetailsPage() {

  const params =
    useParams()

  const propertyId =
    params.id as string

  const [
    property,
    setProperty,
  ] = useState<Property | null>(
    null
  )

  const [
    galleryImages,
    setGalleryImages,
  ] = useState<string[]>([])

  const [
    reviews,
    setReviews,
  ] = useState<Review[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // FETCH PROPERTY

  async function fetchProperty() {

    try {

      setLoading(true)

      const {
        data,
        error,
      } = await supabase

        .from("properties")

        .select("*")

        .eq(
          "id",
          propertyId
        )

        .single()

      if (error) {

        console.error(error)

        return
      }

      setProperty(data)

      // UPDATE VIEWS

      await supabase

        .from("properties")

        .update({

          views:
            (data.views || 0) + 1,
        })

        .eq(
          "id",
          data.id
        )

      // FETCH GALLERY

      const {
        data: imagesData,
      } = await supabase

        .from(
          "property_images"
        )

        .select("*")

        .eq(
          "property_id",
          propertyId
        )

      if (imagesData) {

        const images =
          imagesData.map(
            (
              image:
              PropertyImage
            ) =>
              image.image_url
          )

        setGalleryImages(
          images
        )
      }

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // FETCH REVIEWS

  async function fetchReviews() {

    try {

      const {
        data,
        error,
      } = await supabase

        .from("reviews")

        .select("*")

        .eq(
          "property_id",
          propertyId
        )

        .order(
          "created_at",
          {
            ascending: false,
          }
        )

      if (error) {

        console.error(error)

        return
      }

      setReviews(
        data || []
      )

    } catch (error) {

      console.error(error)
    }
  }

  useEffect(() => {

    if (propertyId) {

      fetchProperty()

      fetchReviews()
    }

  }, [propertyId])

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
            text-4xl
            font-black
            text-orange-500
          "
        >

          Loading...

        </h1>

      </main>
    )
  }

  if (!property) {

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
            text-4xl
            font-black
          "
        >

          Property Not Found

        </h1>

      </main>
    )
  }

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        pb-20
      "
    >

      {/* HERO */}

      <section
        className="
          relative
          h-[500px]
          overflow-hidden
        "
      >

        <Image

          src={
            property.image_url ||
            "/placeholder.jpg"
          }

          alt={property.title}

          fill

          className="
            object-cover
          "
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-black/40
          "
        />

        {/* FEATURED */}

        {property.featured && (

          <div
            className="
              absolute
              top-8
              left-8
              bg-orange-500
              text-white
              px-5
              py-3
              rounded-full
              font-bold
              flex
              items-center
              gap-2
              z-20
            "
          >

            <Star size={18} />

            Featured Property

          </div>
        )}

        {/* ACTIONS */}

        <div
          className="
            absolute
            top-8
            right-8
            flex
            items-center
            gap-4
            z-20
          "
        >

          <button
            className="
              bg-white
              p-4
              rounded-full
              shadow-lg
            "
          >

            <Share2
              size={22}
            />

          </button>

          <FavoriteButton
            propertyId={
              property.id
            }
          />

        </div>

        {/* CONTENT */}

        <div
          className="
            absolute
            bottom-10
            left-10
            text-white
            z-20
            max-w-4xl
          "
        >

          <h1
            className="
              text-6xl
              font-black
              mb-5
            "
          >

            {property.title}

          </h1>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-6
              text-xl
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <MapPin
                size={24}
              />

              {property.location}

            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <Eye
                size={24}
              />

              {property.views || 0}
              views

            </div>

          </div>

        </div>

      </section>

      {/* MAIN */}

      <section
        className="
          px-6
          py-14
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-3
            gap-10
          "
        >

          {/* LEFT */}

          <div
            className="
              lg:col-span-2
              space-y-10
            "
          >

            {/* DETAILS */}

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
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                  mb-8
                "
              >

                <div>

                  <span
                    className="
                      inline-block
                      bg-orange-100
                      text-orange-600
                      px-4
                      py-2
                      rounded-full
                      font-semibold
                      mb-4
                    "
                  >

                    {property.category}

                  </span>

                  <h2
                    className="
                      text-5xl
                      font-black
                    "
                  >

                    Ksh {property.price}

                    <span
                      className="
                        text-2xl
                        text-gray-500
                        ml-2
                      "
                    >

                      / month

                    </span>

                  </h2>

                </div>

                <div
                  className="
                    flex
                    gap-8
                  "
                >

                  <div
                    className="
                      text-center
                    "
                  >

                    <BedDouble
                      size={34}
                      className="
                        mx-auto
                        text-orange-500
                        mb-2
                      "
                    />

                    <h3
                      className="
                        text-2xl
                        font-black
                      "
                    >

                      {
                        property.bedrooms
                      }

                    </h3>

                    <p
                      className="
                        text-gray-500
                      "
                    >

                      Bedrooms

                    </p>

                  </div>

                  <div
                    className="
                      text-center
                    "
                  >

                    <Bath
                      size={34}
                      className="
                        mx-auto
                        text-orange-500
                        mb-2
                      "
                    />

                    <h3
                      className="
                        text-2xl
                        font-black
                      "
                    >

                      {
                        property.bathrooms
                      }

                    </h3>

                    <p
                      className="
                        text-gray-500
                      "
                    >

                      Bathrooms

                    </p>

                  </div>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div>

                <h3
                  className="
                    text-3xl
                    font-bold
                    mb-5
                  "
                >

                  Description

                </h3>

                <p
                  className="
                    text-gray-600
                    leading-relaxed
                    text-lg
                  "
                >

                  {
                    property.description
                  }

                </p>

              </div>

            </div>

            {/* GALLERY */}

            {galleryImages.length > 0 && (

              <div
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-md
                "
              >

                <h3
                  className="
                    text-3xl
                    font-bold
                    mb-6
                  "
                >

                  Property Gallery

                </h3>

                <PropertyGallery

                  mainImage={
                    property.image_url
                  }

                  galleryImages={
                    galleryImages
                  }

                />

              </div>
            )}

            {/* MAP */}

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-md
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-6
                "
              >

                Location

              </h3>

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
                p-8
                shadow-md
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-8
                "
              >

                Reviews

              </h3>

              <ReviewForm

                propertyId={
                  property.id
                }

                onReviewAdded={
                  fetchReviews
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

          <div
            className="
              space-y-8
            "
          >

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

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-8
                "
              >

                Contact Landlord

              </h3>

              <a

                href={`tel:${property.landlord_phone}`}

                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  py-5
                  rounded-2xl
                  font-bold
                  text-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition
                  mb-5
                "
              >

                <Phone
                  size={24}
                />

                Call Landlord

              </a>

              <ChatBox

                receiverId={
                  property.id
                }

                propertyId={
                  property.id
                }

              />

              {/* BOOKING FORM */}

              <div
                className="
                  mt-10
                  pt-8
                  border-t
                "
              >

                <h3
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >

                  Request Booking

                </h3>

                <BookingForm

                  propertyId={
                    property.id
                  }

                  landlordId={
                    property.user_id || ""
                  }

                />

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}