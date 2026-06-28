interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  label?: string;
  colorClass?: string;
}

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 6,
  className = '',
  showValue = true,
  label,
  colorClass = 'text-primary-500',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            className="text-gray-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={`${colorClass} transition-all duration-700 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{Math.round(value)}%</span>
          </div>
        )}
      </div>
      {label && <span className="mt-2 text-sm text-gray-500">{label}</span>}
    </div>
  );
}

interface LinearProgressProps {
  value: number;
  className?: string;
  colorClass?: string;
  showValue?: boolean;
  animated?: boolean;
}

export function LinearProgress({
  value,
  className = '',
  colorClass = 'from-primary-500 to-secondary-500',
  showValue = false,
  animated = true,
}: LinearProgressProps) {
  return (
    <div className={`w-full ${className}`}>
      {showValue && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass} ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
