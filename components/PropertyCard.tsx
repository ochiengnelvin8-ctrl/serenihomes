import Link from 'next/link'

type PropertyProps = {
  id?: string
  title: string
  description: string
  location: string
  price: string
  image_url: string
  category: string
}

export default function PropertyCard({
  id,
  title,
  description,
  location,
  price,
  image_url,
  category
}: PropertyProps) {

  return (

    <Link href={`/properties/${id}`}>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">

        <img
          src={image_url}
          alt={title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-orange-500">
              {title}
            </h2>

            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
              {category}
            </span>

          </div>

          <p className="text-gray-600 mb-4">
            {description.substring(0, 100)}...
          </p>

          <div className="space-y-2">

            <p className="font-semibold">
              📍 {location}
            </p>

            <p className="text-xl font-bold text-green-600">
              Ksh {price}
            </p>

          </div>

        </div>

      </div>

    </Link>
  )
}