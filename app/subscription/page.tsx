import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const plans = [
  {
    role: 'Tenant',
    price: 'Ksh 100/month',
    color: 'bg-orange-100'
  },
  {
    role: 'Dealer',
    price: 'Ksh 200/month',
    color: 'bg-green-100'
  },
  {
    role: 'Mover',
    price: 'Ksh 300/month',
    color: 'bg-blue-100'
  },
  {
    role: 'Landlord',
    price: 'Ksh 400/month',
    color: 'bg-yellow-100'
  },
  {
    role: 'House Owner',
    price: 'Ksh 500/month',
    color: 'bg-purple-100'
  }
]

export default function SubscriptionPage() {
  return (
    <main className="bg-orange-50 min-h-screen">
      <Navbar />

      <section className="py-20 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-orange-500 mb-6">
            Subscription Plans
          </h1>

          <p className="text-lg text-gray-600">
            Choose a plan after your free 30-day trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.color} rounded-3xl p-10 shadow-lg`}
            >
              <h2 className="text-3xl font-bold mb-4 text-teal-700">
                {plan.role}
              </h2>

              <p className="text-2xl font-bold mb-6">
                {plan.price}
              </p>

              <ul className="space-y-3 mb-8">
                <li>✓ 30-Day Free Trial</li>
                <li>✓ Access to Sereni Homes</li>
                <li>✓ Connect with community</li>
              </ul>

              <button className="btn-primary w-full">
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white mt-16 p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-3xl font-bold text-orange-500 mb-6">
            Mpesa Payments
          </h2>

          <p className="text-lg mb-4">
            Send payments to:
          </p>

          <div className="text-3xl font-bold text-green-600">
            +254114941687
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}