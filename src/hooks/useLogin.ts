import { useMutation } from '@tanstack/react-query';
import apiFetch from '@/services/apiClient';
import { useRouter } from 'next/navigation';

interface ApiError {
  error: string;
}

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return apiFetch('/auth/login', {
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
      console.error('Login failed:', error.error || 'Login failed');
    },
  });

  return mutation;
};
