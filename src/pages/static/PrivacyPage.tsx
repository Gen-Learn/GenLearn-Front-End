import { ArrowLeft, Zap, Shield, Lock, Cookie } from 'lucide-react';
import { Button } from '../../components/ui/index';
import { Link } from 'react-router-dom';
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" data-nav="landing" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>
          <Link to="/" data-nav="landing">
            <Button variant="ghost"><ArrowLeft className="w-4 h-4" />Back</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: June 27, 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Account information (name, email, password)</li>
              <li>Uploaded PDF documents for course generation</li>
              <li>Learning progress and quiz results</li>
              <li>Payment information for premium subscriptions</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Usage</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new features and services</li>
              <li>Personalize your learning experience</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies Policy</h2>
            <div className="flex items-start gap-4 mb-4">
              <Cookie className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar technologies to provide, protect, and improve our services. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We use the following types of cookies: Essential (required for basic functionality), Analytics (help us understand usage), and Preferences (remember your settings).
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may share your information with third-party services that help us operate our platform:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Payment processors (Stripe)</li>
              <li>Cloud hosting providers</li>
              <li>Analytics services</li>
              <li>Email service providers</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <div className="flex items-start gap-4 mb-4">
              <Lock className="w-8 h-8 text-primary-500 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">5. AI Processing Disclaimer</h2>
            </div>
            <div className="bg-primary-50 rounded-xl p-6 mb-4">
              <p className="text-gray-700 leading-relaxed">
                Your uploaded documents are processed by our AI systems to generate personalized courses. This processing involves:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-3">
                <li>Text extraction and analysis</li>
                <li>Content structuring and organization</li>
                <li>Video narration generation</li>
                <li>Quiz question creation</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We do not permanently store your uploaded PDF content beyond the processing period. Generated course content is stored in your account and can be deleted at any time.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Account Deletion</h2>
            <p className="text-gray-600 leading-relaxed">
              You can delete your account at any time from your profile settings. Upon deletion, all your personal data, courses, and learning progress will be permanently removed within 30 days. Some data may be retained in anonymized form for analytics purposes.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures including encryption at rest and in transit, secure data centers, and regular security audits. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              For any privacy-related questions or to exercise your rights, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-700"><strong>Email:</strong> privacy@genlearn.ai</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Learning Lane, San Francisco, CA 94102</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
