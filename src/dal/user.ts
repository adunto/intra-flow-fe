import type { PostSummary } from "@/types/post";
import type { User } from "@/types/user";
import { apiProxy } from "./proxy";

export const getUserInfo = async (): Promise<User> => {
  const response = await apiProxy<User>({
    url: "/users/profile",
    method: "GET",
    withCredentials: true,
  });

  return response;
};

export const getUserPosts = async (): Promise<PostSummary[]> => {
  const response = await apiProxy<PostSummary[]>({
    url: `/users/posts`,
    method: "GET",
    withCredentials: true,
  });

  return response;
};
