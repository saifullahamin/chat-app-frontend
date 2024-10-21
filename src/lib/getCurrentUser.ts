import apiFetch from "@/services/apiServer";

export const getCurrentUser = async () => {
  const currentUserResponse = await apiFetch(
    "/auth/get-user",
    {},
    {
      revalidate: 60,
      tags: ["users"],
    }
  );
  return currentUserResponse;
};
