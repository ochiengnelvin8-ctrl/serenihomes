"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      full_name: "",
      email: "",
      password: "",
      role: "tenant",
    })

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      // CREATE AUTH USER

      const { data, error } =
        await supabase.auth.signUp({

          email: formData.email,

          password:
            formData.password,
        })

      if (error) {

        alert(error.message)

        return
      }

      // SAVE PROFILE

      if (data.user) {

        const { error: profileError } =
          await supabase
            .from("profiles")
            .insert({

              id: data.user.id,

              full_name:
                formData.full_name,

              email:
                formData.email,

              role:
                formData.role,
            })

        if (profileError) {

          console.log(profileError)
        }
      }

      alert(
        "Signup successful!"
      )

      router.push("/login")

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
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.full_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                full_name:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-xl border"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-xl border"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-xl border"
          />

          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-xl border"
          >

            <option value="tenant">
              Tenant
            </option>

            <option value="landlord">
              Landlord
            </option>

            <option value="dealer">
              Dealer
            </option>

            <option value="mover">
              Mover
            </option>

            <option value="owner">
              House Owner
            </option>

          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

      </div>

    </main>
  )
}