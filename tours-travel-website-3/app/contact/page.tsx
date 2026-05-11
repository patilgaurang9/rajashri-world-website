import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/40">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 pt-8 pb-8 px-4">
        <div className="container mx-auto">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-[0.2em] mb-2">Rajashri World</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Get in <span className="text-orange-600">Touch</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-md">
            Have a question or ready to book? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Left: Contact Info */}
          <div>
            <ContactInfo />
          </div>
          {/* Right: Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
