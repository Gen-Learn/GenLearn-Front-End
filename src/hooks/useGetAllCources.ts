import {getCourses} from "../services/courcesService";
import { useEffect,useState } from "react";
import Course from "../types/coursesModel";
export const useGetAllCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCources = async() =>{
            try {
                const response = await getCourses();
                
                setCourses(response.data.data.courses);
            }
            catch (error) {
                setError("Failed to fetch courses");
            }
            finally {
                setLoading(false);
            }
        }
        fetchCources();
    }, []);
    return { courses, loading, error };
};
