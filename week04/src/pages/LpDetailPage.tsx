import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";

const LpDetailPage = () => {
  const { id } = useParams();
    const { data, isPending, isError } = useGetLpDetail(Number(id));

  if (isPending) {
    return <div className={"mt-20 p-10"}>Loading...</div>;
  }

  if (isError) {
    <div className={"mt-20"}>Error</div>;
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
    </div>
  );
};

export default LpDetailPage;
