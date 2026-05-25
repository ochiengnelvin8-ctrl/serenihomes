"use client"

import { useState } from "react"
import Link from "next/link"

const plans = [
  {
    title: "Tenant",
    price: 100,
    color: "bg-orange-100",
    button: "bg-orange-500",
    features: [
      "Browse properties",
      "Contact landlords",
      "Save favorite homes",
      "30-day free trial",
    ],
  },

  {
    title: "Dealer",
    price: 200,
    color: "bg-yellow-100",
    button: "bg-yellow-500",
    features: [
      "Advertise household goods",
      "Reach new customers",
      "Showcase services",
      "30-day free trial",
    ],
  },

  {
    title: "Mover",
    price: 300,
    color: "bg-amber-100",
    button: "bg-amber-600",
    features: [
      "List moving services",
      "Connect with tenants",
      "Receive moving requests",
      "30-day free trial",
    ],
  },

  {
    title: "Landlord",
    price: 400,
    color: "bg-orange-200",
    button: "bg-orange-600",
    features: [
      "Upload properties",
      "Manage tenants",
      "Track listings",
      "30-day free trial",
    ],
  },

  {
    title: "House Owner",
    price: 500,
    color: "bg-yellow-200",
    button: "bg-yellow-700",
    features: [
      "Sell or rent homes",
      "Connect with buyers",
      "Premium visibility",
      "30-day free trial",
    ],
  },
]

export default function MembershipPage() {

  const [loading, setLoading] = useState(false)

  const handlePayment = async (
    amount: number,
    plan: string
  ) => {

    const phone = prompt(
      "Enter Mpesa Phone Number\nExample: 254712345678"
    )

    if (!phone) return

    try {

      setLoading(true)

      const response = await fetch(
        "/api/mpesa/stkpush",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            phone,
            amount,
            plan,
          }),
        }
      )

      const data = await response.json()

      console.log(data)

      if (
        data.ResponseCode === "0"
      ) {

        alert(
          "STK Push sent successfully.\nCheck your phone and enter Mpesa PIN."
        )

      } else {

        alert(
          data.errorMessage ||
          "Payment request failed."
        )
      }

    } catch (error) {

      console.log(error)

      alert(
        "Something went wrong."
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <main className="min-h-screen bg-orange-50 py-16 px-6">

      {/* HEADER */}

      <section className="max-w-5xl mx-auto text-center mb-14">

        <h1 className="text-5xl font-bold text-orange-600 mb-4">
          Sereni Homes Membership
        </h1>

        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Join Sereni Homes and connect with
          tenants, landlords, movers,
          house owners, and dealers in a warm,
          trusted housing community.
        </p>

      </section>

      {/* PLANS */}

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {plans.map((plan, index) => (

          <div
            key={index}
            className={`${plan.color} rounded-3xl shadow-lg p-8 flex flex-col justify-between`}
          >

            <div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {plan.title}
              </h2>

              <p className="text-5xl font-bold text-orange-700 mb-2">
                Ksh {plan.price}
              </p>

              <p className="text-gray-600 mb-6">
                per month after 30-day free trial
              </p>

              <ul className="space-y-3 mb-8">

                {plan.features.map((feature, i) => (

                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    ✅ {feature}
                  </li>

                ))}

              </ul>

            </div>

            <button
              onClick={() =>
                handlePayment(
                  plan.price,
                  plan.title
                )
              }
              disabled={loading}
              className={`${plan.button} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition`}
            >

              {loading
                ? "Processing..."
                : `Pay Ksh ${plan.price}`}

            </button>

          </div>

        ))}

      </section>

      {/* MANUAL PAYMENT */}

      <section className="max-w-4xl mx-auto mt-20 bg-white rounded-3xl shadow-md p-10">

        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Alternative Payment Method
        </h2>

        <div className="space-y-4 text-center text-gray-700 text-lg">

          <p>
            You can also pay manually via Mpesa:
          </p>

          <div className="bg-orange-100 rounded-2xl p-6">

            <p className="font-semibold text-xl mb-2">
              Mpesa Number
            </p>

            <p className="text-3xl font-bold text-orange-700">
              +254114941687
            </p>

          </div>

          <p>
            After payment, contact support
            for account activation.
          </p>

        </div>

      </section>

      {/* SUPPORT */}

      <section className="max-w-4xl mx-auto mt-16 bg-white rounded-3xl shadow-md p-10">

        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Need Help?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <a
            href="https://wa.me/254115416729"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl text-center transition"
          >

            <h3 className="text-2xl font-bold mb-2">
              WhatsApp Support
            </h3>

            <p>
              +254115416729
            </p>

          </a>

          <a
            href="mailto:ochiengnevo8@gmail.com"
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl text-center transition"
          >

            <h3 className="text-2xl font-bold mb-2">
              Email Support
            </h3>

            <p>
              ochiengnevo8@gmail.com
            </p>

          </a>

        </div>

      </section>

      {/* BACK HOME */}

      <section className="text-center mt-14">

        <Link
          href="/"
          className="text-orange-600 font-semibold hover:underline"
        >
          ← Back to Home
        </Link>

      </section>

    </main>
  )
}