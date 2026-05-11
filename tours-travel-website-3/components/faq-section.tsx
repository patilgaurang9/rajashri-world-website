"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqs } from "@/lib/data"
import { Plus, Minus } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      {/* Section Heading */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
          <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Help Center</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Frequently Asked <span className="text-orange-600">Questions</span>
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-lg">
          Everything you need to know about our tours, bookings, and support.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl bg-white transition hover:border-orange-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <span className="text-base md:text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {isOpen ? (
                  <Minus className="h-6 w-6 text-orange-500" />
                ) : (
                  <Plus className="h-6 w-6 text-orange-500" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
