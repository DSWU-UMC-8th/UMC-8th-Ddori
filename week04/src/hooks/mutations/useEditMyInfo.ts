import { useMutation } from "@tanstack/react-query";
import { editMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function useEditMyInfo() {
  return useMutation({
    mutationFn: editMyInfo,

    onMutate: async (newData) => {
      // 기존 myInfo 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      // 이전 데이터 저장
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      // Optimistic update: 캐시 업데이트
      if (previousMyInfo) {
        queryClient.setQueryData<ResponseMyInfoDto>(
          [QUERY_KEY.myInfo],
          {
            ...previousMyInfo,
            data: {
              ...previousMyInfo.data,
              name: newData.name,
              bio: newData.bio ?? null,
              avatar: newData.avatar ?? null,
            },
          }
        );
      }

      return { previousMyInfo };
    },

    onError: (error, _newData, context) => {
      // 실패 시 롤백
      if (context?.previousMyInfo) {
        queryClient.setQueryData(
          [QUERY_KEY.myInfo],
          context.previousMyInfo
        );
      }
    },

    onSettled: () => {
      // 성공 여부와 무관하게 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useEditMyInfo;
