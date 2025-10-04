import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Thank You | American Livestock Hauling',
  description: 'Thank you for your quote request. We will provide your livestock hauling quote shortly.',
  robots: 'noindex, nofollow',
};

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/alh3.png"
                alt="American Livestock Hauling logo"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Thank You Content */}
      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
              Thank You for Your Request!
            </h1>

            <p className="text-xl text-neutral-700 mb-6">
              We&apos;ve received your livestock hauling quote request and are preparing your quote.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-dark-text mb-4">What Happens Next?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700">
                    <strong className="text-dark-text">Within 2 hours:</strong> You&apos;ll receive your competitive estimate
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700">
                    <strong className="text-dark-text">Review and book:</strong> Accept your estimate and schedule your livestock transport
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-neutral-600 mb-8">
              We&apos;ll contact you at the phone number and email address you provided. Please check your inbox (and spam folder) for our response.
            </p>

            <Link
              href="/"
              className="inline-block bg-red text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 transition"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12 mt-16">
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
  );
}
