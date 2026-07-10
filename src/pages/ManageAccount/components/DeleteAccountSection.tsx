import { IoWarningOutline } from 'react-icons/io5';
import { useDeleteUser } from '@/hooks/mutations/useDeleteUser';
import Card from "@/components/ui/Card"
const DeleteAccountSection = () => {
  const { isDeleted, Error, HandleDeleteAccount } = useDeleteUser();

  return (
    <Card className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-red-600">
        <IoWarningOutline size={18} />
        <h2 className="font-semibold text-[15px] text-red-600">Delete Account</h2>
      </div>

      <p className="text-gray-500 text-[13px] leading-relaxed mb-5">
        If you delete your account you will lose definitive access to it with no way of
        recovery. Your personal data and progress will be erased and lost.
      </p>

      {Error && (
        <p className="text-sm text-red-600 mb-3">{Error}</p>
      )}

      <button
        onClick={HandleDeleteAccount}
        disabled={isDeleted}
        className="bg-red-600 text-white font-medium text-[13px] px-4 py-2 text-sm rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleted ? 'Deleting account...' : 'Delete My Account'}
      </button>
    </Card>
  );
};

export default DeleteAccountSection;
