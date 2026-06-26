import { useEffect, useState } from 'react'
import GeneralInformationSection from './components/GeneralInformationSection'
import SecuritySection from './components/SecuritySection'
import DeleteAccountSection from './components/DeleteAccountSection'
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext'
import {useGetUser} from "../../hooks/useGetUser"
export default function ManageAccount() {

  const {user,loading} = useGetUser();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading account details...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unable to load account details</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
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
