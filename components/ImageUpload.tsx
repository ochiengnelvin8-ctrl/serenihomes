"use client"

import {
  useState,
} from "react"

import Image from "next/image"

import { supabase }
from "@/lib/supabase"

interface Props {

  onUpload:
    (url: string) => void
}

export default function
ImageUpload({

  onUpload,

}: Props) {

  const [
    uploading,
    setUploading,
  ] = useState(false)

  const [
    preview,
    setPreview,
  ] = useState("")

  async function
  handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    try {

      const file =
        e.target.files?.[0]

      if (!file)
        return

      setUploading(true)

      // FILE NAME

      const fileExt =

        file.name
        .split(".")
        .pop()

      const fileName =

        `${Date.now()}.${fileExt}`

      const filePath =
        `properties/${fileName}`

      // UPLOAD FILE

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

        alert(
          "Upload failed"
        )

        return
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

      setPreview(
        imageUrl
      )

      onUpload(
        imageUrl
      )

    } catch (error) {

      console.error(error)

    } finally {

      setUploading(false)
    }
  }

  return (

    <div>

      {/* PREVIEW */}

      {preview && (

        <div
          className="
            relative
            w-full
            h-64
            mb-5
            rounded-3xl
            overflow-hidden
          "
        >

          <Image

            src={preview}

            alt="Preview"

            fill

            className="
              object-cover
            "
          />

        </div>
      )}

      {/* INPUT */}

      <label
        className="
          flex
          items-center
          justify-center
          w-full
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

          <p
            className="
              text-xl
              font-bold
              text-orange-500
              mb-2
            "
          >

            {uploading

              ? "Uploading..."

              : "Click to upload image"}

          </p>

          <p
            className="
              text-gray-500
            "
          >

            PNG, JPG, WEBP

          </p>

        </div>

      </label>

    </div>
  )
}