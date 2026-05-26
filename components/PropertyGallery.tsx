"use client"

import { useState }
from "react"

import Image
from "next/image"

interface Props {

  images: string[]
}

export default function PropertyGallery({
  images,
}: Props) {

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(
    images[0]
  )

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

          alt="Property Image"

          fill

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
          md:grid-cols-4
          gap-4
        "
      >

        {images.map(
          (image, index) => (

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
                  selectedImage ===
                  image

                    ? "border-orange-500"

                    : "border-transparent"
                }
              `}
            >

              <Image
                src={image}

                alt={`Image ${index}`}

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