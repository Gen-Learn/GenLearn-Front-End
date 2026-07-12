import  Accordion  from '@/components/ui/Accordion';

const faqs = [
  {
    title: 'How does AI course generation work?',
    content: 'Our AI analyzes your uploaded PDF document, identifies key concepts, chapters, and learning objectives. It then generates video lectures with AI narration, interactive quizzes, summaries, and flashcards. The entire process takes just minutes.',
  },
  {
    title: 'What types of documents can I upload?',
    content: 'GenLearn supports any scientific PDF including textbooks, research papers, journal articles, and lecture notes. The AI is optimized for STEM content including physics, chemistry, biology, medicine, engineering, and computer science.',
  },
  {
    title: 'How accurate are the AI-generated quizzes and summaries?',
    content: 'Our AI achieves 95%+ accuracy in content extraction and quiz generation. Each quiz is designed to test genuine understanding, not just recall. Summaries are reviewed for accuracy and can be manually adjusted.',
  },
  {
    title: 'Can I edit the generated courses?',
    content: 'Absolutely! Every aspect of the generated course can be customized. Edit video scripts, modify quiz questions, add additional materials, and reorganize content to match your learning preferences.',
  },
  {
    title: 'What languages are supported?',
    content: 'GenLearn supports 30+ languages including English, Spanish, French, German, Chinese, Japanese, Korean, and more. AI narration is available with native-quality voices in most major languages.',
  },
  {
    title: 'Is there a free trial available?',
    content: 'Yes! Start free with up to 3 PDF uploads per month. Our free tier includes AI course generation, standard video quality, and basic progress tracking. Upgrade to Pro for unlimited uploads and premium features.',
  },
];

export default function FAQ() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about GenLearn
          </p>
        </div>

        {/* Accordion */}
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
