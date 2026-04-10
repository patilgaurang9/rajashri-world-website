import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
          alt="Contact background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative container mx-auto px-2">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch min-h-[700px]">
          <div className="flex flex-col h-full">
            <ContactInfo />
          </div>
          <div className="flex flex-col h-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
