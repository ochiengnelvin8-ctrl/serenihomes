import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className="py-20 max-w-5xl mx-auto px-6">
        <h1 className="section-title">About Sereni Homes</h1>

        <p className="text-lg leading-relaxed text-gray-700">
          Sereni Homes is a modern housing and community platform
          designed to connect people seeking homes with landlords,
          homeowners, movers, and household service providers.

          Our goal is to create a warm, trusted, and welcoming
          ecosystem where everyone feels at home.
        </p>
      </section>

      <Footer />
    </main>
  )
}