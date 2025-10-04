'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'What types of animals do you haul?',
    answer: 'We haul all types of livestock including cattle, horses, sheep, goats, hogs, and other farm animals. Our trailers are equipped to safely transport any livestock you need moved.',
  },
  {
    question: 'How quickly can I get a quote?',
    answer: 'Often within the hour during business hours. We work quickly to evaluate your route and provide competitive pricing.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, we are fully licensed, insured, and experienced in livestock transportation. We maintain all necessary credentials and insurance coverage for safe livestock hauling.',
  },
  {
    question: 'What factors affect the cost of livestock hauling?',
    answer: 'Pricing depends on distance, number of animals, type of livestock, pickup and delivery locations, and timing. Remote areas and urgent shipments may cost more.',
  },
  {
    question: 'Do you handle permits and inspections?',
    answer: 'We handle all necessary DOT compliance and transportation permits. You are responsible for health certificates and state-required livestock documentation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-center text-dark-text mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-neutral-300 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 bg-neutral-50 hover:bg-neutral-100 transition focus:outline-none focus:ring-2 focus:ring-red focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-dark-text pr-8">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-red flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 py-4 bg-white">
                  <p className="text-neutral-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
