interface EmptyPanelProps {
  icon: React.ReactNode;
  message: string;
}

const EmptyPanel = ({ icon, message }: EmptyPanelProps) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
    <span className="text-3xl">{icon}</span>
    <p className="text-sm">{message}</p>
  </div>
);

export default EmptyPanel;
