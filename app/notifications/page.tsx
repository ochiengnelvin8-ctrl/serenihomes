"use client"

import { useEffect, useState }
from "react"

import { supabase }
from "@/lib/supabase"

interface Notification {

  id: number

  title: string

  message: string

  read: boolean

  created_at: string
}

export default function NotificationsPage() {

  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([])

  useEffect(() => {

    fetchNotifications()

  }, [])

  async function fetchNotifications() {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) return

    const { data } =
      await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order(
          "created_at",
          { ascending: false }
        )

    setNotifications(data || [])
  }

  async function markAsRead(
    id: number
  ) {

    await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("id", id)

    fetchNotifications()
  }

  return (

    <main className="min-h-screen bg-orange-50 p-8">

      <div className="max-w-4xl mx-auto">

        <h1
          className="
            text-4xl
            font-bold
            mb-10
            text-orange-600
          "
        >

          Notifications

        </h1>

        <div className="space-y-5">

          {notifications.map(
            (notification) => (

              <div
                key={notification.id}

                className={`
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-6
                  border-l-4

                  ${
                    notification.read

                      ? "border-gray-300"

                      : "border-orange-500"
                  }
                `}
              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                    gap-4
                  "
                >

                  <div>

                    <h2
                      className="
                        text-xl
                        font-bold
                        mb-2
                      "
                    >

                      {notification.title}

                    </h2>

                    <p
                      className="
                        text-gray-700
                        leading-7
                      "
                    >

                      {notification.message}

                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-3
                      "
                    >

                      {new Date(
                        notification.created_at
                      ).toLocaleString()}

                    </p>

                  </div>

                  {!notification.read && (

                    <button
                      onClick={() =>
                        markAsRead(
                          notification.id
                        )
                      }

                      className="
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-semibold
                      "
                    >

                      Mark Read

                    </button>
                  )}

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </main>
  )
}