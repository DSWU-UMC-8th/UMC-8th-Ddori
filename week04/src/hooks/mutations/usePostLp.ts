import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postLp } from "../../apis/lp";

function usePostLp() {
  return useMutation({
    mutationFn: postLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: false,
      });
    },
  });
}

export default usePostLp;