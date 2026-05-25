"use client"

import { useEffect, useState }
from "react"

import { useParams }
from "next/navigation"

import { supabase }
from "@/lib/supabase"

export default function ChatPage() {

  const params = useParams()

  const receiverId =
    params.id as string

  const [messages, setMessages] =
    useState<any[]>([])

  const [newMessage, setNewMessage] =
    useState("")

  const [userId, setUserId] =
    useState("")

  // LOAD USER

  useEffect(() => {

    const loadUser =
      async () => {

        const {
          data: { user },
        } =
          await supabase.auth.getUser()

        if (user) {

          setUserId(user.id)
        }
      }

    loadUser()

  }, [])

  // LOAD MESSAGES

  useEffect(() => {

    if (!userId) return

    loadMessages()

  }, [userId])

  const loadMessages =
    async () => {

      const { data, error } =
        await supabase
          .from("messages")
          .select("*")
          .or(
            `
            and(sender_id.eq.${userId},receiver_id.eq.${receiverId}),
            and(sender_id.eq.${receiverId},receiver_id.eq.${userId})
            `
          )
          .order(
            "created_at",
            {
              ascending: true,
            }
          )

      if (!error && data) {

        setMessages(data)
      }
    }

  // SEND MESSAGE

  const sendMessage =
    async () => {

      if (!newMessage.trim())
        return

      const { error } =
        await supabase
          .from("messages")
          .insert({

            sender_id: userId,

            receiver_id:
              receiverId,

            message:
              newMessage,
          })

      if (!error) {

        setNewMessage("")
      }
    }

  // REALTIME SUBSCRIPTION

  useEffect(() => {

    const channel =
      supabase
        .channel("chat-room")

        .on(
          "postgres_changes",

          {
            event: "INSERT",

            schema: "public",

            table: "messages",
          },

          (payload) => {

            setMessages(
              (prev) => [

                ...prev,

                payload.new,
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

  return (

    <main className="min-h-screen bg-orange-50 flex flex-col">

      {/* HEADER */}

      <div className="bg-orange-500 text-white p-5 text-2xl font-bold shadow">

        Sereni Chat

      </div>

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={`max-w-lg p-4 rounded-2xl shadow ${
              msg.sender_id === userId
                ? "ml-auto bg-orange-500 text-white"
                : "bg-white"
            }`}
          >

            <p>
              {msg.message}
            </p>

            <p className="text-xs mt-2 opacity-70">

              {new Date(
                msg.created_at
              ).toLocaleTimeString()}

            </p>

          </div>

        ))}

      </div>

      {/* INPUT */}

      <div className="bg-white p-4 flex gap-3 border-t">

        <input
          type="text"
          placeholder="Type message..."
          value={newMessage}
          onChange={(e) =>
            setNewMessage(
              e.target.value
            )
          }
          className="flex-1 border rounded-xl px-4 py-3"
        />

        <button
          onClick={sendMessage}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl"
        >

          Send

        </button>

      </div>

    </main>
  )
}