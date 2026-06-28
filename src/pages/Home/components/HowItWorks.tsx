import { Upload, Brain, Sparkles, PlayCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your PDF',
    description: 'Simply drag and drop any scientific PDF, textbook, or research paper. Our AI handles documents of any size.',
    color: 'from-gray-500 to-gray-600',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analyzes Content',
    description: 'Our advanced AI extracts key concepts, identifies chapters, and understands the learning structure.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Generate Course Structure',
    description: 'AI creates a complete course outline with video lectures, quizzes, and personalized learning paths.',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    number: '04',
    icon: PlayCircle,
    title: 'Learn interactively',
    description: 'Watch AI-generated video lectures, take quizzes, track progress, and master complex topics effortlessly.',
    color: 'from-green-500 to-green-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#F5F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From PDF to Course in Minutes
          </h2>
          <p className="text-lg text-gray-600">
            Our AI does the heavy lifting so you can focus on learning
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-gray-200 via-primary-200 to-gray-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Step Card */}
                <div className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6 bg-white border border-gray-100 rounded-xl px-3 py-1 shadow-soft">
                    <span className="text-sm font-bold text-gray-400">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Arrow - Desktop */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center bg-white rounded-full shadow-glass z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-primary-500" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
