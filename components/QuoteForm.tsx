'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  phone: string;
  email: string;
  species: string;
  quantity: string;
  pickup_city: string;
  pickup_state: string;
  pickup_zip: string;
  dropoff_city: string;
  dropoff_state: string;
  dropoff_zip: string;
  timeline: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

// Phone normalization to E.164 format
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return `+1${digits}`;
}

// Validate current step
function validateStep(step: number, data: FormData): FormErrors {
  const errors: FormErrors = {};

  switch (step) {
    case 1: // Livestock Details
      if (!data.species) errors.species = 'Please select an animal type';
      if (!data.quantity.trim()) errors.quantity = 'Quantity is required';
      break;
    case 2: // Pickup Location
      if (!data.pickup_city.trim()) errors.pickup_city = 'Pickup city is required';
      if (!data.pickup_state.trim()) errors.pickup_state = 'Pickup state is required';
      break;
    case 3: // Dropoff Location
      if (!data.dropoff_city.trim()) errors.dropoff_city = 'Dropoff city is required';
      if (!data.dropoff_state.trim()) errors.dropoff_state = 'Dropoff state is required';
      break;
    case 4: // Timeline
      if (!data.timeline) errors.timeline = 'Please select a timeline';
      break;
    case 5: // Contact Info
      if (!data.name.trim()) errors.name = 'Name is required';
      if (!data.phone.trim()) {
        errors.phone = 'Phone is required';
      } else {
        const digits = data.phone.replace(/\D/g, '');
        if (digits.length < 10) {
          errors.phone = 'Please enter a valid phone number';
        }
      }
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email address';
      }
      break;
  }

  return errors;
}

export default function QuoteForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    species: '',
    quantity: '',
    pickup_city: '',
    pickup_state: '',
    pickup_zip: '',
    dropoff_city: '',
    dropoff_state: '',
    dropoff_zip: '',
    timeline: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Focus first error field
      const firstErrorField = Object.keys(stepErrors)[0];
      document.getElementsByName(firstErrorField)[0]?.focus();
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate final step
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstErrorField = Object.keys(stepErrors)[0];
      document.getElementsByName(firstErrorField)[0]?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Normalize phone to E.164 format
      const normalizedPhone = normalizePhone(formData.phone);

      // Prepare data for webhook
      const webhookData = {
        name: formData.name,
        phone: normalizedPhone,
        email: formData.email,
        species: formData.species,
        quantity: formData.quantity,
        pickup_city: formData.pickup_city,
        pickup_state: formData.pickup_state,
        pickup_zip: formData.pickup_zip || undefined,
        dropoff_city: formData.dropoff_city,
        dropoff_state: formData.dropoff_state,
        dropoff_zip: formData.dropoff_zip || undefined,
        timeline: formData.timeline,
        notes: formData.notes || undefined,
      };

      // Submit to webhook
      const response = await fetch('https://n8n.alecautomations.com/webhook/8e151c52-fb16-4a21-a526-388fb9543142', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Fire GTM event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          species: formData.species,
          quantity: formData.quantity,
          pickup_state: formData.pickup_state,
          dropoff_state: formData.dropoff_state,
        });
      }

      // Redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'There was an error submitting your request. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    'Livestock Details',
    'Pickup Location',
    'Dropoff Location',
    'Timeline',
    'Contact Information'
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 sm:p-8" noValidate>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-3">
          <span className="text-base font-medium text-dark-text">
            {stepTitles[currentStep - 1]}
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md" role="alert">
          <p className="text-red-800 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Step 1: Livestock Details */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-dark-text mb-4">What are you hauling?</h3>

          <div>
            <label htmlFor="species" className="block text-sm font-medium text-dark-text mb-2">
              Type of Animal <span className="text-red" aria-label="required">*</span>
            </label>
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.species ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.species}
              aria-describedby={errors.species ? 'species-error' : undefined}
            >
              <option value="">Select animal type</option>
              <option value="Cattle">Cattle</option>
              <option value="Horses">Horses</option>
              <option value="Sheep">Sheep</option>
              <option value="Goats">Goats</option>
              <option value="Hogs">Hogs</option>
              <option value="Other">Other</option>
            </select>
            {errors.species && (
              <p id="species-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.species}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-dark-text mb-2">
              Number of Animals <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 25"
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.quantity ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? 'quantity-error' : undefined}
            />
            {errors.quantity && (
              <p id="quantity-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.quantity}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Pickup Location */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-dark-text mb-4">Where are we picking up?</h3>

          <div>
            <label htmlFor="pickup_city" className="block text-sm font-medium text-dark-text mb-2">
              City <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="pickup_city"
              name="pickup_city"
              value={formData.pickup_city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.pickup_city ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.pickup_city}
              aria-describedby={errors.pickup_city ? 'pickup_city-error' : undefined}
            />
            {errors.pickup_city && (
              <p id="pickup_city-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.pickup_city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="pickup_state" className="block text-sm font-medium text-dark-text mb-2">
              State <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="pickup_state"
              name="pickup_state"
              value={formData.pickup_state}
              onChange={handleChange}
              placeholder="e.g., TX"
              maxLength={2}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.pickup_state ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.pickup_state}
              aria-describedby={errors.pickup_state ? 'pickup_state-error' : undefined}
            />
            {errors.pickup_state && (
              <p id="pickup_state-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.pickup_state}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Dropoff Location */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-dark-text mb-4">Where are we delivering?</h3>

          <div>
            <label htmlFor="dropoff_city" className="block text-sm font-medium text-dark-text mb-2">
              City <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="dropoff_city"
              name="dropoff_city"
              value={formData.dropoff_city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.dropoff_city ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.dropoff_city}
              aria-describedby={errors.dropoff_city ? 'dropoff_city-error' : undefined}
            />
            {errors.dropoff_city && (
              <p id="dropoff_city-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.dropoff_city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="dropoff_state" className="block text-sm font-medium text-dark-text mb-2">
              State <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="dropoff_state"
              name="dropoff_state"
              value={formData.dropoff_state}
              onChange={handleChange}
              placeholder="e.g., OK"
              maxLength={2}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.dropoff_state ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.dropoff_state}
              aria-describedby={errors.dropoff_state ? 'dropoff_state-error' : undefined}
            />
            {errors.dropoff_state && (
              <p id="dropoff_state-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.dropoff_state}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Timeline */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-dark-text mb-4">When do you need pickup?</h3>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-dark-text mb-2">
              Pickup Timeline <span className="text-red" aria-label="required">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.timeline ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.timeline}
              aria-describedby={errors.timeline ? 'timeline-error' : undefined}
            >
              <option value="">Select timeline</option>
              <option value="Within 24 hours">Within 24 hours</option>
              <option value="Within 3 days">Within 3 days</option>
              <option value="Within 7 days">Within 7 days</option>
              <option value="Within 2 weeks">Within 2 weeks</option>
              <option value="Within a month">Within a month</option>
              <option value="Flexible">Flexible</option>
            </select>
            {errors.timeline && (
              <p id="timeline-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.timeline}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-dark-text mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Any special requirements or additional information..."
              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base"
            />
          </div>
        </div>
      )}

      {/* Step 5: Contact Information */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-dark-text mb-4">How can we reach you?</h3>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-2">
              Full Name <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-dark-text mb-2">
              Phone Number <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 555-5555"
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">
              Email Address <span className="text-red" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red focus:border-red outline-none transition text-base ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between gap-4">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 transition"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-red text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 transition ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-red text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ml-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
          </button>
        )}
      </div>
    </form>
  );
}
