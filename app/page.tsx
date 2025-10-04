import QuoteForm from '@/components/QuoteForm';
import FAQ from '@/components/FAQ';
import Image from 'next/image';

export const metadata = {
  title: 'Livestock Hauling Quotes | American Livestock Hauling',
  description: 'Get instant quotes from licensed, insured livestock haulers nationwide. Fast, reliable cattle hauling, horse transport, and livestock shipping services.',
  keywords: 'cattle hauling, livestock hauling, cow hauling, cattle transport, horse transport, livestock shipping, cattle shipping',
  openGraph: {
    title: 'Livestock Hauling Quotes | American Livestock Hauling',
    description: 'Get instant quotes from licensed, insured livestock haulers nationwide. Fast, reliable cattle hauling, horse transport, and livestock shipping services.',
    url: 'https://wehavllivestock.com',
    siteName: 'American Livestock Hauling',
    images: [
      {
        url: '/alhimage.png',
        width: 1200,
        height: 630,
        alt: 'American Livestock Hauling',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livestock Hauling Quotes | American Livestock Hauling',
    description: 'Get instant quotes from licensed, insured livestock haulers nationwide. Fast, reliable cattle hauling, horse transport, and livestock shipping services.',
    images: ['/alhimage.png'],
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://wehavllivestock.com/#organization',
                name: 'American Livestock Hauling',
                url: 'https://wehavllivestock.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://wehavllivestock.com/alh.png',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  availableLanguage: 'English',
                },
              },
              {
                '@type': 'Service',
                '@id': 'https://wehavllivestock.com/#service',
                name: 'Livestock Hauling Services',
                provider: {
                  '@id': 'https://wehavllivestock.com/#organization',
                },
                serviceType: 'Livestock Transportation',
                areaServed: {
                  '@type': 'Country',
                  name: 'United States',
                },
                description: 'Professional livestock hauling services including cattle hauling, horse transport, and livestock shipping nationwide.',
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://wehavllivestock.com/#faq',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What types of animals do you haul?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We handle all types of livestock including cattle, horses, sheep, goats, hogs, and other farm animals. Our network of carriers is equipped to safely transport any livestock you need moved.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How quickly can I get a quote?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Most quotes are provided within 2-4 hours during business hours. We work quickly to match you with qualified haulers who can meet your timeline.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Are your haulers licensed and insured?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, all carriers in our network are fully licensed, insured, and experienced in livestock transportation. We verify credentials before connecting you with any hauler.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What factors affect the cost of livestock hauling?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Pricing depends on distance, number of animals, type of livestock, pickup and delivery locations, and timing. Remote areas and urgent shipments may cost more.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do you handle permits and inspections?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Our carriers handle all necessary DOT compliance and transportation permits. You are responsible for health certificates and state-required livestock documentation.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <Image
                src="/alh3.png"
                alt="American Livestock Hauling logo"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-navy text-off-white" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="text-center max-w-4xl mx-auto">
              <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                Professional Livestock Hauling Services
              </h1>
              <p className="text-lg sm:text-xl mb-7 text-neutral-200">
                We haul cattle, horses, and livestock across America. Licensed, insured, and experienced in safe animal transport.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="text-center">
                  <svg className="w-8 h-8 text-red mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm sm:text-base font-medium">Licensed & Insured</p>
                </div>
                <div className="text-center">
                  <svg className="w-8 h-8 text-red mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm sm:text-base font-medium">Coast-to-Coast</p>
                </div>
                <div className="text-center">
                  <svg className="w-8 h-8 text-red mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm sm:text-base font-medium">Quick Quotes</p>
                </div>
                <div className="text-center">
                  <svg className="w-8 h-8 text-red mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm sm:text-base font-medium">Transparent Pricing</p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative max-w-3xl mx-auto mb-6">
                <Image
                  src="/alhimage2.png"
                  alt="Professional livestock hauler in truck - American Livestock Hauling"
                  width={800}
                  height={500}
                  className="rounded-lg shadow-2xl w-full h-auto"
                  priority
                />
              </div>

              {/* Scroll Down Arrow */}
              <div className="flex justify-center">
                <a
                  href="#quote-form"
                  className="animate-bounce inline-block"
                  aria-label="Scroll to quote form"
                >
                  <svg
                    className="w-8 h-8 text-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="quote-form" className="pt-12 pb-16 bg-off-white" aria-labelledby="form-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 id="form-heading" className="text-3xl sm:text-4xl font-bold text-dark-text mb-3">
                Get Your Free Quote
              </h2>
              <p className="text-lg sm:text-xl text-neutral-700">
                Tell us about your haul and we&apos;ll provide a competitive quote
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white" aria-labelledby="how-it-works-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-center text-dark-text mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-dark-text">Submit Your Route Details</h3>
                <p className="text-neutral-700">
                  Tell us what animals you need hauled, pickup and delivery locations, and your timeline.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-dark-text">We Review Your Request</h3>
                <p className="text-neutral-700">
                  Our team evaluates your haul requirements and prepares a detailed quote for your route.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-dark-text">Get Your Quote & Book</h3>
                <p className="text-neutral-700">
                  Receive your competitive quote within hours and schedule your livestock transport with us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Sections */}
        <section className="py-16 bg-neutral-50" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-center text-dark-text mb-12">
              Professional Livestock Transportation Services
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <article>
                <h3 className="text-2xl font-bold mb-4 text-dark-text">Cattle Hauling Services</h3>
                <p className="text-neutral-700 mb-4">
                  We specialize in safe, reliable cattle transport across the United States. Whether you&apos;re moving a small herd to pasture or shipping cattle to market, we understand the unique requirements of cattle hauling. We handle beef cattle, dairy cows, breeding stock, and calves with professional care.
                </p>
                <p className="text-neutral-700">
                  Our cattle transport service includes proper ventilation, appropriate spacing, and experienced drivers who know how to handle livestock. We meet all DOT and animal welfare requirements for safe cattle hauling.
                </p>
              </article>

              <article>
                <h3 className="text-2xl font-bold mb-4 text-dark-text">Horse Transport Services</h3>
                <p className="text-neutral-700 mb-4">
                  We provide professional horse hauling with specialized trailers equipped with proper padding, ventilation, and safety features. From single horses to multiple head, we have experience transporting show horses, breeding stock, and pleasure horses across the country.
                </p>
                <p className="text-neutral-700">
                  Horse transport requires extra care and attention. We understand equine behavior and provide the gentle handling your horses deserve during transport.
                </p>
              </article>

              <article>
                <h3 className="text-2xl font-bold mb-4 text-dark-text">Sheep, Goat, and Hog Hauling</h3>
                <p className="text-neutral-700 mb-4">
                  We haul all types of livestock including sheep, goats, and hogs. Our trailers feature proper bedding, ventilation, and appropriate load density for each species. Whether you&apos;re shipping to market, moving breeding stock, or relocating your herd, we have the equipment and expertise.
                </p>
                <p className="text-neutral-700">
                  Small livestock hauling requires knowledge of animal behavior and proper handling techniques. We specialize in safe, humane transport for sheep, goats, and hogs.
                </p>
              </article>

              <article>
                <h3 className="text-2xl font-bold mb-4 text-dark-text">Nationwide Livestock Shipping Coverage</h3>
                <p className="text-neutral-700 mb-4">
                  American Livestock Hauling provides coast-to-coast coverage for all your livestock transportation needs. We serve rural areas, auction houses, feedlots, and ranches across all 50 states. Long-distance livestock hauling requires proper planning, rest stops, and experienced drivers – all of which we provide.
                </p>
                <p className="text-neutral-700">
                  We handle interstate livestock transport following all federal and state regulations. Request a quote for any route – from short local hauls to cross-country livestock shipping.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Image
                src="/alh3.png"
                alt="American Livestock Hauling"
                width={200}
                height={60}
                className="h-12 w-auto mx-auto mb-6"
              />
              <p className="text-neutral-600 mb-4">
                Professional livestock hauling services nationwide
              </p>
              <p className="text-sm text-neutral-500">
                &copy; {new Date().getFullYear()} American Livestock Hauling. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
