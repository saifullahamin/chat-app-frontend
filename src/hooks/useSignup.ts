import { useMutation } from '@tanstack/react-query';
import apiFetch from '@/services/apiClient';
import { useRouter } from 'next/navigation';

interface ApiError {
  error: string;
}

export const useSignup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      displayName: string;
    }) => {
      return apiFetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error: ApiError) => {
      console.error('Signup failed:', error.error || 'Signup failed');
    },
  });

  return mutation;
};
