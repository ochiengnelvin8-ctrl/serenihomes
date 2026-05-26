"use client"

import { useEffect, useState } from "react"

import Image from "next/image"

import Link from "next/link"

import {
  Home,
  Plus,
  Trash2,
  Pencil,
  ImagePlus,
} from "lucide-react"

import { supabase } from "@/lib/supabase"

import ImageUpload from "@/components/ImageUpload"

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

export default function LandlordDashboard() {

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  // FORM STATES

  const [
    title,
    setTitle,
  ] = useState("")

  const [
    description,
    setDescription,
  ] = useState("")

  const [
    location,
    setLocation,
  ] = useState("")

  const [
    price,
    setPrice,
  ] = useState("")

  const [
    imageUrl,
    setImageUrl,
  ] = useState("")

  const [
    category,
    setCategory,
  ] = useState("Apartment")

  const [
    bedrooms,
    setBedrooms,
  ] = useState("")

  const [
    bathrooms,
    setBathrooms,
  ] = useState("")

  // GALLERY IMAGES

  const [
    galleryImages,
    setGalleryImages,
  ] = useState("")

  // EDITING

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  )

  useEffect(() => {

    fetchProperties()

  }, [])

  // FETCH PROPERTIES

  async function fetchProperties() {

    setLoading(true)

    const {
      data,
      error,
    } =
      await supabase

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

      setLoading(false)

      return
    }

    setProperties(data || [])

    setLoading(false)
  }

  // CREATE PROPERTY

  async function createProperty() {

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !imageUrl
    ) {

      alert(
        "Please fill all required fields."
      )

      return
    }

    const {
      data,
      error,
    } =
      await supabase

        .from("properties")

        .insert([
          {
            title,

            description,

            location,

            price,

            image_url:
              imageUrl,

            category,

            bedrooms:
              Number(
                bedrooms
              ),

            bathrooms:
              Number(
                bathrooms
              ),
          },
        ])

        .select()

    if (error) {

      console.error(error)

      alert(
        "Failed to create property."
      )

      return
    }

    // SAVE GALLERY IMAGES

    if (
      data &&
      galleryImages
    ) {

      const imageArray =

        galleryImages

          .split("\n")

          .filter(
            (url) =>
              url.trim() !== ""
          )

      const formattedImages =

        imageArray.map(
          (url) => ({

            property_id:
              data[0].id,

            image_url:
              url.trim(),
          })
        )

      await supabase

        .from(
          "property_images"
        )

        .insert(
          formattedImages
        )
    }

    alert(
      "Property created successfully!"
    )

    resetForm()

    fetchProperties()
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

    await supabase

      .from("properties")

      .delete()

      .eq("id", id)

    fetchProperties()
  }

  // LOAD PROPERTY TO FORM

  function editProperty(
    property: Property
  ) {

    setEditingId(
      property.id
    )

    setTitle(
      property.title
    )

    setDescription(
      property.description
    )

    setLocation(
      property.location
    )

    setPrice(
      property.price
    )

    setImageUrl(
      property.image_url
    )

    setCategory(
      property.category
    )

    setBedrooms(
      String(
        property.bedrooms || 0
      )
    )

    setBathrooms(
      String(
        property.bathrooms || 0
      )
    )

    window.scrollTo({

      top: 0,

      behavior: "smooth",
    })
  }

  // UPDATE PROPERTY

  async function updateProperty() {

    if (!editingId)
      return

    const {
      error,
    } =
      await supabase

        .from("properties")

        .update({

          title,

          description,

          location,

          price,

          image_url:
            imageUrl,

          category,

          bedrooms:
            Number(
              bedrooms
            ),

          bathrooms:
            Number(
              bathrooms
            ),
        })

        .eq(
          "id",
          editingId
        )

    if (error) {

      console.error(error)

      alert(
        "Failed to update property."
      )

      return
    }

    alert(
      "Property updated successfully!"
    )

    resetForm()

    fetchProperties()
  }

  // RESET FORM

  function resetForm() {

    setEditingId(null)

    setTitle("")

    setDescription("")

    setLocation("")

    setPrice("")

    setImageUrl("")

    setCategory(
      "Apartment"
    )

    setBedrooms("")

    setBathrooms("")

    setGalleryImages("")
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
                text-orange-500
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

              Manage your property listings.

            </p>

          </div>

          <Link
            href="/properties"

            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-6
              py-4
              rounded-2xl
              font-semibold
              transition
              flex
              items-center
              gap-3
              w-fit
            "
          >

            <Home size={22} />

            View Properties

          </Link>

        </div>

        {/* FORM */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
            mb-14
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
              size={28}
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

              {
                editingId

                  ? "Edit Property"

                  : "Add New Property"
              }

            </h2>

          </div>

          {/* INPUT GRID */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            <input
              type="text"

              placeholder="Property Title"

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

            <input
              type="text"

              placeholder="Location"

              value={location}

              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

            <input
              type="number"

              placeholder="Price"

              value={price}

              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

            <select
              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            >

              <option>
                Apartment
              </option>

              <option>
                Bedsitter
              </option>

              <option>
                Maisonette
              </option>

              <option>
                Villa
              </option>

            </select>

            <input
              type="number"

              placeholder="Bedrooms"

              value={bedrooms}

              onChange={(e) =>
                setBedrooms(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

            <input
              type="number"

              placeholder="Bathrooms"

              value={bathrooms}

              onChange={(e) =>
                setBathrooms(
                  e.target.value
                )
              }

              className="
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* MAIN IMAGE */}

          <div
            className="
              mt-8
            "
          >

            <h3
              className="
                text-xl
                font-bold
                mb-5
              "
            >

              Main Property Image

            </h3>

            <ImageUpload
              onUpload={(
                url
              ) =>
                setImageUrl(
                  url
                )
              }
            />

            {imageUrl && (

              <div
                className="
                  relative
                  h-72
                  mt-6
                  rounded-3xl
                  overflow-hidden
                "
              >

                <Image
                  src={imageUrl}

                  alt="Preview"

                  fill

                  className="
                    object-cover
                  "
                />

              </div>
            )}

          </div>

          {/* DESCRIPTION */}

          <div
            className="
              mt-8
            "
          >

            <textarea

              placeholder="
              Property Description
              "

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
                min-h-[180px]
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* GALLERY */}

          <div
            className="
              mt-8
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <ImagePlus
                size={22}
                className="
                  text-orange-500
                "
              />

              <h3
                className="
                  text-xl
                  font-bold
                "
              >

                Gallery Images

              </h3>

            </div>

            <ImageUpload
              onUpload={(
                url
              ) =>

                setGalleryImages(
                  (prev) =>

                    prev
                      ? `${prev}\n${url}`
                      : url
                )
              }
            />

            {galleryImages && (

              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-4
                  mt-6
                "
              >

                {galleryImages
                  .split("\n")
                  .map(
                    (
                      image,
                      index
                    ) => (

                      <div
                        key={index}

                        className="
                          relative
                          h-32
                          rounded-2xl
                          overflow-hidden
                        "
                      >

                        <Image
                          src={image}

                          alt="Gallery"

                          fill

                          className="
                            object-cover
                          "
                        />

                      </div>
                    )
                  )}

              </div>
            )}

          </div>

          {/* ACTION BUTTONS */}

          <div
            className="
              flex
              gap-4
              mt-10
            "
          >

            {editingId ? (

              <>
                <button
                  onClick={
                    updateProperty
                  }

                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    font-bold
                    transition
                  "
                >

                  Update Property

                </button>

                <button
                  onClick={
                    resetForm
                  }

                  className="
                    bg-gray-200
                    hover:bg-gray-300
                    px-8
                    py-4
                    rounded-2xl
                    font-bold
                    transition
                  "
                >

                  Cancel

                </button>
              </>

            ) : (

              <button
                onClick={
                  createProperty
                }

                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  transition
                "
              >

                Add Property

              </button>
            )}

          </div>

        </div>

        {/* PROPERTY LIST */}

        <div>

          <h2
            className="
              text-4xl
              font-extrabold
              mb-10
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

              <h3
                className="
                  text-2xl
                  font-bold
                  text-orange-500
                "
              >

                Loading properties...

              </h3>

            </div>

          ) : properties.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-12
                text-center
                shadow-md
              "
            >

              <h3
                className="
                  text-3xl
                  font-bold
                  mb-4
                "
              >

                No Properties Yet

              </h3>

              <p
                className="
                  text-gray-600
                "
              >

                Add your first property listing.

              </p>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
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

                      <div
                        className="
                          relative
                          h-64
                        "
                      >

                        <Image
                          src={
                            property.image_url ||

                            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop"
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

                          {
                            property.title
                          }

                        </h3>

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

                        <p
                          className="
                            text-orange-500
                            text-3xl
                            font-extrabold
                            mb-6
                          "
                        >

                          Ksh {
                            property.price
                          }

                        </p>

                        <div
                          className="
                            flex
                            gap-4
                          "
                        >

                          <button
                            onClick={() =>
                              editProperty(
                                property
                              )
                            }

                            className="
                              flex-1
                              bg-blue-500
                              hover:bg-blue-600
                              text-white
                              py-3
                              rounded-2xl
                              font-semibold
                              transition
                              flex
                              items-center
                              justify-center
                              gap-2
                            "
                          >

                            <Pencil
                              size={18}
                            />

                            Edit

                          </button>

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
                              font-semibold
                              transition
                              flex
                              items-center
                              justify-center
                              gap-2
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