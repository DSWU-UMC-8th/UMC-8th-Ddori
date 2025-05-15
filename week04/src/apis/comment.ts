import { ResponseCommentListDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const getComments = async (
  lpId: number,
  params: { cursor?: number; limit?: number; order: "asc" | "desc" }
): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params,
  });
  return data;
};
