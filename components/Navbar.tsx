"use client"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

import {
  Menu,
  X,
  Heart,
  Bell,
  Building2,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

import NotificationBell
from "@/components/NotificationBell"

export default function
Navbar() {

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false)

  const [
    user,
    setUser,
  ] = useState<any>(null)

  // FETCH USER

  async function fetchUser() {

    const {
      data,
    } =
      await supabase.auth.getUser()

    setUser(
      data.user
    )
  }

  // LOGOUT

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href = "/"
  }

  useEffect(() => {

    fetchUser()

  }, [])

  return (

    <header
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-md
        border-b
        border-orange-100
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-5
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          {/* LOGO */}

          <Link

            href="/"

            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                bg-orange-500
                p-3
                rounded-2xl
                text-white
              "
            >

              <Building2
                size={28}
              />

            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-extrabold
                  text-gray-900
                "
              >

                SereniHomes

              </h1>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >

                Find your dream home

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-8
            "
          >

            <Link

              href="/"

              className="
                font-semibold
                text-gray-700
                hover:text-orange-500
                transition
              "
            >

              Home

            </Link>

            <Link

              href="/properties"

              className="
                font-semibold
                text-gray-700
                hover:text-orange-500
                transition
              "
            >

              Properties

            </Link>

            <Link

              href="/favorites"

              className="
                flex
                items-center
                gap-2
                font-semibold
                text-gray-700
                hover:text-orange-500
                transition
              "
            >

              <Heart
                size={18}
              />

              Favorites

            </Link>

            <Link

              href="/dashboard/bookings"

              className="
                font-semibold
                text-gray-700
                hover:text-orange-500
                transition
              "
            >

              Bookings

            </Link>

            <Link

              href="/membership"

              className="
                font-semibold
                text-gray-700
                hover:text-orange-500
                transition
              "
            >

              Membership

            </Link>

            {/* AUTH */}

            {!user && (

              <>

                <Link

                  href="/login"

                  className="
                    font-semibold
                    text-gray-700
                    hover:text-orange-500
                    transition
                  "
                >

                  Login

                </Link>

                <Link

                  href="/register"

                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition
                  "
                >

                  Register

                </Link>

              </>
            )}

            {/* LOGGED IN */}

            {user && (

              <div
                className="
                  flex
                  items-center
                  gap-5
                "
              >

                <NotificationBell />

                <Link

                  href="/dashboard/landlord"

                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition
                  "
                >

                  Dashboard

                </Link>

                <button

                  onClick={
                    handleLogout
                  }

                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition
                  "
                >

                  Logout

                </button>

              </div>
            )}

          </nav>

          {/* MOBILE BUTTON */}

          <button

            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }

            className="
              lg:hidden
              text-gray-700
            "
          >

            {mobileMenuOpen

              ? <X size={32} />

              : <Menu size={32} />}

          </button>

        </div>

        {/* MOBILE MENU */}

        {mobileMenuOpen && (

          <div
            className="
              lg:hidden
              mt-6
              bg-white
              border
              border-orange-100
              rounded-3xl
              p-6
              shadow-lg
            "
          >

            <div
              className="
                flex
                flex-col
                gap-5
              "
            >

              <Link

                href="/"

                className="
                  font-semibold
                  text-gray-700
                "

                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >

                Home

              </Link>

              <Link

                href="/properties"

                className="
                  font-semibold
                  text-gray-700
                "

                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >

                Properties

              </Link>

              <Link

                href="/favorites"

                className="
                  font-semibold
                  text-gray-700
                "

                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >

                Favorites

              </Link>

              <Link

                href="/dashboard/bookings"

                className="
                  font-semibold
                  text-gray-700
                "

                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >

                Bookings

              </Link>

              <Link

                href="/membership"

                className="
                  font-semibold
                  text-gray-700
                "

                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >

                Membership

              </Link>

              {!user && (

                <>

                  <Link

                    href="/login"

                    className="
                      font-semibold
                      text-gray-700
                    "

                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                  >

                    Login

                  </Link>

                  <Link

                    href="/register"

                    className="
                      bg-orange-500
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                      text-center
                    "

                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                  >

                    Register

                  </Link>

                </>
              )}

              {user && (

                <>

                  <Link

                    href="/dashboard/landlord"

                    className="
                      bg-orange-500
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                      text-center
                    "

                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                  >

                    Dashboard

                  </Link>

                  <button

                    onClick={
                      handleLogout
                    }

                    className="
                      bg-red-500
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                    "
                  >

                    Logout

                  </button>

                </>
              )}

            </div>

          </div>
        )}

      </div>

    </header>
  )
}