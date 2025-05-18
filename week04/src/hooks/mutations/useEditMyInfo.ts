import { useMutation } from "@tanstack/react-query";
import { editMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useEditMyInfo() {
  return useMutation({
    mutationFn: editMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useEditMyInfo;