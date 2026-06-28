import {getCurrentUser} from '../services/userService';
import {useState, useEffect} from 'react';
import {User} from "../types/userModel"
export const useGetUser = ()=> {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    try{
        setLoading(true)
    const loadUser = async () => {
        const user = await getCurrentUser();
        setUser(user);
    }
    loadUser();
    }
    catch(err){
    setError("Failed to fetch user");
    }
    finally{
        setLoading(false);
        setError("")
    }

  
}, []);
return {user,loading,error};
}