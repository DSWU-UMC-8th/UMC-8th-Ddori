import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostComment() {
  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: [QUERY_KEY.comments] });
    }
  });
}
export default usePostComment;