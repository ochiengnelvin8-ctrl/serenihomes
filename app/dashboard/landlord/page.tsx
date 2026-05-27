"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import {
  Plus,
  Trash2,
  Pencil,
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Star,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

import PropertyImageUploader
from "@/components/PropertyImageUploader"

interface Property {

  id: string

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

  created_at?: string
}

export default function
LandlordDashboardPage() {

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    userId,
    setUserId,
  ] = useState<string>("")

  // FETCH USER + PROPERTIES

  async function fetchProperties() {

    try {

      setLoading(true)

      // CURRENT USER

      const {
        data: authData,
      } =
        await supabase.auth.getUser()

      const currentUser =

        authData.user

      if (!currentUser) {

        setLoading(false)

        return
      }

      setUserId(
        currentUser.id
      )

      // FETCH LANDLORD PROPERTIES

      const {
        data,
        error,
      } = await supabase

        .from("properties")

        .select("*")

        .eq(
          "user_id",
          currentUser.id
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

      setProperties(
        data || []
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // DELETE PROPERTY

  async function deleteProperty(
    propertyId: string
  ) {

    const confirmed =

      confirm(
        "Are you sure you want to delete this property?"
      )

    if (!confirmed)
      return

    try {

      const {
        error,
      } = await supabase

        .from("properties")

        .delete()

        .eq(
          "id",
          propertyId
        )

      if (error) {

        console.error(error)

        alert(
          "Failed to delete property"
        )

        return
      }

      setProperties(
        (
          prev
        ) =>
          prev.filter(
            (property) =>
              property.id !==
              propertyId
          )
      )

      alert(
        "Property deleted successfully"
      )

    } catch (error) {

      console.error(error)
    }
  }

  // TOGGLE FEATURED

  async function toggleFeatured(
    propertyId: string,
    currentValue: boolean
  ) {

    try {

      const {
        error,
      } = await supabase

        .from("properties")

        .update({
          featured:
            !currentValue,
        })

        .eq(
          "id",
          propertyId
        )

      if (error) {

        console.error(error)

        alert(
          "Failed to update featured status"
        )

        return
      }

      fetchProperties()

    } catch (error) {

      console.error(error)
    }
  }

  useEffect(() => {

    fetchProperties()

  }, [])

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

          Loading dashboard...

        </h1>

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

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
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

              Landlord Dashboard

            </h1>

            <p
              className="
                text-lg
                text-gray-600
              "
            >

              Manage your property
              listings and uploads.

            </p>

          </div>

          <Link

            href="/dashboard/landlord/add-property"

            className="
              inline-flex
              items-center
              gap-3
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

            <Plus size={22} />

            Add Property

          </Link>

        </div>

        {/* EMPTY */}

        {properties.length === 0 && (

          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-16
              text-center
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >

              No Properties Yet

            </h2>

            <p
              className="
                text-gray-600
                text-lg
                mb-8
              "
            >

              Start by adding your
              first property listing.

            </p>

            <Link

              href="/dashboard/landlord/add-property"

              className="
                inline-flex
                items-center
                gap-3
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

              <Plus size={22} />

              Add Property

            </Link>

          </div>
        )}

        {/* PROPERTY GRID */}

        {properties.length > 0 && (

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {properties.map(
              (property) => (

                <div

                  key={property.id}

                  className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    overflow-hidden
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      relative
                    "
                  >

                    <img

                      src={
                        property.image_url
                      }

                      alt={
                        property.title
                      }

                      className="
                        w-full
                        h-64
                        object-cover
                      "
                    />

                    {/* FEATURED BADGE */}

                    {property.featured && (

                      <div
                        className="
                          absolute
                          top-4
                          left-4
                          bg-yellow-400
                          text-black
                          px-4
                          py-2
                          rounded-full
                          font-bold
                          shadow-lg
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Star
                          size={16}
                        />

                        Featured

                      </div>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      p-6
                    "
                  >

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
                          font-bold
                        "
                      >

                        {
                          property.title
                        }

                      </h2>

                      <span
                        className="
                          bg-orange-100
                          text-orange-600
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          whitespace-nowrap
                        "
                      >

                        {
                          property.category
                        }

                      </span>

                    </div>

                    {/* LOCATION */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-gray-600
                        mb-4
                      "
                    >

                      <MapPin
                        size={18}
                      />

                      {
                        property.location
                      }

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

                      {
                        property.description
                      }

                    </p>

                    {/* PROPERTY INFO */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-4
                        mb-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          bg-gray-100
                          px-4
                          py-2
                          rounded-2xl
                        "
                      >

                        <BedDouble
                          size={18}
                        />

                        {
                          property.bedrooms || 0
                        } Beds

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          bg-gray-100
                          px-4
                          py-2
                          rounded-2xl
                        "
                      >

                        <Bath
                          size={18}
                        />

                        {
                          property.bathrooms || 0
                        } Baths

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          bg-blue-100
                          text-blue-600
                          px-4
                          py-2
                          rounded-2xl
                          font-semibold
                        "
                      >

                        <Eye
                          size={18}
                        />

                        {
                          property.views || 0
                        } Views

                      </div>

                    </div>

                    {/* PRICE */}

                    <div
                      className="
                        text-3xl
                        font-extrabold
                        text-orange-500
                        mb-8
                      "
                    >

                      Ksh {
                        property.price
                      }

                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4
                        mb-6
                      "
                    >

                      {/* EDIT */}

                      <Link

                        href={`/dashboard/landlord/edit/${property.id}`}

                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          bg-gray-900
                          hover:bg-black
                          text-white
                          py-4
                          rounded-2xl
                          font-semibold
                          transition
                        "
                      >

                        <Pencil
                          size={18}
                        />

                        Edit

                      </Link>

                      {/* DELETE */}

                      <button

                        onClick={() =>
                          deleteProperty(
                            property.id
                          )
                        }

                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          py-4
                          rounded-2xl
                          font-semibold
                          transition
                        "
                      >

                        <Trash2
                          size={18}
                        />

                        Delete

                      </button>

                    </div>

                    {/* FEATURE TOGGLE */}

                    <button

                      onClick={() =>
                        toggleFeatured(
                          property.id,
                          !!property.featured
                        )
                      }

                      className={`
                        w-full
                        py-4
                        rounded-2xl
                        font-bold
                        transition
                        mb-6

                        ${
                          property.featured

                            ? `
                              bg-yellow-400
                              text-black
                              hover:bg-yellow-500
                            `

                            : `
                              bg-orange-500
                              text-white
                              hover:bg-orange-600
                            `
                        }
                      `}
                    >

                      {property.featured

                        ? "Remove Featured"

                        : "Make Featured"}

                    </button>

                    {/* IMAGE UPLOADER */}

                    <div
                      className="
                        border-t
                        pt-6
                      "
                    >

                      <PropertyImageUploader

                        propertyId={
                          property.id
                        }

                        onUploadComplete={
                          fetchProperties
                        }

                      />

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </main>
  )
}