import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <main>
      <Navbar />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <h1 className="section-title">Latest Blog Posts</h1>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Moving Tips
            </h2>

            <p>
              Learn how to move efficiently and stress-free.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Best Home Decor Ideas
           </h2>

            <p>
              Affordable ways to make your home beautiful.
            </p>
          </div>

         