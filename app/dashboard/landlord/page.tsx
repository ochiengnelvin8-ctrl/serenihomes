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

      setProperties(
        data || []
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

              <Home
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

                  Total Properties

                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                  "
                >

                  {
                    properties.length
                  }

                </h2>

              </div>

            </div>

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

            {/* MAIN IMAGE */}

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

            {/* GALLERY */}

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

            {/* TITLE */}

            <input

              type="text"

              placeholder="
              Property title
              "

              required

              value={
                formData.title
              }

              onChange={(e) =>
                setFormData({

                  ...formData,

                  title:
                    e.target.value,
                })
              }

              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-orange-500
              "
            />

            {/* DESCRIPTION */}

            <textarea

              placeholder="
              Property description
              "

              required

              rows={5}

              value={
                formData.description
              }

              onChange={(e) =>
                setFormData({

                  ...formData,

                  description:
                    e.target.value,
                })
              }

              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-orange-500
              "
            />

            {/* GRID */}

            <div
              className="
                grid
                md:grid-cols-2
                gap-6
              "
            >

              <input

                type="text"

                placeholder="
                Location
                "

                required

                value={
                  formData.location
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    location:
                      e.target.value,
                  })
                }

                className="
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-orange-500
                "
              />

              <input

                type="number"

                placeholder="
                Price
                "

                required

                value={
                  formData.price
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    price:
                      e.target.value,
                  })
                }

                className="
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-orange-500
                "
              />

              <input

                type="text"

                placeholder="
                Category
                "

                required

                value={
                  formData.category
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    category:
                      e.target.value,
                  })
                }

                className="
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-orange-500
                "
              />

              <input

                type="text"

                placeholder="
                Phone Number
                "

                required

                value={
                  formData.landlord_phone
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    landlord_phone:
                      e.target.value,
                  })
                }

                className="
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-orange-500
                "
              />

              <input

                type="number"

                placeholder="
                Bedrooms
                "

                required

                value={
                  formData.bedrooms
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    bedrooms:
                      e.target.value,
                  })
                }

                className="
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-orange-500
                "
              />

              <input

                type="number"

                placeholder="
                Bathrooms
                "

                required

                value={
                  formData.bathrooms
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    bathrooms:
                      e.target.value,
                  })
                }

                className="
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            {/* FEATURED */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <input

                type="checkbox"

                checked={
                  formData.featured
                }

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    featured:
                      e.target.checked,
                  })
                }

                className="
                  w-6
                  h-6
                  accent-orange-500
                "
              />

              <label
                className="
                  text-lg
                  font-semibold
                "
              >

                Mark as Featured Property

              </label>

            </div>

            {/* BUTTON */}

            <button

              type="submit"

              disabled={
                submitting
              }

              className="
                w-full
                bg-orange-500
                hover:bg-orange-600
                disabled:opacity-50
                text-white
                py-5
                rounded-2xl
                font-bold
                text-xl
                transition
              "
            >

              {submitting

                ? "Creating Property..."

                : "Create Property"}

            </button>

          </form>

        </div>

      </div>

    </main>
  )
}