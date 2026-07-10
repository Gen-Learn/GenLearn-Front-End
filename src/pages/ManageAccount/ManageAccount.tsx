import { useEffect, useState } from 'react'
import GeneralInformationSection from './components/GeneralInformationSection'
import SecuritySection from './components/SecuritySection'
import DeleteAccountSection from './components/DeleteAccountSection'
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext'
import { useGetUser } from "../../hooks/queries/useGetUser"
import { FullPageLoader } from '@/components/loading';
import { EmptyState } from '@/components/empty-states';
import { BookOpen } from 'lucide-react';
export default function ManageAccount() {

  const { user, loading } = useGetUser();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFC]">
        <FullPageLoader />
      </div>
    );
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
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f6] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-brand-page rounded-3xl p-6 flex justify-center items-center flex-col">
        <span className="self-start gradient-bg-text text-2xl font-bold mb-6">
          Manage Account
        </span>

        <div className="flex flex-col gap-6 ">
          <GeneralInformationSection user={user} />
          <SecuritySection />
          <DeleteAccountSection />
        </div>
      </div>
    </div>
  )
}
