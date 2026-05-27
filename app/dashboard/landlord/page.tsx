"use client"

import {
  useEffect,
  useState,
} from "react"

import { useRouter }
from "next/navigation"

import { supabase }
from "@/lib/supabase"

export default function LandlordDashboardPage() {

  const router =
    useRouter()

  // PROPERTY STATES

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
    category,
    setCategory,
  ] = useState("Apartment")

  const [
    bedrooms,
    setBedrooms,
  ] = useState("1")

  const [
    bathrooms,
    setBathrooms,
  ] = useState("1")

  const [
    landlordPhone,
    setLandlordPhone,
  ] = useState("")

  // IMAGE STATES

  const [
    image,
    setImage,
  ] = useState<File | null>(
    null
  )

  const [
    galleryImages,
    setGalleryImages,
  ] = useState<File[]>([])

  // UI STATES

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    user,
    setUser,
  ] = useState<any>(null)

  // CHECK AUTH

  useEffect(() => {

    async function getUser() {

      const {
        data: {
          user,
        },
      } =
        await supabase
          .auth
          .getUser()

      if (!user) {

        router.push("/login")

        return
      }

      setUser(user)
    }

    getUser()

  }, [router])

  // HANDLE MAIN IMAGE

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    if (
      e.target.files &&
      e.target.files[0]
    ) {

      setImage(
        e.target.files[0]
      )
    }
  }

  // HANDLE GALLERY IMAGES

  function handleGalleryImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    if (e.target.files) {

      setGalleryImages(
        Array.from(
          e.target.files
        )
      )
    }
  }

  // CREATE PROPERTY

  async function createProperty() {

    if (!image) {

      alert(
        "Please upload a main image."
      )

      return
    }

    setLoading(true)

    try {

      // MAIN IMAGE NAME

      const imageName =

        `${Date.now()}-${image.name}`

      // UPLOAD MAIN IMAGE

      const {
        error: uploadError,
      } =
        await supabase

          .storage

          .from(
            "property-images"
          )

          .upload(
            imageName,
            image
          )

      if (uploadError) {

        console.error(
          uploadError
        )

        alert(
          "Failed to upload image."
        )

        setLoading(false)

        return
      }

      // GET MAIN IMAGE URL

      const {
        data: imageData,
      } =
        supabase

          .storage

          .from(
            "property-images"
          )

          .getPublicUrl(
            imageName
          )

      const imageUrl =

        imageData.publicUrl

      // INSERT PROPERTY

      const {
        data: propertyData,
        error: propertyError,
      } =
        await supabase

          .from("properties")

          .insert([
            {
              title,
              description,
              location,
              price,
              category,

              bedrooms:
                Number(
                  bedrooms
                ),

              bathrooms:
                Number(
                  bathrooms
                ),

              landlord_phone:
                landlordPhone,

              image_url:
                imageUrl,

              user_id:
                user.id,
            },
          ])

          .select()

          .single()

      if (
        propertyError ||
        !propertyData
      ) {

        console.error(
          propertyError
        )

        alert(
          "Failed to create property."
        )

        setLoading(false)

        return
      }

      // UPLOAD GALLERY IMAGES

      for (
        const galleryImage
        of galleryImages
      ) {

        const galleryName =

          `${Date.now()}-${galleryImage.name}`

        const {
          error:
            galleryUploadError,
        } =
          await supabase

            .storage

            .from(
              "property-images"
            )

            .upload(
              galleryName,
              galleryImage
            )

        if (
          galleryUploadError
        ) {

          console.error(
            galleryUploadError
          )

          continue
        }

        const {
          data:
            galleryUrlData,
        } =
          supabase

            .storage

            .from(
              "property-images"
            )

            .getPublicUrl(
              galleryName
            )

        // SAVE GALLERY IMAGE

        await supabase

          .from(
            "property_images"
          )

          .insert([
            {
              property_id:
                propertyData.id,

              image_url:
                galleryUrlData
                  .publicUrl,
            },
          ])
      }

      alert(
        "Property created successfully!"
      )

      // RESET FORM

      setTitle("")
      setDescription("")
      setLocation("")
      setPrice("")
      setCategory("Apartment")
      setBedrooms("1")
      setBathrooms("1")
      setLandlordPhone("")
      setImage(null)
      setGalleryImages([])

      router.push(
        "/properties"
      )

    } catch (error) {

      console.error(error)

      alert(
        "Something went wrong."
      )

    } finally {

      setLoading(false)
    }
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
          max-w-4xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-lg
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-extrabold
            text-orange-500
            mb-10
          "
        >

          Add New Property

        </h1>

        <div
          className="
            grid
            gap-6
          "
        >

          {/* TITLE */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Property Title

            </label>

            <input
              type="text"

              placeholder="
              Modern Apartment
              "

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Description

            </label>

            <textarea

              placeholder="
              Describe the property...
              "

              value={
                description
              }

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
                min-h-[160px]
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* LOCATION */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Location

            </label>

            <input
              type="text"

              placeholder="
              Nairobi, Kenya
              "

              value={location}

              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* PRICE */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Price (Ksh)

            </label>

            <input
              type="number"

              placeholder="
              25000
              "

              value={price}

              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Category

            </label>

            <select

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              className="
                w-full
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

          </div>

          {/* BEDROOMS */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Bedrooms

            </label>

            <input
              type="number"

              value={bedrooms}

              onChange={(e) =>
                setBedrooms(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* BATHROOMS */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Bathrooms

            </label>

            <input
              type="number"

              value={bathrooms}

              onChange={(e) =>
                setBathrooms(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          {/* LANDLORD PHONE */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Landlord Phone

            </label>

            <input
              type="text"

              placeholder="
              +254712345678
              "

              value={
                landlordPhone
              }

              onChange={(e) =>
                setLandlordPhone(
                  e.target.value
                )
              }

              className="
                w-full
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

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Main Property Image

            </label>

            <input
              type="file"

              accept="image/*"

              onChange={
                handleImageChange
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
              "
            />

          </div>

          {/* GALLERY IMAGES */}

          <div>

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >

              Gallery Images

            </label>

            <input
              type="file"

              multiple

              accept="image/*"

              onChange={
                handleGalleryImages
              }

              className="
                w-full
                border
                rounded-2xl
                p-4
              "
            />

          </div>

          {/* SUBMIT */}

          <button

            onClick={
              createProperty
            }

            disabled={loading}

            className="
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

            {
              loading

                ? "Creating Property..."

                : "Create Property"
            }

          </button>

        </div>

      </div>

    </main>
  )
}