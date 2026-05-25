"use client"

import { useRouter }
from "next/navigation"

import { supabase }
from "@/lib/supabase"

export default function LogoutButton() {

  const router = useRouter()

  const handleLogout =
    async () => {

      const confirmed =
        confirm(
          "Are you sure you want to logout?"
        )

      if (!confirmed) return

      const { error } =
        await supabase.auth.signOut()

      if (error) {

        alert(
          "Logout failed"
        )

        return
      }

      router.push("/login")
    }

  return (

    <button
      onClick={handleLogout}
      className="
        bg-red-500
        hover:bg-red-600
        text-white
        px-5
        py-3
        rounded-xl
        font-semibold
      "
    >

      Logout

    </button>
  )
}