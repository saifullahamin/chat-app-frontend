import apiFetch from '@/services/apiServer';

export const getUsers = async () => {
  const usersResponse = await apiFetch('/users', {
    next: {
      revalidate: 60,
      tags: ['users'],
    },
  });
  return usersResponse;
};
