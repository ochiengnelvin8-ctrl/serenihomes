export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Sereni Homes
          </h2>
          <p>
            Care. Comfort. Community.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
         </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p>WhatsApp: +254115416729</p>
          <p>Email: ochiengnevo8@gmail.com</p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-white/20">
        © 2026 Sereni Homes. All rights reserved.
      </div>
    </footer>
  )
}