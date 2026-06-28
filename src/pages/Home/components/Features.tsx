import { type LucideIcon, Video, FileQuestion, BarChart3, Route, PlayCircle, FileText } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: Video,
    title: 'AI Video Generation',
    description: 'Transform text into engaging video lectures with AI-generated visuals and narration.',
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    icon: FileQuestion,
    title: 'Smart Quiz Creation',
    description: 'Auto-generate comprehensive quizzes that test understanding at multiple difficulty levels.',
    gradient: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Track your learning journey with detailed analytics and achievement milestones.',
    gradient: 'from-green-500 to-green-600',
  },
  {
    icon: Route,
    title: 'Personalized Learning Paths',
    description: 'AI adapts content to your pace and learning style for maximum retention.',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    icon: PlayCircle,
    title: 'Interactive Video Player',
    description: 'Take notes, bookmark sections, and navigate chapters seamlessly while watching.',
    gradient: 'from-rose-500 to-rose-600',
  },
  // {
  //   icon: Globe,
  //   title: 'Multi-language Support',
  //   description: 'Generate courses in 30+ languages with native-quality AI narration.',
  //   gradient: 'from-blue-500 to-blue-600',
  // },
  {
    icon: FileText,
    title: 'Automatic Summaries',
    description: 'Get concise chapter summaries and key takeaways for quick review.',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  // {
  //   icon: Layers,
  //   title: 'Flashcards Generation',
  //   description: 'AI creates study flashcards from key concepts for active recall practice.',
  //   gradient: 'from-violet-500 to-violet-600',
  // },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase mb-3">
            Features
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Learn Smarter
          </h2>
          <p className="text-lg text-gray-600">
            Powerful AI tools designed to transform how you absorb knowledge
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
