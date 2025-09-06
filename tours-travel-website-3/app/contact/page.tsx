import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-2">
        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          <div className="flex flex-col h-full">
            <ContactForm />
          </div>
          <div className="flex flex-col h-full">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
