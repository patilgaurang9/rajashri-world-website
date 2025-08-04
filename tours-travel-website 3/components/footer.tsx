import Link from "next/link"
import { MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">
                Wanderlust Tours
              </span>
            </Link>
            <p className="text-white leading-relaxed">
              Discover the world with our expertly crafted tours and personalized travel experiences. Your adventure
              awaits!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-orange-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-white hover:text-orange-200 transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/custom-booking" className="text-white hover:text-orange-200 transition-colors">
                  Custom Booking
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white hover:text-orange-200 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-orange-200 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                  Paris, France
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                  Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                  New York, USA
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-orange-200 transition-colors">
                  Dubai, UAE
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-2 text-white">
              <li>123 Travel Street</li>
              <li>Adventure City, AC 12345</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Email: info@wanderlusttours.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-8 text-center text-white">
          <p>&copy; {new Date().getFullYear()} Wanderlust Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
