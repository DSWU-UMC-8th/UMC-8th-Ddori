import { useState } from "react";
import usePostComment from "../hooks/mutations/usePostComment";

interface CommentInputProps {
  lpId: number;
}

const CommentInput = ({ lpId }: CommentInputProps) => {
  const [content, setContent] = useState("");
  const { mutate: postComment } = usePostComment();

  const handleSubmit = () => {
    if (!content.trim()) return;

    postComment(
      { lpId, content },
      {
        onSuccess: () => {
          setContent(""); // 입력창 초기화
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 rounded bg-zinc-700 placeholder-gray-400 text-white"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-zinc-600 px-4 py-1 rounded text-sm text-white disabled:opacity-50"
        >
          작성
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
