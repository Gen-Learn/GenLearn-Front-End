import { useState } from 'react';
import { PiShieldCheckLight } from 'react-icons/pi';
import SectionCard from './SectionCard';
import { FormField } from './FormField';
import SaveButton from './SaveButton';

const SecuritySection = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SectionCard icon={<PiShieldCheckLight />} title="Security">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <FormField
          label="Change Password"
          type="password"
          placeholder="••••••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormField
          label="Confirm New Password"
          type="password"
          placeholder="••••••••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <SaveButton />
    </SectionCard>
  );
};

export default SecuritySection;
