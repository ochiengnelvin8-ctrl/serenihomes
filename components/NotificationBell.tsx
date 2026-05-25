"use client"

import { useEffect, useState }
from "react"

import Link
from "next/link"

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
  ] = useState<Notification[]>([])

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0)

  useEffect(() => {

    fetchNotifications()

    setupRealtime()

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

    const unread =
      data?.filter(
        (n) => !n.read
      ).length || 0

    setUnreadCount(unread)
  }

  async function setupRealtime() {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) return

    const channel =
      supabase
        .channel(
          "notifications-live"
        )

        .on(
          "postgres_changes",

          {
            event: "INSERT",

            schema: "public",

            table:
              "notifications",

            filter:
              `user_id=eq.${user.id}`,
          },

          (payload) => {

            const newNotification =
              payload.new
              as Notification

            setNotifications(
              (prev) => [

                newNotification,

                ...prev,
              ]
            )

            setUnreadCount(
              (prev) => prev + 1
            )
          }
        )

        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }
  }

  return (

    <Link
      href="/notifications"
      className="
        relative
        inline-flex
        items-center
        justify-center
      "
    >

      {/* BELL */}

      <div className="text-3xl">

        🔔

      </div>

      {/* BADGE */}

      {unreadCount > 0 && (

        <div
          className="
            absolute
            -top-2
            -right-2
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

    </Link>
  )
}