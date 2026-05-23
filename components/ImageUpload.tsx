'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ImageUpload({
  onUpload
}: {
  onUpload: (url: string) => void
}) {

  const [uploading, setUploading] =
    useState(false)

  const [imageUrl, setImageUrl] =
    useState('')

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    try {

      setUploading(true)

      const file =
        e.target.files?.[0]

      if (!file) return

      const fileName =
        `${Date.now()}-${file.name}`

      const { error } =
        await supabase.storage
          .from('property-images')
          .upload(fileName, file)

      if (error) {

        alert(error.message)

        setUploading(false)

        return
      }

      const {
        data: { publicUrl }
      } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName)

      setImageUrl(publicUrl)

      onUpload(publicUrl)

      alert('Image uploaded successfully!')

    } catch (error) {

      alert('Upload failed.')

    }

    setUploading(false)
  }

  return (

    <div className="space-y-6">

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="w-full border border-gray-300 rounded-xl p-4"
      />

      {uploading && (

        <p className="text-orange-500">

          Uploading image...

        </p>

      )}

      {imageUrl && (

        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-full h-64 object-cover rounded-2xl"
        />

      )}

    </div>
  )
}