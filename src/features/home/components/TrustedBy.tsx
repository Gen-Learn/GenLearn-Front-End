import { GraduationCap, Microscope, Stethoscope, Cpu, Building2 } from 'lucide-react';

const trustedBy = [
  { icon: GraduationCap, label: 'Students', count: '35,000+' },
  { icon: Microscope, label: 'Researchers', count: '8,000+' },
  { icon: Stethoscope, label: 'Medical Students', count: '12,000+' },
  { icon: Cpu, label: 'Engineers', count: '15,000+' },
  { icon: Building2, label: 'Universities', count: '200+' },
];

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-gray-100 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-gray-500 mb-8 tracking-wider uppercase">
          Trusted by learners worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {trustedBy.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-400 hover:text-gray-600 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                <item.icon className="w-5 h-5 text-gray-500 group-hover:text-primary-500 transition-colors" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{item.count}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
