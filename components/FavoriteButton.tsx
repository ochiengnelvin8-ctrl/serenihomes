'use client'

import { supabase } from '@/lib/supabase'

export default function FavoriteButton({
  propertyId
}: {
  propertyId: string
}) {

  const saveFavorite = async () => {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {

      alert('Login first')

      return
    }

    const { error } =
      await supabase
        .from('favorites')
        .insert([
          {
            user_id: user.id,
            property_id: propertyId
          }
        ])

    if (error) {

      alert(error.message)

      return
    }

    alert('Saved!')
  }

  return (

    <button
      onClick={saveFavorite}
      className="bg-orange-500 text-white px-6 py-3 rounded-xl"
    >

      ❤️ Save Home

    </button>
  )
}