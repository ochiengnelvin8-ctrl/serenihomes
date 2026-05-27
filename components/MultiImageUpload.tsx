"use client"

import {
  useState,
} from "react"

import Image from "next/image"

import { supabase }
from "@/lib/supabase"

interface Props {

  onUploadComplete:
    (urls: string[]) => void
}

export default function
MultiImageUpload({

  onUploadComplete,

}: Props) {

  const [
    uploading,
    setUploading,
  ] = useState(false)

  const [
    images,
    setImages,
  ] = useState<string[]>([])

  async function
  handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    try {

      const files =
        e.target.files

      if (!files)
        return

      setUploading(true)

      const uploadedUrls:
        string[] = []

      for (
        let i = 0;
        i < files.length;
        i++
      ) {

        const file =
          files[i]

        const fileExt =
          file.name
          .split(".")
          .pop()

        const fileName =
          `${Date.now()}-${i}.${fileExt}`

        const filePath =
          `properties/${fileName}`

        // UPLOAD

        const {
          error,
        } = await supabase

          .storage

          .from(
            "property-images"
          )

          .upload(
            filePath,
            file
          )

        if (error) {

          console.error(error)

          continue
        }

        // GET URL

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

        uploadedUrls.push(
          data.publicUrl
        )
      }

      setImages(
        uploadedUrls
      )

      onUploadComplete(
        uploadedUrls
      )

    } catch (error) {

      console.error(error)

    } finally {

      setUploading(false)
    }
  }

  return (

    <div>

      {/* PREVIEW GRID */}

      {images.length > 0 && (

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-4
            mb-6
          "
        >

          {images.map(
            (image, index) => (

              <div

                key={index}

                className="
                  relative
                  h-40
                  rounded-2xl
                  overflow-hidden
                "
              >

                <Image

                  src={image}

                  alt="Gallery"

                  fill

                  className="
                    object-cover
                  "
                />

              </div>
            )
          )}

        </div>
      )}

      {/* INPUT */}

      <label
        className="
          flex
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

        <input

          type="file"

          accept="image/*"

          multiple

          hidden

          onChange={
            handleUpload
          }
        />

        <div
          className="
            text-center
          "
        >

          <h3
            className="
              text-2xl
              font-bold
              text-orange-500
              mb-3
            "
          >

            {uploading

              ? "Uploading..."

              : "Upload Gallery Images"}

          </h3>

          <p
            className="
              text-gray-500
            "
          >

            Select multiple photos

          </p>

        </div>

      </label>

    </div>
  )
}