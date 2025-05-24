import { PaginationDto } from "../types/common";
import { createLp, LpDetail, RequestLpDto, ResponseLikeLpDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto : PaginationDto) : Promise<ResponseLpListDto> => {
  const{data} = await axiosInstance.get('v1/lps', {
    params: paginationDto
  });

  return data;
};

export const getLpDetail = async (id: number): Promise<LpDetail> => {
    const {data} = await axiosInstance.get(`/v1/lps/${id}`);
    return data;
};

export const postLike = async ({lpId,}: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    return data;
};

export const deleteLike = async ({lpId,}: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
};

export const postLp = async (lp: createLp) => {
  const { data } = await axiosInstance.post("/v1/lps", lp);
  return data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.data.imageUrl;
};