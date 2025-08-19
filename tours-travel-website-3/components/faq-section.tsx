"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { faqs } from "@/lib/data"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index} className="bg-white border-gray-200 shadow-lg">
          <CardContent className="p-0">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-orange-50 transition-colors"
            >
              <h3 className="text-lg font-semibold pr-4 text-gray-900">{faq.question}</h3>
              <ChevronDown
                className={`h-5 w-5 text-orange-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
