import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import PaymentForm from '@/components/PaymentForm'

const plans = [

  {
    role: 'Tenant',
    price: 100,
    color: 'bg-blue-500'
  },

  {
    role: 'Dealer',
    price: 200,
    color: 'bg-purple-500'
  },

  {
    role: 'Mover',
    price: 300,
    color: 'bg-green-500'
  },

  {
    role: 'Landlord',
    price: 400,
    color: 'bg-orange-500'
  },

  {
    role: 'House Owner',
    price: 500,
    color: 'bg-red-500'
  }

]

export default function MembershipPage() {

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-20">

          <h1 className="text-6xl font-bold text-orange-500 mb-6">

            Sereni Homes Membership

          </h1>

          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">

            Enjoy a 30-day free trial then subscribe
            to continue accessing Sereni Homes services.

          </p>

        </div>

        {/* PRICING */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

          {plans.map((plan) => (

            <div
              key={plan.role}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <div className={`${plan.color} text-white p-6 text-center`}>

                <h2 className="text-3xl font-bold">
                  {plan.role}
                </h2>

              </div>

              <div className="p-8 text-center">

                <h3 className="text-5xl font-bold text-orange-500 mb-6">

                  Ksh {plan.price}

                </h3>

                <p className="text-gray-600 mb-8">

                  Per Month

                </p>

                <div className="space-y-4 mb-10 text-left">

                  <p>✅ 30-Day Free Trial</p>
                  <p>✅ Unlimited Access</p>
                  <p>✅ Property Services</p>
                  <p>✅ Sereni Homes Support</p>

                </div>

                <button className="btn-primary w-full">

                  Choose Plan

                </button>

              </div>

            </div>

          ))}

        </div>

        {/* MPESA */}

        <div className="bg-white rounded-3xl shadow-xl p-12 mt-20 text-center">

          <h2 className="text-4xl font-bold text-orange-500 mb-8">

            Mpesa Payment Instructions

          </h2>

          <div className="max-w-2xl mx-auto text-lg text-gray-700 space-y-6">

            <p>

              Send payment via Mpesa to:

            </p>

            <div className="bg-orange-100 text-orange-600 text-4xl font-bold py-6 rounded-2xl">

              +254114941687

            </div>

            <p>

              After payment, submit your Mpesa
              transaction code to activate your membership.

            </p>

          </div>

        </div>

      <PaymentForm />

</section>

      <Footer />

    </main>
  )
}