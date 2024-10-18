import apiFetch from '@/services/apiServer';

export const getCurrentUser = async () => {
  const currentUserResponse = await apiFetch('/auth/get-user', {
    next: {
      tags: ['currentUser'],
    },
  });
  return currentUserResponse;
};
