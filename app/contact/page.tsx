import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="bg-orange-50 min-h-screen">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-orange-500 mb-6">
            Contact Sereni Homes
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our support team is always ready to help tenants,
            homeowners, landlords, movers and dealers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-teal-700 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8 text-lg">

              <div>
                <h3 className="font-bold text-orange-500 mb-2">
                  WhatsApp Support
                </h3>

                <a
                  href="https://wa.me/254115416729"
                  target="_blank"
                  className="text-green-600 hover:underline"
                >
                  +254115416729
                </a>
              </div>

              <div>
                <h3 className="font-bold text-orange-500 mb-2">
                  Email Support
                </h3>

                <a
                  href="mailto:ochiengnevo8@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  ochiengnevo8@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">

            <h2 className="text-3xl font-bold text-teal-700 mb-8">
              Send Us a Message
            </h2>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl p-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl p-4"
              />

              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full border border-gray-300 rounded-xl p-4"
              />

              <button className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}