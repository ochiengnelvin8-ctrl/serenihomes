"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

interface Props {

  propertyId: string

  receiverId: string
}

interface Message {

  id: string

  sender_id: string

  receiver_id: string

  message: string

  created_at: string
}

export default function
ChatBox({

  propertyId,

  receiverId,

}: Props) {

  const [
    userId,
    setUserId,
  ] = useState("")

  const [
    messages,
    setMessages,
  ] = useState<Message[]>([])

  const [
    newMessage,
    setNewMessage,
  ] = useState("")

  const [
    loading,
    setLoading,
  ] = useState(false)

  const bottomRef =
    useRef<HTMLDivElement>(
      null
    )

  // FETCH CURRENT USER

  async function fetchUser() {

    const {
      data,
    } =
      await supabase.auth.getUser()

    if (data.user) {

      setUserId(
        data.user.id
      )
    }
  }

  // FETCH MESSAGES

  async function fetchMessages() {

    try {

      const {
        data,
        error,
      } = await supabase

        .from("messages")

        .select("*")

        .eq(
          "property_id",
          propertyId
        )

        .order(
          "created_at",
          {
            ascending: true,
          }
        )

      if (error) {

        console.error(error)

        return
      }

      setMessages(
        (data || []) as Message[]
      )

    } catch (error) {

      console.error(error)
    }
  }

  // SEND MESSAGE

  async function sendMessage(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (
      !newMessage.trim()
    ) return

    try {

      setLoading(true)

      const {
        error,
      } = await supabase

        .from("messages")

        .insert({

          property_id:
            propertyId,

          sender_id:
            userId,

          receiver_id:
            receiverId,

          message:
            newMessage,
        })

      if (error) {

        console.error(error)

        alert(
          "Failed to send message"
        )

        return
      }

      setNewMessage("")

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // AUTO SCROLL

  useEffect(() => {

    bottomRef.current
      ?.scrollIntoView({

        behavior: "smooth",
      })

  }, [messages])

  // INITIAL LOAD + REALTIME

  useEffect(() => {

    fetchUser()

    fetchMessages()

    const channel = supabase

      .channel(
        "messages-channel"
      )

      .on(

        "postgres_changes",

        {
          event: "INSERT",

          schema: "public",

          table: "messages",
        },

        (payload) => {

          const newMsg =
            payload.new as Message

          setMessages(
            (prev) => [

              ...prev,

              newMsg,
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

    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
          bg-orange-500
          text-white
          px-6
          py-5
          font-bold
          text-xl
        "
      >

        Property Chat

      </div>

      {/* CHAT AREA */}

      <div
        className="
          h-[450px]
          overflow-y-auto
          p-6
          space-y-4
          bg-orange-50
        "
      >

        {messages.length === 0 && (

          <div
            className="
              text-center
              text-gray-500
              pt-20
            "
          >

            No messages yet.
            Start the conversation.

          </div>
        )}

        {messages.map(
          (msg) => (

            <div

              key={msg.id}

              className={`
                flex

                ${
                  msg.sender_id ===
                  userId

                    ? "justify-end"

                    : "justify-start"
                }
              `}
            >

              <div
                className={`
                  max-w-[80%]
                  px-5
                  py-4
                  rounded-3xl
                  shadow-sm
                  break-words

                  ${
                    msg.sender_id ===
                    userId

                      ? `
                        bg-orange-500
                        text-white
                      `

                      : `
                        bg-white
                        text-gray-800
                      `
                  }
                `}
              >

                <p
                  className="
                    leading-7
                  "
                >

                  {
                    msg.message
                  }

                </p>

                <p
                  className={`
                    text-xs
                    mt-2

                    ${
                      msg.sender_id ===
                      userId

                        ? `
                          text-orange-100
                        `

                        : `
                          text-gray-400
                        `
                    }
                  `}
                >

                  {new Date(
                    msg.created_at
                  ).toLocaleString()}

                </p>

              </div>

            </div>
          )
        )}

        <div
          ref={bottomRef}
        />

      </div>

      {/* INPUT */}

      <form

        onSubmit={
          sendMessage
        }

        className="
          flex
          gap-3
          p-5
          border-t
          bg-white
        "
      >

        <input

          type="text"

          placeholder="
          Type your message...
          "

          value={newMessage}

          onChange={(e) =>
            setNewMessage(
              e.target.value
            )
          }

          className="
            flex-1
            border
            rounded-2xl
            px-5
            py-4
            outline-none
            focus:border-orange-500
          "
        />

        <button

          type="submit"

          disabled={loading}

          className="
            bg-orange-500
            hover:bg-orange-600
            disabled:opacity-50
            text-white
            px-7
            rounded-2xl
            font-bold
            transition
          "
        >

          {loading

            ? "Sending..."

            : "Send"}

        </button>

      </form>

    </div>
  )
}