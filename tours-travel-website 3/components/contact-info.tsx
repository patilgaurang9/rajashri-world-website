import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Address</div>
                <div className="text-gray-600">123 Travel Street, Adventure City, AC 12345</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Phone</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">info@wanderlusttours.com</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Business Hours</div>
                <div className="text-gray-600">
                  Mon - Fri: 9:00 AM - 6:00 PM
                  <br />
                  Sat - Sun: 10:00 AM - 4:00 PM
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Find Us</h3>
          <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
