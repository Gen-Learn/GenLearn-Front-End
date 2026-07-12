import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageCircle, Star, AlertCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui/index';
import { Link } from 'react-router-dom';
import image from '@/assets/images/logoOld.png';
import { useCreateContact } from '@/hooks/mutations/useCreateContact';

type ContactType = 'issue' | 'feedback';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  rating: number;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  rating: 0,
};

export default function ContactPage() {
  const [ contactType, setContactType ] = useState<ContactType>('issue');
  const [ formData, setFormData ] = useState<FormState>(initialFormState);
  const [ errors, setErrors ] = useState<Record<string, string>>({});

  const { mutate: submitContact, isPending, isSuccess, isError, reset } = useCreateContact();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (contactType === 'issue' && !formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (contactType === 'feedback' && formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTypeChange = (type: ContactType) => {
    setContactType(type);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (contactType === 'issue') {
      submitContact({
        type: 'issue',
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
    } else {
      submitContact({
        type: 'feedback',
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        message: formData.message,
      });
    }
  };

  const handleSendAnother = () => {
    setFormData(initialFormState);
    setErrors({});
    reset();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-8">
        <Card className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h1>
          <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
          <Button variant="secondary" onClick={handleSendAnother}>
            Send Another Message
          </Button>
        </Card>
      </div>
    );
  }

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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">support@genlearn.ai</p>
                  <p className="text-sm text-gray-400 mt-1">Response within 24 hours</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-400 mt-1">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">123 Learning Lane<br />San Francisco, CA 94102</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Support Hours</h3>
                  <p className="text-gray-600">Monday - Friday<br />9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Follow us</p>
              <div className="flex gap-3">
                {[ 'Twitter', 'LinkedIn', 'Facebook', 'Instagram' ].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

              {/* Type Toggle */}
              <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
                <button
                  type="button"
                  onClick={() => handleTypeChange('issue')}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${contactType === 'issue'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Report an Issue
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('feedback')}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${contactType === 'feedback'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Share Feedback
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300' : 'border-gray-200'} focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20`}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20`}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {contactType === 'issue' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-300' : 'border-gray-200'} focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20`}
                    />
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[ 1, 2, 3, 4, 5 ].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${star <= formData.rating
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-300'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                    {errors.rating && <p className="text-sm text-red-500 mt-1">{errors.rating}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      contactType === 'issue'
                        ? 'Tell us more about the issue you ran into...'
                        : 'Tell us what you think of GenLearn...'
                    }
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-300' : 'border-gray-200'} focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 resize-none`}
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                </div>

                {isError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main >
    </div >
  );
}