import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Molecular Biologist',
    avatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'GenLearn revolutionized how I understand complex research papers. The AI-generated courses break down difficult concepts into digestible video lectures.',
    rating: 5,
  },
  {
    name: 'Michael Roberts',
    role: 'Medical Student',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'As a med student, I need to absorb massive amounts of information fast. This platform has been a game-changer for my study efficiency.',
    rating: 5,
  },
  {
    name: 'Emily Thompson',
    role: 'PhD Researcher',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'The quiz generation is incredibly accurate. It tests understanding, not just memorization. Perfect for research methodology courses.',
    rating: 5,
  },
  {
    name: 'Dr. James Watson',
    role: 'Physics Professor',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'I recommend GenLearn to all my students. The AI-generated summaries and flashcards are excellent supplementary materials.',
    rating: 5,
  },
];

export default function Testimonials() {
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
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
                <Quote className="w-4 h-4 text-white fill-current" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
