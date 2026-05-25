"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Menu,
  X,
  Bell,
  Heart,
  LayoutDashboard,
  LogOut,
} from "lucide-react"

import { supabase } from "@/lib/supabase"

interface Profile {
  role: string
}

export default function Navbar() {

  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  const [user, setUser] =
    useState<any>(null)

  const [profile, setProfile] =
    useState<Profile | null>(null)

  useEffect(() => {

    checkUser()

  }, [])

  async function checkUser() {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    setUser(user)

    if (user) {

      const { data } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

      if (data) {

        setProfile(data)
      }
    }
  }

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href = "/login"
  }

  function getDashboardLink() {

    switch (profile?.role) {

      case "landlord":

        return "/dashboard/landlord"

      case "dealer":

        return "/dashboard/dealer"

      case "mover":

        return "/dashboard/mover"

      case "owner":

        return "/dashboard/owner"

      default:

        return "/dashboard/tenant"
    }
  }

  const navLinks = [

    {
      href: "/",
      label: "Home",
    },

    {
      href: "/properties",
      label: "Properties",
    },

    {
      href: "/favorites",
      label: "Favorites",
    },

    {
      href: "/membership",
      label: "Membership",
    },

    {
      href: "/blog",
      label: "Blog",
    },
  ]

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
        shadow-sm
      "
    >

      <nav
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >

        {/* LOGO */}

        <Link
          href="/"

          className="
            text-3xl
            font-extrabold
            text-orange-500
            tracking-tight
          "
        >

          SereniHomes

        </Link>

        {/* DESKTOP NAVIGATION */}

        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >

          {navLinks.map((link) => (

            <Link
              key={link.href}

              href={link.href}

              className={`
                font-semibold
                transition
                duration-200

                ${
                  pathname === link.href

                    ? "text-orange-500"

                    : "text-gray-700 hover:text-orange-500"
                }
              `}
            >

              {link.label}

            </Link>
          ))}

        </div>

        {/* RIGHT SECTION */}

        <div
          className="
            hidden
            md:flex
            items-center
            gap-4
          "
        >

          {/* USER LOGGED IN */}

          {user ? (

            <>

              {/* FAVORITES ICON */}

              <Link
                href="/favorites"

                className="
                  p-3
                  rounded-full
                  hover:bg-orange-100
                  transition
                "
              >

                <Heart
                  className="
                    text-orange-500
                  "
                  size={22}
                />

              </Link>

              {/* NOTIFICATIONS */}

              <Link
                href="/notifications"

                className="
                  p-3
                  rounded-full
                  hover:bg-orange-100
                  transition
                "
              >

                <Bell
                  className="
                    text-orange-500
                  "
                  size={22}
                />

              </Link>

              {/* DASHBOARD */}

              <Link
                href={getDashboardLink()}

                className="
                  flex
                  items-center
                  gap-2
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                "
              >

                <LayoutDashboard
                  size={18}
                />

                Dashboard

              </Link>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}

                className="
                  flex
                  items-center
                  gap-2
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                "
              >

                <LogOut
                  size={18}
                />

                Logout

              </button>

            </>

          ) : (

            <>
              {/* LOGIN */}

              <Link
                href="/login"

                className="
                  font-semibold
                  text-gray-700
                  hover:text-orange-500
                "
              >

                Login

              </Link>

              {/* SIGNUP */}

              <Link
                href="/signup"

                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                "
              >

                Sign Up

              </Link>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }

          className="
            md:hidden
            text-gray-700
          "
        >

          {mobileMenuOpen ? (

            <X size={30} />

          ) : (

            <Menu size={30} />

          )}

        </button>

      </nav>

      {/* MOBILE MENU */}

      {mobileMenuOpen && (

        <div
          className="
            md:hidden
            bg-white
            border-t
            border-orange-100
            px-6
            py-6
            space-y-5
          "
        >

          {navLinks.map((link) => (

            <Link
              key={link.href}

              href={link.href}

              onClick={() =>
                setMobileMenuOpen(false)
              }

              className={`
                block
                text-lg
                font-semibold

                ${
                  pathname === link.href

                    ? "text-orange-500"

                    : "text-gray-700"
                }
              `}
            >

              {link.label}

            </Link>
          ))}

          {/* MOBILE AUTH */}

          {user ? (

            <>

              <Link
                href={getDashboardLink()}

                className="
                  block
                  bg-orange-500
                  text-white
                  text-center
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                Dashboard

              </Link>

              <button
                onClick={handleLogout}

                className="
                  w-full
                  bg-red-500
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                href="/login"

                className="
                  block
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
                  block
                  bg-orange-500
                  text-white
                  text-center
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                Sign Up

              </Link>

            </>
          )}

        </div>
      )}

    </header>
  )
}