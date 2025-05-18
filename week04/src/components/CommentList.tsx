import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Comment from "./Comment";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { PAGINATION_ORDER } from "../enums/common";
import CommentSkeletonList from "./CommentSkeletonList";
import CommentInput from "./CommentInput";

interface CommentListProps {
  lpId: number;
}

const CommentList = ({ lpId }: CommentListProps) => {
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetInfiniteComments(lpId, PAGINATION_ORDER.asc);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-zinc-800 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>

      <CommentInput lpId={lpId} />

      {commentsData?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data?.data.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ))}

      {isFetching && <CommentSkeletonList count={5} />}
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default CommentList;
