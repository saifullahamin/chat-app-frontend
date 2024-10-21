import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { handleLogout };
};

export default useLogout;
