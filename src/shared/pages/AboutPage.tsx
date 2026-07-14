import { ArrowLeft, Zap, BookOpen, Cpu, Users, Target, Heart, Lightbulb, Rocket } from 'lucide-react';
import { Button, Card } from '../../components/ui/index';
import { Link } from 'react-router-dom';
import image from '@/assets/images/logoOld.png';
const team = [
  {
    name: 'Omar Ahmed Ibrahim',
    role: 'AI Engineer & Team Leader',
    bio: 'Leading the AI team and developing intelligent learning solutions.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Omar%20Ahmed%20Ibrahim',
  },
  {
    name: 'Al-Zahraa Hassan Mohamed',
    role: 'Mobile App Developer',
    bio: 'Building seamless and responsive mobile applications.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Al-Zahraa%20Hassan%20Mohamed',
  },
  {
    name: 'Ziyad Mohamed Fouda',
    role: 'AI Engineer',
    bio: 'Developing AI models and intelligent content generation systems.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Ziyad%20Mohamed%20Fouda',
  },
  {
    name: 'Mahmoud Hamdino Ibrahim',
    role: 'Mobile App Developer',
    bio: 'Creating modern and user-friendly mobile experiences.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Mahmoud%20Hamdino%20Ibrahim',
  },
  {
    name: 'Menna Ahmed Mohamed Ali',
    role: 'AI Engineer',
    bio: 'Working on AI-powered educational technologies.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Menna%20Ahmed%20Mohamed%20Ali',
  },
  {
    name: 'Mohamed Yasser Elshahaby',
    role: 'Backend Developer',
    bio: 'Building reliable backend architecture and services.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Mohamed%20Yasser%20Elshahaby',
  },
  {
    name: 'Khaled Nashat Attallah',
    role: 'Backend Developer',
    bio: 'Designing scalable backend services and APIs.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Khaled%20Nashat%20Attallah',
  },
  {
    name: 'Abdallah Nabil Elsaid Agila',
    role: 'Frontend Developer',
    bio: 'Building modern, responsive, and interactive user interfaces.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Abdallah%20Nabil%20Elsaid%20Agila',
  },
  {
    name: 'Mohamed Gamal Mansour',
    role: 'Backend Developer',
    bio: 'Developing secure and high-performance backend systems.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Mohamed%20Gamal%20Mansour',
  },
  {
    name: 'Mohamed Mahmoud Metwally',
    role: 'UI/UX Designer',
    bio: 'Designing intuitive and engaging user experiences.',
    image:
      'https://api.dicebear.com/9.x/initials/svg?seed=Mohamed%20Mahmoud%20Metwally',
  },
];

const timeline = [
  { step: 1, title: 'Upload', description: 'Upload your PDF textbook or document' },
  { step: 2, title: 'Extract', description: 'AI extracts and analyzes content structure' },
  { step: 3, title: 'Structure', description: 'Content is organized into sections and lectures' },
  { step: 4, title: 'Generate', description: 'Video lectures are generated with AI voices' },
  { step: 5, title: 'Quiz', description: 'Smart quizzes are auto-generated for each section' },
  { step: 6, title: 'Learn', description: 'Start learning with your personalized course' },
];

const values = [
  { icon: Heart, title: 'Accessibility', description: 'Quality education should be available to everyone, everywhere.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We push boundaries of what AI can do for learning.' },
  { icon: Users, title: 'Community', description: 'Learning is better together. We foster collaboration.' },
  { icon: Target, title: 'Impact', description: 'Every feature we build aims to improve learning outcomes.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={image} alt="Genlearn" className='w-12' />
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>
          <Link to="/">
            <Button variant="ghost"><ArrowLeft className="w-4 h-4" />Back</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Transforming How the World{' '}
              <span className="text-gradient">Learns</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're on a mission to make quality education accessible to everyone by turning any document into an interactive learning experience in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-6">
                <Rocket className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Democratizing Education Through AI
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Traditional education hasn't kept pace with how people actually learn. We believe everyone deserves access to personalized, engaging learning experiences regardless of their location, budget, or background.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                GenLearn transforms static PDFs into dynamic video courses with AI-generated lectures, interactive quizzes, and personalized learning paths. What once took months of course creation now takes minutes.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-extrabold text-gradient mb-2">50M+</div>
                    <p className="text-gray-600">Pages transformed into courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why GenLearn Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why GenLearn?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We solve the fundamental problems that prevent people from accessing quality education.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Content Overload</h3>
              <p className="text-gray-600">Transform overwhelming PDFs into digestible video lessons that make learning easy and enjoyable.</p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Time Constraint</h3>
              <p className="text-gray-600">Course creation that once took months now takes minutes. Learn at your own pace, on your schedule.</p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Access Barrier</h3>
              <p className="text-gray-600">Quality education shouldn't cost a fortune. We're making it accessible to everyone, everywhere.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From PDF to interactive course in six simple steps powered by cutting-edge AI.
            </p>
          </div>
          <div className="grid lg:grid-cols-6 gap-4">
            {timeline.map((item, idx) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {idx < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're educators, engineers, and dreamers united by a passion for accessible learning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="!p-0 overflow-hidden">
                <div className="aspect-square relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">The Future of Learning</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            We're just getting started. Our vision is a world where anyone can learn anything, anywhere, through AI-powered personalized education that adapts to their unique learning style.
          </p>
          <Link to="/sign-up" >
            <Button size="lg" variant="secondary">
              Join the Revolution
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
