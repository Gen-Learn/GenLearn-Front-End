import {getSingleCource} from "../services/singleCourceService";
import { useEffect, useState } from "react";
import Course from "../types/coursesModel";
export const useGetSingleCource = (id: string) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSingleCource = async () => {
            try {
                const response = await getSingleCource(id);
                setCourse(response.data.course); // Log the fetched course data
            }
            catch (error) {
                setError("Failed to fetch course");
            }
            finally {
                setLoading(false);
            }
        }
        fetchSingleCource();
    }, [id]);

    return { course, loading, error };
};
