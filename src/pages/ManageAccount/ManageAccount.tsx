import GeneralInformationSection from './components/GeneralInformationSection'
import SecuritySection from './components/SecuritySection'
import DeleteAccountSection from './components/DeleteAccountSection'
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext'
export default function ManageAccount() {
    const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to manage your account</h2>
          <p className="text-gray-600">You need to be logged in to manage your account.</p>
            <Link to="/login" className="w-full">
              <button className=" w-full bg-linear-to-r from-[#22B5E5] to-[#E522B5] text-white px-4 py-2 rounded-xl  active:scale-95 transition-transform duration-200 mt-10">
                Log In
              </button>
            </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f4f4f6] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-brand-page rounded-3xl p-6 flex justify-center items-center flex-col">
        <span className="self-start bg-linear-to-r from-sky-500 to-fuchsia-500 bg-clip-text text-transparent text-xl font-bold mb-6">
          Manage Account
        </span>

        <div className="flex flex-col gap-6 ">
          <GeneralInformationSection />
          <SecuritySection />
          <DeleteAccountSection />
        </div>
      </div>
    </div>
  )
}
