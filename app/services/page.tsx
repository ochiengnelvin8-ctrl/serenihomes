import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const services = [
  {
    title: 'Tenants',
    description: 'Find quality homes quickly and safely.'
  },
  {
    title: 'Landlords',
    description: 'List and manage rental properties.'
  },
  {
    title: 'House Owners',
    description: 'Connect with buyers and tenants.'
  },
  {
    title: 'Movers',
    description: 'Offer moving and relocation services.'
  },
  {
    title: 'Dealers',
    description: 'Sell furniture and household goods.'
  }
]

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <h1 className="section-title">Our Services</h1>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-orange-500 mb-4">
                {service.title}
              </h2>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}