import LogoutButton from '@/components/LogoutButton'

export default function TenantDashboard() {

  return (
    <main className="min-h-screen bg-orange-50 p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-orange-500">
            Tenant Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to Sereni Homes.
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Tenant Features
        </h2>

        <ul className="space-y-4 text-lg">

          <li>✓ Browse properties</li>

          <li>✓ Contact landlords</li>

          <li>✓ Save favorite homes</li>

          <li>✓ Access movers & dealers</li>

        </ul>

      </div>

    </main>
  )
}