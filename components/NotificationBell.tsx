"use client"

import { useEffect, useState }
from "react"

import Link
from "next/link"

import {
  Bell,
  X,
}
from "lucide-react"

import { supabase }
from "@/lib/supabase"

interface Notification {

  id: number

  title: string

  message: string

  read: boolean

  created_at: string
}

export default function NotificationBell() {

  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    open,
    setOpen,
  ] = useState(false)

  useEffect(() => {

    fetchNotifications()

    const channel =
      supabase

        .channel(
          "notifications-channel"
        )

        .on(
          "postgres_changes",

          {
            event: "INSERT",

            schema: "public",

            table:
              "notifications",
          },

          (payload) => {

            // IMPORTANT FIX

            const newNotification =
              payload.new as Notification

            setNotifications(
              (prev) => [

                newNotification,

                ...prev,
              ]
            )
          }
        )

        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function fetchNotifications() {

    setLoading(true)

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      setLoading(false)

      return
    }

    const {
      data,
      error,
    } =
      await supabase

        .from("notifications")

        .select("*")

        .eq(
          "user_id",
          user.id
        )

        .order(
          "created_at",

          {
            ascending: false,
          }
        )

        .limit(10)

    if (error) {

      console.error(error)

      setLoading(false)

      return
    }

    setNotifications(
      data || []
    )

    setLoading(false)
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

    setNotifications(
      (prev) =>

        prev.map(
          (notification) =>

            notification.id === id

              ? {
                  ...notification,

                  read: true,
                }

              : notification
        )
    )
  }

  async function deleteNotification(
    id: number
  ) {

    await supabase

      .from("notifications")

      .delete()

      .eq("id", id)

    setNotifications(
      (prev) =>

        prev.filter(
          (notification) =>

            notification.id !== id
        )
    )
  }

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length

  return (

    <div className="relative">

      {/* BELL BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }

        className="
          relative
          p-3
          rounded-full
          hover:bg-orange-100
          transition
        "
      >

        <Bell
          size={24}
          className="
            text-orange-500
          "
        />

        {/* BADGE */}

        {unreadCount > 0 && (

          <div
            className="
              absolute
              -top-1
              -right-1
              bg-red-500
              text-white
              text-xs
              font-bold
              w-6
              h-6
              rounded-full
              flex
              items-center
              justify-center
            "
          >

            {unreadCount}

          </div>
        )}

      </button>

      {/* DROPDOWN */}

      {open && (

        <div
          className="
            absolute
            right-0
            mt-4
            w-[380px]
            bg-white
            rounded-3xl
            shadow-2xl
            border
            border-orange-100
            overflow-hidden
            z-50
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-orange-500
              "
            >

              Notifications

            </h2>

            <button
              onClick={() =>
                setOpen(false)
              }
            >

              <X
                size={22}
                className="
                  text-gray-500
                "
              />

            </button>

          </div>

          {/* LOADING */}

          {loading && (

            <div
              className="
                p-10
                text-center
              "
            >

              <p
                className="
                  text-gray-500
                "
              >

                Loading...

              </p>

            </div>
          )}

          {/* EMPTY STATE */}

          {!loading &&
            notifications.length === 0 && (

            <div
              className="
                p-10
                text-center
              "
            >

              <p
                className="
                  text-gray-500
                "
              >

                No notifications yet

              </p>

            </div>
          )}

          {/* NOTIFICATIONS LIST */}

          <div
            className="
              max-h-[500px]
              overflow-y-auto
            "
          >

            {notifications.map(
              (notification) => (

                <div
                  key={
                    notification.id
                  }

                  className={`
                    p-5
                    border-b
                    transition

                    ${
                      notification.read

                        ? "bg-white"

                        : "bg-orange-50"
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

                    <div
                      className="
                        flex-1
                      "
                    >

                      <h3
                        className="
                          font-bold
                          text-gray-800
                          mb-2
                        "
                      >

                        {
                          notification.title
                        }

                      </h3>

                      <p
                        className="
                          text-gray-600
                          text-sm
                          leading-6
                        "
                      >

                        {
                          notification.message
                        }

                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-400
                          mt-3
                        "
                      >

                        {new Date(
                          notification.created_at
                        ).toLocaleString()}

                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-2
                      "
                    >

                      {!notification.read && (

                        <button
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }

                          className="
                            text-xs
                            bg-orange-500
                            hover:bg-orange-600
                            text-white
                            px-3
                            py-2
                            rounded-xl
                            transition
                          "
                        >

                          Read

                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }

                        className="
                          text-xs
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-3
                          py-2
                          rounded-xl
                          transition
                        "
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

          {/* FOOTER */}

          <div
            className="
              p-5
              border-t
              bg-orange-50
              text-center
            "
          >

            <Link
              href="/notifications"

              className="
                text-orange-500
                font-semibold
                hover:underline
              "
            >

              View All Notifications

            </Link>

          </div>

        </div>
      )}

    </div>
  )
}