import { useState, useEffect } from "react";
import { getLecture } from "../../services/lectureService";
import Lecture from "../../types/coursesModel";

export const useGetLecture = (lectureId: string) => {
    const [ lecture, setLecture ] = useState<Lecture | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchLecture = async () => {
            setLoading(true);
            try {
                const data = await getLecture(lectureId);
                setLecture(data);
            } catch (err) {
                setError("Failed to fetch lecture");
            } finally {
                setLoading(false);
            }
        };

        fetchLecture();
    }, [ lectureId ]);

    return { lecture, loading, error };
};