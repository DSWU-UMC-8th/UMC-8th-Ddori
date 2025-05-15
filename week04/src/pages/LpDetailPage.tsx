import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { PAGINATION_ORDER } from "../enums/common";
import CommentSkeletonList from "../components/CommentSkeletonList";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const LpDetailPage = () => {
  const { id } = useParams();
  const lpId = Number(id);

  const { data, isPending, isError, isFetching } = useGetLpDetail(lpId);
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteComments(lpId, PAGINATION_ORDER.asc);

      const { ref, inView } = useInView({
        threshold: 0,
    })

    useEffect(() => {
        if(inView) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !isFetching && hasNextPage && fetchNextPage();  
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className={"mt-20 p-10"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error</div>;
  }
  return (
     <div>
      <div className="max-w-2xl mx-auto bg-zinc-900 text-white rounded-xl p-13 shadow-md space-y-4 mt-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img 
                src={data?.data.author.avatar}
                alt="프로필 이미지" 
                className="w-8 h-8 rounded-full" />
              <span className="font-medium">{data?.data.author.name}</span>
            </div>    
          </div>

          <div className="flex justify-between mt-8">
            <h1 className="text-xl font-semibold">{data?.data.title}</h1>
          </div>

          <div className="w-full flex justify-center mt-10">
            <div className="w-80 h-80 shadow-xl/60 rounded-lg flex items-center justify-center">
              <div 
                className="animate-spin relative w-72 h-72 rounded-full border-[6px] border-zinc-700"
                style={{ animationDuration: "13s" }}
                >
                <img
                  src={data?.data.thumbnail}
                  alt="lp cover"
                  className="w-full h-full object-cover rounded-full"
                />

                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border border-gray-800" />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-200 text-center leading-relaxed mt-10">
            {data?.data.content}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {data?.data.tags.map(tag => (
              <span key={tag.id} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-gray-300">
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 pt-4">
            <button className="text-xl">
              ♥️
            </button>
            <span className="text-sm">{data?.data.likes}</span>
          </div>
      </div>

       {/* 댓글 섹션 */}
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-zinc-800 rounded-lg text-white">
        <h2 className="text-xl font-semibold mb-4">댓글</h2>

{commentsData?.pages?.map((page, pageIndex) => (
  <div key={pageIndex}>
    {page.data?.data.map((comment) => (
      <div key={comment.id} className="border-b border-gray-700 py-3">
        <div className="flex items-center gap-3 mb-1">
          <img
            src={comment.author.avatar}
            alt="댓글 작성자 프로필"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium">{comment.author.name}</span>
          <span className="text-xs text-gray-400 ml-auto">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>
    ))}
  </div>
))}

        {isFetching && <CommentSkeletonList count={5} />}

      <div ref={ref} className="h-2"></div>
      </div>
    </div>
  );
};

export default LpDetailPage;
