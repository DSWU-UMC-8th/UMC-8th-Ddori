import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";
import { getComments } from "../../apis/comment";

function useGetInfiniteComments(
  lpId: number,
  order: PAGINATION_ORDER,
  limit?: number
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getComments(lpId, { cursor: pageParam, order, ...(limit && { limit }) }),
    queryKey: [QUERY_KEY.comments, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteComments;
