import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import LpModal from "../components/LpModal";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { data, isPending, isError } = useGetLpList({
  //   search,
  // });

  const { data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(50, search, PAGINATION_ORDER.desc);

  // ref -> 특정한 HTML 요소를 감시
  // inView -> 그 요소가 화면에 보이면 true
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
    <div className={"mt-20"}>Error</div>;
  }

  return (
    <div className="mt-20 px-6">
      <input
        className="mb-4 px-4 py-2 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="LP 검색"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lps?.pages?.map((page) => page.data.data)
                    ?.flat()
                    ?.map((lp) => (<LpCard
    key={lp.id}
    lp={lp}
  />))}
  <LpCardSkeletonList count={20}/>
  {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer fixed bottom-8 right-8 bg-pink-500 text-white p-4 rounded-full shadow-lg text-2xl"
      >
        +
      </button>
      {isModalOpen && <LpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
