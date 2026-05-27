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

  // EDITING STATES

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

          featured: false,
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

        {/* EDIT MODAL */}

        {editingProperty && (

          <div
            className="
              fixed
              inset-0
              bg-black/50
              z-50
              flex
              items-center
              justify-center
              p-6
            "
          >

            <div
              className="
                bg-white
                rounded-3xl
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                p-8
              "
            >

              {/* HEADER */}

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
                    text-4xl
                    font-extrabold
                  "
                >

                  Edit Property

                </h2>

                <button

                  onClick={() =>
                    setEditingProperty(
                      null
                    )
                  }

                  className="
                    bg-gray-100
                    hover:bg-gray-200
                    p-3
                    rounded-full
                  "
                >

                  <X size={22} />

                </button>

              </div>

              {/* FORM */}

              <form

                onSubmit={
                  updateProperty
                }

                className="
                  space-y-6
                "
              >

                {/* IMAGE */}

                <ImageUpload
                  onUpload={
                    setEditImageUrl
                  }
                />

                {/* TITLE */}

                <input

                  type="text"

                  value={
                    editingProperty.title
                  }

                  onChange={(e) =>
                    setEditingProperty({

                      ...editingProperty,

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
                  "
                />

                {/* DESCRIPTION */}

                <textarea

                  rows={5}

                  value={
                    editingProperty.description
                  }

                  onChange={(e) =>
                    setEditingProperty({

                      ...editingProperty,

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
                  "
                />

                {/* GRID */}

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-5
                  "
                >

                  <input

                    type="text"

                    value={
                      editingProperty.location
                    }

                    onChange={(e) =>
                      setEditingProperty({

                        ...editingProperty,

                        location:
                          e.target.value,
                      })
                    }

                    className="
                      border
                      rounded-2xl
                      px-5
                      py-4
                    "
                  />

                  <input

                    type="text"

                    value={
                      editingProperty.price
                    }

                    onChange={(e) =>
                      setEditingProperty({

                        ...editingProperty,

                        price:
                          e.target.value,
                      })
                    }

                    className="
                      border
                      rounded-2xl
                      px-5
                      py-4
                    "
                  />

                  <input

                    type="text"

                    value={
                      editingProperty.category
                    }

                    onChange={(e) =>
                      setEditingProperty({

                        ...editingProperty,

                        category:
                          e.target.value,
                      })
                    }

                    className="
                      border
                      rounded-2xl
                      px-5
                      py-4
                    "
                  />

                  <input

                    type="number"

                    value={
                      editingProperty.bedrooms
                    }

                    onChange={(e) =>
                      setEditingProperty({

                        ...editingProperty,

                        bedrooms:
                          Number(
                            e.target.value
                          ),
                      })
                    }

                    className="
                      border
                      rounded-2xl
                      px-5
                      py-4
                    "
                  />

                  <input

                    type="number"

                    value={
                      editingProperty.bathrooms
                    }

                    onChange={(e) =>
                      setEditingProperty({

                        ...editingProperty,

                        bathrooms:
                          Number(
                            e.target.value
                          ),
                      })
                    }

                    className="
                      border
                      rounded-2xl
                      px-5
                      py-4
                    "
                  />

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
                    text-white
                    py-5
                    rounded-2xl
                    font-bold
                    text-xl
                  "
                >

                  {submitting

                    ? "Updating..."

                    : "Update Property"}

                </button>

              </form>

            </div>

          </div>
        )}

        {/* PROPERTY LIST */}

        <div>

          <h2
            className="
              text-4xl
              font-extrabold
              mb-8
            "
          >

            Your Properties

          </h2>

          {loading ? (

            <div
              className="
                text-center
                py-20
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  text-orange-500
                "
              >

                Loading...

              </h2>

            </div>

          ) : properties.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-14
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

                No properties yet

              </h2>

              <p
                className="
                  text-gray-500
                "
              >

                Create your first
                listing above.

              </p>

            </div>

          ) : (

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

                    key={
                      property.id
                    }

                    className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      shadow-md
                    "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        h-64
                      "
                    >

                      <Image

                        src={
                          property.image_url
                        }

                        alt={
                          property.title
                        }

                        fill

                        className="
                          object-cover
                        "
                      />

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
                          justify-between
                          items-start
                          gap-4
                          mb-4
                        "
                      >

                        <h3
                          className="
                            text-2xl
                            font-bold
                          "
                        >

                          {
                            property.title
                          }

                        </h3>

                        {property.featured && (

                          <Star
                            size={22}
                            className="
                              text-yellow-500
                            "
                          />
                        )}

                      </div>

                      <p
                        className="
                          text-gray-500
                          mb-4
                        "
                      >

                        {
                          property.location
                        }

                      </p>

                      <div
                        className="
                          flex
                          justify-between
                          items-center
                          mb-6
                        "
                      >

                        <div
                          className="
                            text-orange-500
                            font-extrabold
                            text-2xl
                          "
                        >

                          Ksh {
                            property.price
                          }

                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-gray-500
                          "
                        >

                          <Eye
                            size={18}
                          />

                          {
                            property.views || 0
                          }

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          flex
                          gap-4
                        "
                      >

                        {/* EDIT */}

                        <button

                          onClick={() => {

                            setEditingProperty(
                              property
                            )

                            setEditImageUrl(
                              property.image_url
                            )
                          }}

                          className="
                            flex-1
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            py-3
                            rounded-2xl
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-2
                            transition
                          "
                        >

                          <Pencil
                            size={18}
                          />

                          Edit

                        </button>

                        {/* DELETE */}

                        <button

                          onClick={() =>
                            deleteProperty(
                              property.id
                            )
                          }

                          className="
                            flex-1
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            py-3
                            rounded-2xl
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-2
                            transition
                          "
                        >

                          <Trash2
                            size={18}
                          />

                          Delete

                        </button>

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