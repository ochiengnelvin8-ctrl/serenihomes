import LogoutButton from '@/components/LogoutButton'

export default function MoverDashboard() {

  return (
    <main className="min-h-screen bg-orange-50 p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-orange-500">
            Mover Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome Mover.
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Mover Features
        </h2>

        <ul className="space-y-4 text-lg">

          <li>✓ Receive moving requests</li>

          <li>✓ Manage bookings</li>

          <li>✓ Connect with tenants</li>

          <li>✓ Track service history</li>

        </ul>

      </div>

    </main>
  )
}