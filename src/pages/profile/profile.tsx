import ProfileHeader from './components/ProfileHeader'
import ActivityCard from './components/ActivityCard'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router';
import {useGetUser} from "../../hooks/useGetUser"
export default function Profile() {

  const {user} = useGetUser();
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
