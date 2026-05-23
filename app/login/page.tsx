'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      if (!data.user) {
        alert('Login failed.')
        setLoading(false)
        return
      }

      // GET USER ROLE
      const { data: userData, error: userError } =
        await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

      if (userError) {
        alert(userError.message)
        setLoading(false)
        return
      }

      alert('Login successful!')

      // ROLE-BASED REDIRECTS
      switch (userData.role) {

        case 'tenant':
          router.push('/dashboard/tenant')
          break

        case 'dealer':
          router.push('/dashboard/dealer')
          break

        case 'mover':
          router.push('/dashboard/mover')
          break

        case 'landlord':
          router.push('/dashboard/landlord')
          break

        case 'owner':
          router.push('/dashboard/owner')
          break

        default:
          router.push('/')
      }

    } catch (err) {

      alert('Something went wrong.')

    }

    setLoading(false)
  }

  return (
    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="flex items-center justify-center py-20 px-6">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <div className="text-center mb-10">

            <h1 className="text-4xl font-bold text-orange-500 mb-4">
              Welcome Back
            </h1>

            <p className="text-gray-600">
              Login to continue using Sereni Homes.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading
                ? 'Logging in...'
                : 'Login'}
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="text-orange-500 font-bold hover:underline"
            >
              Create Account
            </Link>

          </div>
        </div>
      </section>

      <Footer />

    </main>
  )
}