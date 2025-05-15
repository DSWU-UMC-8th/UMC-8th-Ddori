import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const dummyComments = [
  { id: 1, name: "연진김", text: "내가 썼음!", isMine: true },
  { id: 2, name: "Roger Kuphal", text: "Utrumque vilitas voluptates delicate annus." },
  { id: 3, name: "Ms. Melanie White Sr.", text: "Adicio abbas comminor atavus." },
  { id: 4, name: "Stacey Aufderhar", text: "Spero cedo celer nesciunt viriliter clamo vehemens." },
  // ...생략
];

export default function CommentSection() {
  const [input, setInput] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  return (
    <div className="w-full max-w-xl mx-auto mt-10 bg-zinc-800 p-6 rounded-2xl text-white">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>

      {/* 입력창 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none"
        />
        <button className="bg-zinc-600 px-4 py-2 rounded-md hover:bg-zinc-500">작성</button>
      </div>

      {/* 정렬 */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setSortNewest(false)}
          className={`px-3 py-1 rounded-md ${!sortNewest ? "bg-white text-black" : "bg-zinc-700"}`}
        >
          오래된순
        </button>
        <button
          onClick={() => setSortNewest(true)}
          className={`px-3 py-1 rounded-md ${sortNewest ? "bg-white text-black" : "bg-zinc-700"}`}
        >
          최신순
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div className="space-y-4">
        {dummyComments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-sm font-bold">
              {comment.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${comment.isMine ? "text-pink-400" : ""}`}>
                  {comment.name}
                </span>
                <FaEllipsisV className="text-zinc-400" />
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
