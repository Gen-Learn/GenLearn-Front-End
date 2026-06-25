import {useState, useEffect} from "react";
import {getQuiz} from "../services/quizService";
import {Quiz} from "../types/quizModel";

export const useGetQuiz = (quizId: string) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!quizId) {
            setQuiz(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchQuiz = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getQuiz(quizId);
                console.log("Fetched quiz data:", data); // Debugging log
                setQuiz(data);
            } catch (err) {
                setQuiz(null);
                setError("Failed to fetch quiz");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    return { quiz, loading, error };
}