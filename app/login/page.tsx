"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      const { error, data } =
        await supabase.auth.signInWithPassword({

          email,
          password,
        })

      if (error) {

        alert(error.message)

        return
      }

      // GET PROFILE

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "id",
            data.user.id
          )
          .single()

      // REDIRECT BY ROLE

      switch (profile?.role) {

        case "landlord":
          router.push(
            "/dashboard/landlord"
          )
          break

        case "dealer":
          router.push(
            "/dashboard/dealer"
          )
          break

        case "mover":
          router.push(
            "/dashboard/mover"
          )
          break

        case "owner":
          router.push(
            "/dashboard/owner"
          )
          break

        default:
          router.push(
            "/dashboard/tenant"
          )
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <main className="min-h-screen bg-orange-50 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">

        <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">
          Welcome Back
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl border"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl border"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </form>

      </div>

    </main>
  )
}