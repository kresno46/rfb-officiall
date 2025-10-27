import { useState, useEffect } from 'react';
import { fetchCareers, Career } from '../services/careerService';

export const useCareers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCareers = async () => {
      try {
        const data = await fetchCareers();
        setCareers(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getCareers();
  }, []);

  return { careers, loading, error };
};
