'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function AddPropertyPage() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [imageFile, setImageFile] =
    useState<File | null>(null)

  const [imagePreview, setImagePreview] =
    useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    category: 'Rental'
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    setImageFile(file)

    setImagePreview(
      URL.createObjectURL(file)
    )
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {

        alert('You must login first.')

        setLoading(false)

        return
      }

      if (!imageFile) {

        alert('Please select an image.')

        setLoading(false)

        return
      }

      // CREATE UNIQUE FILE NAME
      const fileExt =
        imageFile.name.split('.').pop()

      const fileName =
        `${Date.now()}.${fileExt}`

      // UPLOAD IMAGE
      const { error: uploadError } =
        await supabase.storage
          .from('property-images')
          .upload(fileName, imageFile)

      if (uploadError) {

        alert(uploadError.message)

        setLoading(false)

        return
      }

      // GET PUBLIC URL
      const {
        data: publicUrlData
      } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName)

      const imageUrl =
        publicUrlData.publicUrl

      // SAVE PROPERTY
      const { error: dbError } =
        await supabase
          .from('properties')
          .insert([
            {
              owner_id: user.id,
              title: formData.title,
              description: formData.description,
              location: formData.location,
              price: formData.price,
              category: formData.category,
              image_url: imageUrl
            }
          ])

      if (dbError) {

        alert(dbError.message)

        setLoading(false)

        return
      }

      alert('Property uploaded successfully!')

      router.push('/properties')

    } catch (err) {

      alert('Something went wrong.')

    }

    setLoading(false)
  }

  return (

    <main className="min-h-screen bg-orange-50 p-10">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-bold text-orange-500 mb-10">
          Add Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4"
            required
          />

          <textarea
            name="description"
            placeholder="Property Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4 h-40"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4"
            required
          />

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4"
          >

            <option value="Rental">
              Rental
            </option>

            <option value="Sale">
              Sale
            </option>

          </select>

          <div>

            <label className="block mb-2 font-semibold">
              Property Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {imagePreview && (

            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-80 object-cover rounded-2xl"
            />

          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >

            {loading
              ? 'Uploading...'
              : 'Upload Property'}

          </button>

        </form>

      </div>

    </main>
  )
}