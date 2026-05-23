import LogoutButton from '@/components/LogoutButton'

export default function OwnerDashboard() {

  return (
    <main className="min-h-screen bg-orange-50 p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-orange-500">
            House Owner Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome House Owner.
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Owner Features
        </h2>

        <ul className="space-y-4 text-lg">

          <li>✓ Upload houses for sale</li>

          <li>✓ Manage property details</li>

          <li>✓ Connect with buyers</li>

          <li>✓ Track inquiries</li>

        </ul>

      </div>

    </main>
  )
}