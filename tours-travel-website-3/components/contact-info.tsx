import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { supabaseServer } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function ContactInfo() {
  const { data: settings } = await supabaseServer
    .from('company_settings')
    .select('*')
    .eq('id', 1)
    .single()

  const address = settings?.address || "Thane, Maharashtra, India"
  const phone = [settings?.phone1, settings?.phone2].filter(Boolean).join(" / ") || "+91 9226559359 / 8369979137"
  const email = settings?.email || "rajashriworld711@gmail.com"
  const mapLink = settings?.maps_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.745672660584!2d72.97225947714955!3d19.206307547864977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b93ed9da3325%3A0x4af7c318c883767e!2sMahaveer%20Milestone!5e0!3m2!1sen!2sin!4v1755670171866!5m2!1sen!2sin"

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-md rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-orange-500 mt-1 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 mb-1">Office Address</div>
                <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">{address}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-orange-500 mt-1 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 mb-1">Phone Numbers</div>
                <div className="text-gray-600 font-medium">{phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-orange-500 mt-1 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 mb-1">Email Address</div>
                <div className="text-gray-600 font-medium">{email}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200 shadow-md rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Find Us</h3>
          <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
            {mapLink.includes("iframe") ? (
              <div dangerouslySetInnerHTML={{ __html: mapLink }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
            ) : (
              <iframe
                src={mapLink}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
