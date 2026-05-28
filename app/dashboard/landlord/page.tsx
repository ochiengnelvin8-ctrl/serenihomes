"use client"

import {
  useEffect,
  useState,
} from "react"

import Image from "next/image"

import {
  Home,
  Plus,
  Trash2,
  Eye,
  Star,
  Pencil,
  X,
  BarChart3,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

import ImageUpload
from "@/components/ImageUpload"

import MultiImageUpload
from "@/components/MultiImageUpload"

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

  views?: number

  featured?: boolean
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
    submitting,
    setSubmitting,
  ] = useState(false)

  const [
    userId,
    setUserId,
  ] = useState("")

  // ANALYTICS

  const [
    totalViews,
    setTotalViews,
  ] = useState(0)

  const [
    featuredCount,
    setFeaturedCount,
  ] = useState(0)

  const [
    averagePrice,
    setAveragePrice,
  ] = useState(0)

  // MAIN IMAGE

  const [
    imageUrl,
    setImageUrl,
  ] = useState("")

  // GALLERY IMAGES

  const [
    galleryImages,
    setGalleryImages,
  ] = useState<string[]>([])

  // EDIT STATES

  const [
    editingProperty,
    setEditingProperty,
  ] = useState<Property | null>(
    null
  )

  const [
    editImageUrl,
    setEditImageUrl,
  ] = useState("")

  // FORM STATE

  const [
    formData,
    setFormData,
  ] = useState({

      title: "",

      description: "",

      location: "",

      price: "",

      category: "",

      bedrooms: "",

      bathrooms: "",

      landlord_phone: "",

      featured: false,
    }
  )

  // FETCH USER

  async function fetchUser() {

    const {
      data,
    } =
      await supabase.auth.getUser()

    if (data.user) {

      setUserId(
        data.user.id
      )
    }
  }

  // FETCH PROPERTIES

  async function fetchProperties() {

    try {

      setLoading(true)

      const {
        data,
        error,
      } = await supabase

        .from("properties")

        .select("*")

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

      const propertiesData =
        data || []

      setProperties(
        propertiesData
      )

      // TOTAL VIEWS

      const views =
        propertiesData.reduce(

          (
            sum,
            property
          ) =>

            sum +
            (property.views || 0),

          0
        )

      setTotalViews(
        views
      )

      // FEATURED COUNT

      const featured =
        propertiesData.filter(
          (property) =>
            property.featured
        ).length

      setFeaturedCount(
        featured
      )

      // AVERAGE PRICE

      const totalPrice =
        propertiesData.reduce(

          (
            sum,
            property
          ) =>

            sum +
            Number(
              property.price || 0
            ),

          0
        )

      const average =

        propertiesData.length > 0

          ? Math.round(

              totalPrice /

              propertiesData.length
            )

          : 0

      setAveragePrice(
        average
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // CREATE PROPERTY

  async function createProperty(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setSubmitting(true)

      const {

        data: propertyData,

        error,

      } = await supabase

        .from("properties")

        .insert({

          user_id:
            userId,

          title:
            formData.title,

          description:
            formData.description,

          location:
            formData.location,

          price:
            formData.price,

          category:
            formData.category,

          bedrooms:
            Number(
              formData.bedrooms
            ),

          bathrooms:
            Number(
              formData.bathrooms
            ),

          landlord_phone:
            formData.landlord_phone,

          image_url:
            imageUrl,

          views: 0,

          featured:
            formData.featured,
        })

        .select()

        .single()

      if (error) {

        console.error(error)

        alert(
          "Failed to create property"
        )

        return
      }

      // SAVE GALLERY IMAGES

      if (
        propertyData &&
        galleryImages.length > 0
      ) {

        const galleryInsert =

          galleryImages.map(
            (image) => ({

              property_id:
                propertyData.id,

              image_url:
                image,
            })
          )

        await supabase

          .from(
            "property_images"
          )

          .insert(
            galleryInsert
          )
      }

      // RESET FORM

      setFormData({

        title: "",

        description: "",

        location: "",

        price: "",

        category: "",

        bedrooms: "",

        bathrooms: "",

        landlord_phone: "",

        featured: false,
      })

      setImageUrl("")

      setGalleryImages([])

      fetchProperties()

      alert(
        "Property created successfully"
      )

    } catch (error) {

      console.error(error)

    } finally {

      setSubmitting(false)
    }
  }

  // UPDATE PROPERTY

  async function updateProperty(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (!editingProperty)
      return

    try {

      setSubmitting(true)

      const {
        error,
      } = await supabase

        .from("properties")

        .update({

          title:
            editingProperty.title,

          description:
            editingProperty.description,

          location:
            editingProperty.location,

          price:
            editingProperty.price,

          category:
            editingProperty.category,

          bedrooms:
            editingProperty.bedrooms,

          bathrooms:
            editingProperty.bathrooms,

          image_url:
            editImageUrl ||
            editingProperty.image_url,

          featured:
            editingProperty.featured,
        })

        .eq(
          "id",
          editingProperty.id
        )

      if (error) {

        console.error(error)

        alert(
          "Failed to update property"
        )

        return
      }

      alert(
        "Property updated successfully"
      )

      setEditingProperty(
        null
      )

      setEditImageUrl("")

      fetchProperties()

    } catch (error) {

      console.error(error)

    } finally {

      setSubmitting(false)
    }
  }

  // DELETE PROPERTY

  async function deleteProperty(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete this property?"
      )

    if (!confirmDelete)
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

    fetchUser()

    fetchProperties()

  }, [])

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
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-extrabold
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

              Manage your
              property listings

            </p>

          </div>

          <div
            className="
              bg-white
              rounded-3xl
              px-8
              py-5
              shadow-md
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <BarChart3
                size={38}
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

                  Total Views

                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                  "
                >

                  {totalViews}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* ANALYTICS */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-12
          "
        >

          {/* TOTAL LISTINGS */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <p
              className="
                text-gray-500
                mb-3
              "
            >

              Total Listings

            </p>

            <h2
              className="
                text-5xl
                font-black
              "
            >

              {properties.length}

            </h2>

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

            <p
              className="
                text-gray-500
                mb-3
              "
            >

              Total Views

            </p>

            <h2
              className="
                text-5xl
                font-black
              "
            >

              {totalViews}

            </h2>

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

            <p
              className="
                text-gray-500
                mb-3
              "
            >

              Featured Listings

            </p>

            <h2
              className="
                text-5xl
                font-black
                text-orange-500
              "
            >

              {featuredCount}

            </h2>

          </div>

          {/* AVG PRICE */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <p
              className="
                text-gray-500
                mb-3
              "
            >

              Average Price

            </p>

            <h2
              className="
                text-4xl
                font-black
              "
            >

              Ksh {averagePrice}

            </h2>

          </div>

        </div>

        {/* CREATE PROPERTY */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
            mb-12
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <Plus
              size={32}
              className="
                text-orange-500
              "
            />

            <h2
              className="
                text-3xl
                font-bold
              "
            >

              Add New Property

            </h2>

          </div>

          <form

            onSubmit={
              createProperty
            }

            className="
              space-y-7
            "
          >

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >

                Main Property Image

              </h3>

              <ImageUpload
                onUpload={
                  setImageUrl
                }
              />

            </div>

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >

                Property Gallery

              </h3>

              <MultiImageUpload

                onUploadComplete={
                  setGalleryImages
                }

              />

            </div>

          </form>

        </div>

      </div>

    </main>
  )
}