import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { supabaseServer } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function ContactInfo() {
  const { data: settings } = await supabaseServer
    .from('company_settings')
    .select('*')
    .eq('id', 1)
    .single()

  const address = settings?.address || "1403, Mahaveer Milestone Society, Kolbad, Thane(W) - 400601"
  const phone1 = settings?.phone1 || "9226559359"
  const phone2 = settings?.phone2 || "8369979137"
  const email = settings?.email || "rajashriworld711@gmail.com"
  const mapLink = settings?.maps_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.745672660584!2d72.97225947714955!3d19.206307547864977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b93ed9da3325%3A0x4af7c318c883767e!2sMahaveer%20Milestone!5e0!3m2!1sen!2sin!4v1755670171866!5m2!1sen!2sin"

  const items = [
    {
      icon: <MapPin className="h-5 w-5 text-orange-600" />,
      label: "Office Address",
      value: address,
    },
    {
      icon: <Phone className="h-5 w-5 text-orange-600" />,
      label: "Phone Numbers",
      value: `+91 ${phone1}${phone2 ? ` / ${phone2}` : ""}`,
      link: `tel:+91${phone1}`,
    },
    {
      icon: <Mail className="h-5 w-5 text-orange-600" />,
      label: "Email Address",
      value: email,
      link: `mailto:${email}`,
    },
    {
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      label: "Working Hours",
      value: "Mon – Sat: 9:00 AM – 7:00 PM",
    },
  ]

  return (
    <div className="space-y-5">
      {/* Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-0.5 bg-orange-600 rounded-full" />
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Contact</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">Contact Information</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-orange-50/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                {item.link ? (
                  <a href={item.link} className="text-sm font-semibold text-slate-800 hover:text-orange-600 transition-colors break-all">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h3 className="text-base font-black text-slate-900">Find Us</h3>
        </div>
        <div className="aspect-video w-full bg-slate-100">
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
      </div>
    </div>
  )
}
