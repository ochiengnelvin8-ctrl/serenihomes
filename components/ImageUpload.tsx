"use client"

import { useState }
from "react"

import {
  Upload,
  Loader2,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

interface Props {

  onUpload: (
    url: string
  ) => void
}

export default function ImageUpload({
  onUpload,
}: Props) {

  const [
    uploading,
    setUploading,
  ] = useState(false)

  async function handleUpload(
    event:
      React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0]

    if (!file)
      return

    setUploading(true)

    const fileExt =
      file.name.split(".").pop()

    const fileName =

      `${Date.now()}.${fileExt}`

    const {
      error,
    } =
      await supabase.storage

        .from(
          "property-images"
        )

        .upload(
          fileName,
          file
        )

    if (error) {

      console.error(error)

      alert(
        "Upload failed"
      )

      setUploading(false)

      return
    }

    const {
      data,
    } =
      supabase.storage

        .from(
          "property-images"
        )

        .getPublicUrl(
          fileName
        )

    onUpload(
      data.publicUrl
    )

    setUploading(false)
  }

  return (

    <div>

      <label
        className="
          flex
          flex-col
          items-center
          justify-center
          border-2
          border-dashed
          border-orange-300
          rounded-3xl
          p-10
          cursor-pointer
          hover:bg-orange-50
          transition
        "
      >

        {uploading ? (

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Loader2
              className="
                animate-spin
                text-orange-500
              "
            />

            Uploading...

          </div>

        ) : (

          <>

            <Upload
              size={40}
              className="
                text-orange-500
                mb-4
              "
            />

            <p
              className="
                font-semibold
              "
            >

              Click to upload image

            </p>

          </>
        )}

        <input
          type="file"

          accept="image/*"

          onChange={
            handleUpload
          }

          className="hidden"
        />

      </label>

    </div>
  )
}