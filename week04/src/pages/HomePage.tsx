import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data, isPending, isError } = useGetLpList({
    search,
  });

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
        {data?.map((lp) => (
          <LpCard
    key={lp.id}
    lp={{
      id: lp.id,
      title: lp.title,
      createdAt: lp.createdAt,
      likes: lp.likes.length,
      thumbnail: lp.thumbnail,
    }}
  />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
