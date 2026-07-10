import GeneralInformationSection from './components/GeneralInformationSection'
import SecuritySection from './components/SecuritySection'
import DeleteAccountSection from './components/DeleteAccountSection'
import { Link } from 'react-router-dom'
import { useGetUser } from '../../hooks/queries/useGetUser'
import { FullPageLoader } from '@/components/loading'
import { EmptyState } from '@/components/empty-states'
import { Button, Badge } from '@/components/ui/index'
import { ArrowLeft, Zap, BookOpen } from 'lucide-react'
import image from "@/assets/images/logoOld.png";
export default function ManageAccount() {
  const { user, loading } = useGetUser()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFC]">
        <FullPageLoader />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFC]">
        <EmptyState
          title="Unable to load account"
          description="Please try again later or refresh the page."
          icon={BookOpen}
        />
      </div>
    )
  }

  const initials = user?.name
    ? user.name
      .split(' ')
      .map((n) => n[ 0 ])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : 'U'

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Top Bar — same pattern as Profile.tsx */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/profile" data-nav="dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Profile
              </Button>
            </Link>
          </div>
          <Link to="/" data-nav="landing" className="flex items-center justify-center">
            <img src={image} alt="Genlearn" className='w-12' />
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>
          {/* Spacer so the logo stays visually centered against the Back button */}
          <div className="w-[76px]" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">


        {/* Sections — each already renders as its own white SectionCard */}
        <div className="flex flex-col gap-6">
          <GeneralInformationSection user={user} />
          <SecuritySection />
          <DeleteAccountSection />
        </div>
      </main>
    </div>
  )
}