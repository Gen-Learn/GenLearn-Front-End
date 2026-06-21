import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormField = ({ label, className = '', ...rest }: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-brand-text text-[13px] font-medium">{label}</label>
    <input
      {...rest}
      className={`border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-brand-purple transition-colors placeholder:text-gray-400 ${className}`}
    />
  </div>
);

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextAreaField = ({ label, className = '', ...rest }: TextAreaFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-brand-text text-[13px] font-medium">{label}</label>
    <textarea
      {...rest}
      className={`border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-brand-purple transition-colors placeholder:text-gray-400 resize-none ${className}`}
    />
  </div>
);
