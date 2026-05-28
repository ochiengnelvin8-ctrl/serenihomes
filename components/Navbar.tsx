"use client"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

import {
  Menu,
  X,
  Home,
  Building2,
  Heart,
  LayoutDashboard,
  CalendarDays,
  LogOut,
  User,
} from "lucide-react"

import { supabase }
from "@/lib/supabase"

export default function Navbar() {

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

    setUser(data.user)
  }

  // LOGOUT

  async function logout() {

    await supabase.auth.signOut()

    window.location.href = "/"
  }

  useEffect(() => {

    fetchUser()

  }, [])

  return (

    <nav
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-lg
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
              "
            >

              <Home
                size={28}
                className="
                  text-white
                "
              />

            </div>

            <div>

              <h1
                className="
                  text-3xl
                  font-black
                  text-gray-900
                "
              >

                SereniHomes

              </h1>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >

                Premium Rentals

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}

          <div
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
                hover:text-orange-500
                transition
              "
            >

              Properties

            </Link>

            {user && (

              <>

                <Link
                  href="/favorites"
                  className="
                    font-semibold
                    hover:text-orange-500
                    transition
                  "
                >

                  Favorites

                </Link>

                <Link
                  href="/dashboard/landlord"
                  className="
                    font-semibold
                    hover:text-orange-500
                    transition
                  "
                >

                  Dashboard

                </Link>

                <Link
                  href="/dashboard/bookings"
                  className="
                    font-semibold
                    hover:text-orange-500
                    transition
                  "
                >

                  Bookings

                </Link>

              </>
            )}

          </div>

          {/* RIGHT SIDE */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-4
            "
          >

            {!user ? (

              <>

                <Link
                  href="/login"
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    font-semibold
                    hover:bg-orange-100
                    transition
                  "
                >

                  Login

                </Link>

                <Link
                  href="/signup"
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

                  Sign Up

                </Link>

              </>

            ) : (

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    bg-orange-50
                    px-4
                    py-3
                    rounded-2xl
                  "
                >

                  <User
                    size={20}
                    className="
                      text-orange-500
                    "
                  />

                  <span
                    className="
                      font-medium
                      max-w-[180px]
                      truncate
                    "
                  >

                    {user.email}

                  </span>

                </div>

                <button

                  onClick={logout}

                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    font-semibold
                    flex
                    items-center
                    gap-2
                    transition
                  "
                >

                  <LogOut
                    size={18}
                  />

                  Logout

                </button>

              </div>
            )}

          </div>

          {/* MOBILE BUTTON */}

          <button

            onClick={() =>

              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }

            className="
              lg:hidden
            "
          >

            {mobileMenuOpen ? (

              <X size={34} />

            ) : (

              <Menu size={34} />

            )}

          </button>

        </div>

        {/* MOBILE MENU */}

        {mobileMenuOpen && (

          <div
            className="
              lg:hidden
              mt-6
              bg-white
              rounded-3xl
              shadow-xl
              p-6
              space-y-5
            "
          >

            <Link
              href="/"
              className="
                flex
                items-center
                gap-3
                font-semibold
              "
            >

              <Home size={22} />

              Home

            </Link>

            <Link
              href="/properties"
              className="
                flex
                items-center
                gap-3
                font-semibold
              "
            >

              <Building2
                size={22}
              />

              Properties

            </Link>

            {user && (

              <>

                <Link
                  href="/favorites"
                  className="
                    flex
                    items-center
                    gap-3
                    font-semibold
                  "
                >

                  <Heart
                    size={22}
                  />

                  Favorites

                </Link>

                <Link
                  href="/dashboard/landlord"
                  className="
                    flex
                    items-center
                    gap-3
                    font-semibold
                  "
                >

                  <LayoutDashboard
                    size={22}
                  />

                  Dashboard

                </Link>

                <Link
                  href="/dashboard/bookings"
                  className="
                    flex
                    items-center
                    gap-3
                    font-semibold
                  "
                >

                  <CalendarDays
                    size={22}
                  />

                  Bookings

                </Link>

              </>
            )}

            {!user ? (

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  pt-4
                "
              >

                <Link
                  href="/login"
                  className="
                    border
                    text-center
                    py-3
                    rounded-2xl
                    font-semibold
                  "
                >

                  Login

                </Link>

                <Link
                  href="/signup"
                  className="
                    bg-orange-500
                    text-white
                    text-center
                    py-3
                    rounded-2xl
                    font-bold
                  "
                >

                  Sign Up

                </Link>

              </div>

            ) : (

              <button

                onClick={logout}

                className="
                  w-full
                  bg-red-500
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                <LogOut
                  size={20}
                />

                Logout

              </button>
            )}

          </div>
        )}

      </div>

    </nav>
  )
}