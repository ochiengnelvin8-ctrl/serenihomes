'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'tenant'
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {

      // CREATE AUTH USER
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      const user = data.user

      if (!user) {
        alert('User creation failed.')
        setLoading(false)
        return
      }

      // CREATE 30-DAY TRIAL
      const today = new Date()

      const trialEnd = new Date()

      trialEnd.setDate(today.getDate() + 30)

      // SAVE USER TO DATABASE
      const { error: dbError } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            full_name: formData.fullName,
            email: formData.email,
            role: formData.role,
            subscription_active: false,
            trial_start: today,
            trial_end: trialEnd
          }
        ])

      if (dbError) {
        alert(dbError.message)
        setLoading(false)
        return
      }

      alert('Account created successfully!')

      router.push('/login')

    } catch (err) {
      alert('Something went wrong.')
    }

    setLoading(false)
  }

  return (
    <main className="bg-orange-50 min-h-screen">
      <Navbar />

      <section className="flex justify-center py-20 px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-orange-500 mb-4">
              Create Your Account
            </h1>

            <p className="text-gray-600">
              Join the Sereni Homes community today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4"
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4"
            >
              <option value="tenant">Tenant</option>
              <option value="dealer">Dealer</option>
              <option value="mover">Mover</option>
              <option value="landlord">Landlord</option>
              <option value="owner">House Owner</option>
            </select>

            <div className="bg-orange-100 p-4 rounded-xl">
              <p className="font-semibold text-orange-600">
                Every account includes a FREE 30-day trial.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}