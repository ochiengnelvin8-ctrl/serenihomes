interface Props {

  mainImage: string

  galleryImages:
    string[]
}

export default function
PropertyGallery({

  mainImage,

  galleryImages,

}: Props) {

  const images = [

    mainImage,

    ...galleryImages,
  ]

  return (

    <div
      className="
        grid
        md:grid-cols-2
        gap-4
      "
    >

      {images.map(
        (image, index) => (

          <img

            key={index}

            src={image}

            alt="
            Property
            "

            className="
              w-full
              h-[350px]
              object-cover
              rounded-3xl
            "
          />

        )
      )}

    </div>
  )
}