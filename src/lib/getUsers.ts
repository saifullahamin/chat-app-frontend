import apiFetch from "@/services/apiServer";

export const getUsers = async () => {
  const usersResponse = await apiFetch(
    "/users",
    {},
    { revalidate: 60, tags: ["currUser"] }
  );
  return usersResponse;
};
