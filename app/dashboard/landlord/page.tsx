"use client"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

import {
  Building2,
  Eye,
  Heart,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Crown,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

import BoostListingButton
from "@/components/BoostListingButton"

interface Property {

  id: string

  title: string

  description: string

  location: string

  price: string

  image_url: string

  category: string

  featured?: boolean

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
    totalViews,
    setTotalViews,
  ] = useState(0)

  // FETCH PROPERTIES

  async function fetchProperties() {

    try {

      setLoading(true)

      const {
        data: authData,
      } =
        await supabase.auth.getUser()

      const user =
        authData.user

      if (!user)
        return

      const {
        data,
        error,
      } = await supabase

        .from("properties")

        .select("*")

        .eq(
          "user_id",
          user.id
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

      const sorted =
        (data || []).sort(

          (a, b) => {

            if (
              a.featured &&
              !b.featured
            ) return -1

            if (
              !a.featured &&
              b.featured
            ) return 1

            return 0
          }
        )

      setProperties(sorted)

      // TOTAL VIEWS

      const total =
        sorted.reduce(

          (
            acc,
            property
          ) =>

            acc +
            (
              property.views || 0
            ),

          0
        )

      setTotalViews(total)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // DELETE PROPERTY

  async function deleteProperty(
    id: string
  ) {

    const confirmed =
      confirm(
        "Delete this property?"
      )

    if (!confirmed)
      return

    try {

      const {
        error,
      } = await supabase

        .from("properties")

        .delete()

        .eq("id", id)

      if (error) {

        console.error(error)

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

  return (

    <main
      className="
        min-h-screen
        bg-orange-50
        px-6
        py-12
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
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-12
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-black
                mb-3
              "
            >

              Landlord Dashboard

            </h1>

            <p
              className="
                text-gray-600
                text-lg
              "
            >

              Manage your listings,
              bookings & analytics

            </p>

          </div>

          <Link

            href="/dashboard/add-property"

            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-8
              py-5
              rounded-2xl
              font-bold
              flex
              items-center
              gap-3
              transition
              shadow-lg
            "
          >

            <Plus size={24} />

            Add Property

          </Link>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mb-12
          "
        >

          {/* TOTAL PROPERTIES */}

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
                items-center
                justify-between
                mb-5
              "
            >

              <div
                className="
                  bg-orange-100
                  p-4
                  rounded-2xl
                "
              >

                <Building2
                  size={32}
                  className="
                    text-orange-500
                  "
                />

              </div>

            </div>

            <h2
              className="
                text-5xl
                font-black
                mb-2
              "
            >

              {
                properties.length
              }

            </h2>

            <p
              className="
                text-gray-500
                font-medium
              "
            >

              Total Properties

            </p>

          </div>

          {/* TOTAL VIEWS */}

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
                items-center
                justify-between
                mb-5
              "
            >

              <div
                className="
                  bg-blue-100
                  p-4
                  rounded-2xl
                "
              >

                <Eye
                  size={32}
                  className="
                    text-blue-500
                  "
                />

              </div>

            </div>

            <h2
              className="
                text-5xl
                font-black
                mb-2
              "
            >

              {totalViews}

            </h2>

            <p
              className="
                text-gray-500
                font-medium
              "
            >

              Property Views

            </p>

          </div>

          {/* FEATURED */}

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
                items-center
                justify-between
                mb-5
              "
            >

              <div
                className="
                  bg-yellow-100
                  p-4
                  rounded-2xl
                "
              >

                <Crown
                  size={32}
                  className="
                    text-yellow-500
                  "
                />

              </div>

            </div>

            <h2
              className="
                text-5xl
                font-black
                mb-2
              "
            >

              {

                properties.filter(
                  (
                    property
                  ) =>

                    property.featured
                ).length
              }

            </h2>

            <p
              className="
                text-gray-500
                font-medium
              "
            >

              Featured Listings

            </p>

          </div>

        </div>

        {/* PROPERTIES */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            overflow-hidden
          "
        >

          <div
            className="
              p-8
              border-b
            "
          >

            <h2
              className="
                text-3xl
                font-black
              "
            >

              Your Properties

            </h2>

          </div>

          {loading ? (

            <div
              className="
                p-20
                text-center
              "
            >

              <h3
                className="
                  text-3xl
                  font-black
                  text-orange-500
                "
              >

                Loading...

              </h3>

            </div>

          ) : properties.length === 0 ? (

            <div
              className="
                p-20
                text-center
              "
            >

              <h3
                className="
                  text-3xl
                  font-black
                  mb-4
                "
              >

                No Properties Yet

              </h3>

              <p
                className="
                  text-gray-500
                  mb-8
                "
              >

                Start by creating
                your first listing

              </p>

              <Link

                href="/dashboard/add-property"

                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-orange-500
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >

                <Plus size={22} />

                Add Property

              </Link>

            </div>

          ) : (

            <div
              className="
                divide-y
              "
            >

              {properties.map(
                (property) => (

                  <div

                    key={
                      property.id
                    }

                    className="
                      p-8
                      hover:bg-orange-50
                      transition
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-8
                      "
                    >

                      {/* LEFT */}

                      <div
                        className="
                          flex
                          gap-6
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
                            w-44
                            h-32
                            object-cover
                            rounded-2xl
                          "
                        />

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              flex-wrap
                              mb-3
                            "
                          >

                            <h3
                              className="
                                text-3xl
                                font-black
                              "
                            >

                              {
                                property.title
                              }

                            </h3>

                            {property.featured && (

                              <span
                                className="
                                  bg-gradient-to-r
                                  from-yellow-400
                                  to-orange-500
                                  text-white
                                  px-4
                                  py-2
                                  rounded-full
                                  text-sm
                                  font-bold
                                  shadow-md
                                "
                              >

                                Featured

                              </span>
                            )}

                          </div>

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

                            {
                              property.location
                            }

                          </div>

                          <p
                            className="
                              text-gray-600
                              max-w-2xl
                              mb-5
                              line-clamp-2
                            "
                          >

                            {
                              property.description
                            }

                          </p>

                          <div
                            className="
                              flex
                              flex-wrap
                              items-center
                              gap-6
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-orange-500
                                font-bold
                              "
                            >

                              <Eye
                                size={20}
                              />

                              {
                                property.views || 0
                              }
                              views

                            </div>

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-pink-500
                                font-bold
                              "
                            >

                              <Heart
                                size={20}
                              />

                              Popular

                            </div>

                            <div
                              className="
                                text-3xl
                                font-black
                              "
                            >

                              Ksh {
                                property.price
                              }

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-4
                        "
                      >

                        <Link

                          href={`/properties/${property.id}`}

                          className="
                            bg-gray-100
                            hover:bg-gray-200
                            px-5
                            py-4
                            rounded-2xl
                            font-semibold
                            transition
                          "
                        >

                          View

                        </Link>

                        <Link

                          href={`/dashboard/edit-property/${property.id}`}

                          className="
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            px-5
                            py-4
                            rounded-2xl
                            font-semibold
                            flex
                            items-center
                            gap-2
                            transition
                          "
                        >

                          <Pencil
                            size={18}
                          />

                          Edit

                        </Link>

                        <button

                          onClick={() =>

                            deleteProperty(
                              property.id
                            )
                          }

                          className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-5
                            py-4
                            rounded-2xl
                            font-semibold
                            flex
                            items-center
                            gap-2
                            transition
                          "
                        >

                          <Trash2
                            size={18}
                          />

                          Delete

                        </button>

                        <BoostListingButton
                          propertyId={
                            property.id
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

      </div>

    </main>
  )
}