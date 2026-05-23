'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Sereni Homes"
            width={70}
            height={70}
          />
          <h1 className="text-2xl font-bold text-orange-500">
            Sereni Homes
          </h1>
         </div>

        <div className="flex gap-6 font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}

<Link href="/membership">
  Membership
</Link>
