import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

export default function LandlordDashboard() {

  return (

    <main className="min-h-screen bg-orange-50 p-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold text-orange-500">
            Landlord Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome Landlord.
          </p>

        </div>

        <div className="flex gap-4">

          <Link
            href="/dashboard/landlord/add-property"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Add Property
          </Link>

          <LogoutButton />

        </div>

      </div>

      <div className="bg-white rounded-3xl p-10 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Landlord Features
        </h2>

        <ul className="space-y-4 text-lg">

          <li>✓ Upload rental properties</li>

          <li>✓ Manage tenants</li>

          <li>✓ Receive inquiries</li>

          <li>✓ Track property listings</li>

        </ul>

      </div>

    </main>
  )
}