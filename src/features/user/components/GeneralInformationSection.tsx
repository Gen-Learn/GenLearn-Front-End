import { useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import SectionCard from './SectionCard';
import { FormField, TextAreaField } from './FormField';
import SaveButton from './SaveButton';
import { User } from "@/types/userModel";
import { useUpdateUser } from '@/hooks/mutations/useUpdateUser';

const GeneralInformationSection = ({ user }: { user: User }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUpdate, loading, error } = useUpdateUser();

  const [ avatar, setAvatar ] = useState(
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Mohamed&backgroundColor=b6e3f4'
  );
  const [ name, setName ] = useState(user?.name || "");
  const [ biography, setBiography ] = useState(user?.biography || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[ 0 ];
    if (file) setAvatar(URL.createObjectURL(file));
    // Note: this only updates the local preview. If you want the new avatar
    // actually saved, you'll need to upload `file` separately (e.g. as FormData)
    // since updateCurrentUser as written takes a plain User object, not a file.
  };

  const updatedUser = { name, biography };

  return (
    <SectionCard icon={<IoSettingsOutline />} title="General Information">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <FormField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormField
          label="Email Address"
          value={user?.email || "test@gmail.com"}
          disabled
          className="bg-gray-100 text-gray-400 cursor-not-allowed"
        />
      </div>

      <div className="mb-6">
        <TextAreaField
          label="Biography"
          placeholder="Write a short summary about yourself ..."
          rows={4}
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <SaveButton
        onClick={handleUpdate}
        Data={updatedUser}
        label={loading ? "Saving..." : "Save Changes"}
      />
    </SectionCard>
  );
};

export default GeneralInformationSection;