import { FAQSection } from "@/components/faq-section"

export default function FAQsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700">Find answers to common questions about our tours and services</p>
          </div>

          <FAQSection />
        </div>
      </div>
    </div>
  )
}
