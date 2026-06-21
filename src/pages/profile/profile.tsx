import ProfileHeader from './components/ProfileHeader'
import ActivityCard from './components/ActivityCard'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router';
export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <p className="text-gray-600">You need to be logged in to access your profile page.</p>
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
    <div className="min-h-screen  max-w-4xl mx-auto bg-[#f4f4f6] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* @ts-ignore: prop typing mismatch in ProfileHeader component */}
        <ProfileHeader user={user} />
        <ActivityCard />
      </div>
    </div>
  )
}
