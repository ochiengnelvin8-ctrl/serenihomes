"use client"

import Image from "next/image"

import { useState }
from "react"

interface Props {

  mainImage: string

  galleryImages: string[]
}

export default function PropertyGallery({

  mainImage,

  galleryImages,

}: Props) {

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(
    mainImage
  )

  const allImages = [

    mainImage,

    ...galleryImages,
  ]

  return (

    <div>

      {/* MAIN IMAGE */}

      <div
        className="
          relative
          w-full
          h-[500px]
          rounded-3xl
          overflow-hidden
          mb-5
        "
      >

        <Image
          src={selectedImage}

          alt="Property"

          fill

          priority

          className="
            object-cover
          "
        />

      </div>

      {/* THUMBNAILS */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-5
          gap-4
        "
      >

        {allImages.map(
          (
            image,
            index
          ) => (

            <button
              key={index}

              onClick={() =>
                setSelectedImage(
                  image
                )
              }

              className={`
                relative
                h-28
                rounded-2xl
                overflow-hidden
                border-4
                transition

                ${
                  selectedImage === image

                    ? "border-orange-500"

                    : "border-transparent"
                }
              `}
            >

              <Image
                src={image}

                alt="Gallery"

                fill

                className="
                  object-cover
                "
              />

            </button>
          )
        )}

      </div>

    </div>
  )
}