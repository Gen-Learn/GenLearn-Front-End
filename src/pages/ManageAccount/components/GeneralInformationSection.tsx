import { useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuUpload } from 'react-icons/lu';
import SectionCard from './SectionCard';
import { FormField, TextAreaField } from './FormField';
import SaveButton from './SaveButton';
import { User } from "../../../types/userModel";
import { useUpdateUser } from '../../../hooks/mutations/useUpdateUser';

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
      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatar}
          alt="Profile avatar"
          className="w-16 h-16 rounded-full border border-gray-200 object-cover bg-white"
        />
        <div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 border border-brand-purple text-brand-violet text-[12px] font-medium rounded-lg px-3.5 py-2 hover:bg-purple-50 transition-colors"
          >
            <LuUpload size={14} />
            Upload Picture
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-gray-400 text-[11px] mt-1.5">Formats: JPG, JPEG, PNG.</p>
        </div>
      </div>

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