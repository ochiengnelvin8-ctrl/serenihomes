'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LogoutButton() {

  const router = useRouter()

  const handleLogout = async () => {

    await supabase.auth.signOut()

    alert('Logged out successfully.')

    router.push('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition"
    >
      Logout
    </button>
  )
}