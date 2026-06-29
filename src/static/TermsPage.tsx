import { ArrowLeft, Zap, Scale, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/index';
import { Link } from 'react-router-dom';
export default function TermsPage() {
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
          <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-secondary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: June 27, 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Platform Usage Rules</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By using GenLearn, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Use the service only for lawful purposes</li>
              <li>Not upload content that infringes on intellectual property rights</li>
              <li>Not attempt to circumvent security measures</li>
              <li>Not use automated systems to access the platform without authorization</li>
              <li>Not share your account credentials with others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring uploaded content does not violate third-party rights</li>
              <li>The accuracy of information you provide</li>
              <li>Your use of AI-generated content</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              GenLearn and its original content, features, and functionality are owned by GenLearn, Inc. and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The content you upload remains your property. By uploading, you grant us a license to process it for course generation. Generated content is provided to you with a personal, non-exclusive license.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">4. AI-Generated Content Disclaimer</h2>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 mb-4">
              <p className="text-gray-700 leading-relaxed">
                AI-generated courses may contain inaccuracies, omissions, or outdated information. Users should:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-3">
                <li>Verify important information from authoritative sources</li>
                <li>Not rely solely on generated content for critical decisions</li>
                <li>Understand that AI outputs may not reflect current knowledge</li>
                <li>Report any errors or inaccuracies to our team</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              GenLearn is not liable for any decisions made based on AI-generated content.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account Suspension</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We reserve the right to suspend or terminate accounts that:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Violate these terms of service</li>
              <li>Engage in abusive or harassing behavior</li>
              <li>Commit fraud or misrepresentation</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to manipulate the platform or its algorithms</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Suspended accounts will not receive refunds for prepaid services unless required by law.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              To the maximum extent permitted by law, GenLearn shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy Reference</h2>
            <p className="text-gray-600 leading-relaxed">
              Our collection and use of personal information is described in our{' '}
              <a href="#!/privacy" data-nav="privacy" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>
              . By using GenLearn, you consent to our privacy practices.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may modify these terms at any time. Continued use of the service after changes constitutes acceptance. We will notify users of significant changes via email or in-app notification.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these terms, please contact:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-700"><strong>Email:</strong> legal@genlearn.ai</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Learning Lane, San Francisco, CA 94102</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
