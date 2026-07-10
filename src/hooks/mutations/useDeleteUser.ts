import { deleteCurrentUser } from "@/services/userService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const useDeleteUser= () =>{
    const [isDeleted,setIsDeleted] =useState< boolean>(false);
    const [Error,setError] =useState< string | null>(null);
    const navigate = useNavigate();
    const HandleDeleteAccount= async()=>{
        try{
            const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
            );
            if (!confirmed) {
                setIsDeleted(false);
                return;
            };
            const deleteAccount =await deleteCurrentUser();
            setIsDeleted(deleteAccount);
            navigate('/login');
        }catch(err){
            setError("error can't deleting the account");
            setIsDeleted(false);
        }
    }
    return {isDeleted,Error,HandleDeleteAccount}
}