import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const blogPosts = [

  {
    title: 'How to Find Your Dream Home',
    excerpt:
      'Tips for finding the perfect home in Kenya.',
    date: 'May 2026'
  },

  {
    title: 'Moving Made Easy',
    excerpt:
      'How Sereni Homes connects you with trusted movers.',
    date: 'May 2026'
  },

  {
    title: 'Landlord Best Practices',
    excerpt:
      'Ways landlords can attract quality tenants.',
    date: 'May 2026'
  }

]

export default function BlogPage() {

  return (

    <main className="bg-orange-50 min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-orange-500 mb-6">

            Sereni Homes Blog

          </h1>

          <p className="text-xl text-gray-600">

            Housing tips, moving advice,
            and real estate insights.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {blogPosts.map((post, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold text-orange-500 mb-4">

                {post.title}

              </h2>

              <p className="text-gray-600 mb-6">

                {post.excerpt}

              </p>

              <p className="text-sm text-gray-400">

                {post.date}

              </p>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  )
}