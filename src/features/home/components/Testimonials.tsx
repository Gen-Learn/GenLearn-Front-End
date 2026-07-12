// src/components/Testimonials.tsx
import { Star, Quote } from 'lucide-react';
import { useFeedbacks } from '@/hooks/queries/useGetFeedback';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[ 0 ])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function Testimonials() {
  const { data: feedbacks, isLoading, isError } = useFeedbacks();

  // Only show real feedback with a rating and a message, capped at 4 cards
  const visibleFeedbacks =
    feedbacks
      ?.filter((f) => f.type === 'feedback' && f.isVisible && f.message)
      .slice(0, 4) ?? [];

  if (isLoading) {
    return (
      <section className="py-24 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ ...Array(4) ].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || visibleFeedbacks.length === 0) {
    return null; // fail quietly rather than showing a broken section
  }

  return (
    <section className="py-24 bg-[#F5F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by Learners Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See how GenLearn is transforming education
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative flex flex-col"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
                <Quote className="w-4 h-4 text-white fill-current" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[ ...Array(feedback.rating) ].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                "{feedback.message}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-semibold">
                  {getInitials(feedback.name)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{feedback.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}