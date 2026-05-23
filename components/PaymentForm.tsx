'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabase'

export default function PaymentForm() {

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      role: '',
      amount: '',
      payment_code: ''
    })

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

        alert('Please login first.')

        setLoading(false)

        return
      }

      const today = new Date()

      const expiry = new Date()

      expiry.setMonth(
        expiry.getMonth() + 1
      )

      const trialEnd = new Date()

      trialEnd.setDate(
        trialEnd.getDate() + 30
      )

      const { error } =
        await supabase
          .from('subscriptions')
          .insert([
            {
              user_id: user.id,
              role: formData.role,
              amount: Number(
                formData.amount
              ),
              payment_code:
                formData.payment_code,
              status: 'active',
              trial_ends_at:
                trialEnd.toISOString(),
              expires_at:
                expiry.toISOString()
            }
          ])

      if (error) {

        alert(error.message)

        setLoading(false)

        return
      }

      alert(
        'Membership submitted successfully!'
      )

      setFormData({
        role: '',
        amount: '',
        payment_code: ''
      })

    } catch (err) {

      alert('Something went wrong.')

    }

    setLoading(false)
  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-12 mt-20">

      <h2 className="text-4xl font-bold text-orange-500 mb-10 text-center">

        Submit Mpesa Payment

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-2xl mx-auto"
      >

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
          required
        >

          <option value="">
            Select Membership
          </option>

          <option value="tenant">
            Tenant - Ksh 100
          </option>

          <option value="dealer">
            Dealer - Ksh 200
          </option>

          <option value="mover">
            Mover - Ksh 300
          </option>

          <option value="landlord">
            Landlord - Ksh 400
          </option>

          <option value="house_owner">
            House Owner - Ksh 500
          </option>

        </select>

        <input
          type="number"
          placeholder="Amount Paid"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-4"
          required
        />

        <input
          type="text"
          placeholder="Mpesa Transaction Code"
          value={formData.payment_code}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment_code:
                e.target.value
            })
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
            ? 'Submitting...'
            : 'Activate Membership'}

        </button>

      </form>

    </div>
  )
}