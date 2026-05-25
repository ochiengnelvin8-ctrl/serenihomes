import { createServerClient }
from "@supabase/ssr"

import { NextResponse }
from "next/server"

import type { NextRequest }
from "next/server"

export async function proxy(
  request: NextRequest
) {

  let response =
    NextResponse.next({

      request: {
        headers:
          request.headers,
      },
    })

  // CREATE SUPABASE SERVER CLIENT

  const supabase =
    createServerClient(

      process.env
        .NEXT_PUBLIC_SUPABASE_URL!,

      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY!,

      {
        cookies: {

          get(name: string) {

            return request.cookies.get(name)
              ?.value
          },

          set(
            name: string,
            value: string,
            options: any
          ) {

            request.cookies.set({
              name,
              value,
              ...options,
            })

            response =
              NextResponse.next({

                request: {
                  headers:
                    request.headers,
                },
              })

            response.cookies.set({
              name,
              value,
              ...options,
            })
          },

          remove(
            name: string,
            options: any
          ) {

            request.cookies.set({
              name,
              value: "",
              ...options,
            })

            response =
              NextResponse.next({

                request: {
                  headers:
                    request.headers,
                },
              })

            response.cookies.set({
              name,
              value: "",
              ...options,
            })
          },
        },
      }
    )

  // GET USER SESSION

  const {
    data: { user },
  } =
    await supabase.auth.getUser()

  const pathname =
    request.nextUrl.pathname

  // PROTECTED ROUTES

  const protectedRoutes = [

    "/dashboard",

    "/membership",

    "/chat",
  ]

  const isProtectedRoute =
    protectedRoutes.some(
      (route) =>
        pathname.startsWith(route)
    )

  // REDIRECT UNAUTHENTICATED USERS

  if (
    isProtectedRoute &&
    !user
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    )
  }

  // AUTH ROUTES

  const authRoutes = [

    "/login",

    "/signup",
  ]

  const isAuthRoute =
    authRoutes.includes(
      pathname
    )

  // REDIRECT LOGGED-IN USERS AWAY FROM LOGIN/SIGNUP

  if (
    isAuthRoute &&
    user
  ) {

    // GET USER PROFILE

    const {
      data: profile,
    } =
      await supabase
        .from("profiles")
        .select("role")
        .eq(
          "id",
          user.id
        )
        .single()

    // ROLE REDIRECTS

    switch (profile?.role) {

      case "landlord":

        return NextResponse.redirect(
          new URL(
            "/dashboard/landlord",
            request.url
          )
        )

      case "dealer":

        return NextResponse.redirect(
          new URL(
            "/dashboard/dealer",
            request.url
          )
        )

      case "mover":

        return NextResponse.redirect(
          new URL(
            "/dashboard/mover",
            request.url
          )
        )

      case "owner":

        return NextResponse.redirect(
          new URL(
            "/dashboard/owner",
            request.url
          )
        )

      default:

        return NextResponse.redirect(
          new URL(
            "/dashboard/tenant",
            request.url
          )
        )
    }
  }

  return response
}

// ROUTE MATCHER

export const config = {

  matcher: [

    "/dashboard/:path*",

    "/membership/:path*",

    "/chat/:path*",

    "/login",

    "/signup",
  ],
}