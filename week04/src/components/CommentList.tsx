import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useInView } from "react-intersection-observer";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { PAGINATION_ORDER } from "../enums/common";

const CommentList = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const {
    data: comments,
    isPending,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetInfiniteComments(10, order);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) return <div className="mt-10">로딩 중...</div>;
  if (isError) return <div className="mt-10">오류가 발생했습니다.</div>;

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto px-4">
      <div className="flex justify-end gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-md ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-zinc-700 text-white"}`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>
        <button
          className={`px-3 py-1 rounded-md ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-zinc-700 text-white"}`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>

      <div className="space-y-3">
        {comments?.pages
          ?.map((page) => page.data.data)
          .flat()
          .map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>

      {/* 스켈레톤 or 로딩 */}
      {isFetching && (
        <div className="text-center text-sm text-gray-400 mt-4">댓글 불러오는 중...</div>
      )}
      <div ref={ref} className="h-4" />
    </div>
  );
};

export default CommentList;
