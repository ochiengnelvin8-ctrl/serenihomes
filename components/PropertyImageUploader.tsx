"use client"

import {
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string

  onUploadComplete?: () => void
}

export default function
PropertyImageUploader({

  propertyId,

  onUploadComplete,

}: Props) {

  const [
    uploading,
    setUploading,
  ] = useState(false)

  async function handleUpload(

    e:
      React.ChangeEvent<
        HTMLInputElement
      >
  ) {

    const files =
      e.target.files

    if (
      !files ||
      files.length === 0
    ) return

    try {

      setUploading(true)

      for (
        let i = 0;
        i < files.length;
        i++
      ) {

        const file =
          files[i]

        const fileExt =

          file.name.split(".")
          .pop()

        const fileName =

          `${Date.now()}-${Math.random()}.${fileExt}`

        const filePath =

          `${fileName}`

        // UPLOAD TO STORAGE

        const {
          error: uploadError,
        } = await supabase

          .storage

          .from(
            "property-images"
          )

          .upload(
            filePath,
            file
          )

        if (uploadError) {

          console.error(
            uploadError
          )

          continue
        }

        // GET PUBLIC URL

        const {
          data,
        } = supabase

          .storage

          .from(
            "property-images"
          )

          .getPublicUrl(
            filePath
          )

        const imageUrl =

          data.publicUrl

        // SAVE TO DATABASE

        await supabase

          .from(
            "property_images"
          )

          .insert({

            property_id:
              propertyId,

            image_url:
              imageUrl,
          })
      }

      alert(
        "Images uploaded successfully!"
      )

      if (
        onUploadComplete
      ) {

        onUploadComplete()
      }

    } catch (error) {

      console.error(error)

      alert(
        "Upload failed"
      )

    } finally {

      setUploading(false)
    }
  }

  return (

    <div>

      <label
        className="
          block
          mb-3
          font-semibold
        "
      >

        Upload Property Images

      </label>

      <input

        type="file"

        multiple

        accept="image/*"

        onChange={
          handleUpload
        }

        className="
          w-full
          border
          rounded-2xl
          p-4
        "
      />

      {uploading && (

        <p
          className="
            mt-4
            text-orange-500
            font-semibold
          "
        >

          Uploading images...

        </p>
      )}

    </div>
  )
}