import { useQuery } from '@tanstack/react-query';
import apiFetch from '@/services/apiClient';
import { User } from '@/types/interfaces';

export const useUserDetails = () => {
  return useQuery<User, Error>({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const response = await apiFetch('/auth/get-user');
      return response;
    },
  });
};
