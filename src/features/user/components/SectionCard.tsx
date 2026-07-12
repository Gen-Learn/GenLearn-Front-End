import type { ReactNode } from 'react';
import Card from "@/components/ui/Card"
interface SectionCardProps {
  icon: ReactNode;
  title: string;
  titleColor?: string;
  children: ReactNode;
}

const SectionCard = ({
  icon,
  title,
  titleColor = 'text-gray-800',
  children,
}: SectionCardProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm">
      <div className={`flex items-center gap-2 mb-5 ${titleColor} text-primary-600`}>
        <span className="text-lg leading-none ">{icon}</span>
        <h2 className="font-semibold text-[15px]">{title}</h2>
      </div>

      {children}
    </Card>
  );
};

export default SectionCard;