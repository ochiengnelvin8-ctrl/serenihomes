interface Props {

  location: string
}

export default function PropertyMap({

  location,

}: Props) {

  const mapUrl =

    `https://www.google.com/maps?q=${encodeURIComponent(
      location
    )}&output=embed`

  return (

    <div
      className="
        rounded-3xl
        overflow-hidden
        shadow-md
      "
    >

      <iframe

        src={mapUrl}

        width="100%"

        height="450"

        loading="lazy"

        allowFullScreen

        referrerPolicy="no-referrer-when-downgrade"

        className="
          border-0
          w-full
        "
      />

    </div>
  )
}