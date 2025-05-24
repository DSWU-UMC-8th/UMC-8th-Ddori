import { useRef, useState } from "react";
import { X } from "lucide-react"; // 아이콘 사용 시
import usePostLp from "../hooks/mutations/usePostLp";
import { uploadImage } from "../apis/lp";

const LpModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lpImage, setLpImage] = useState<File | null>(null);
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLpImage(file);
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const { mutate: postLp } = usePostLp();

   
const handleSubmit = async () => {
  if (!lpName || !lpContent || tags.length === 0) {
    return alert("모든 항목을 입력하세요");
  }

  if (!lpImage) {
    return alert("이미지를 업로드해주세요.");
  }

  try {
    const uploadedUrl = await uploadImage(lpImage);

    postLp({
      title: lpName,
      content: lpContent,
      tags,
      thumbnail: uploadedUrl,
      published: true,
    });

    alert("LP 등록 완료!");
    onClose();
  } catch (error) {
    console.error("LP 등록 실패:", error);
    alert("LP 등록 중 오류가 발생했습니다.");
  }
};

  return (
    <div
      ref={modalRef}
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-[#1c1c1e] text-white p-6 rounded-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <div onClick={handleImageClick} className="cursor-pointer">
            <img
              src={lpImage ? URL.createObjectURL(lpImage) : "/default-lp.png"}
              alt="LP"
              className="w-32 h-32 object-cover rounded-full border mb-4"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <input
            type="text"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
            placeholder="LP 제목"
            className="w-full mb-2 px-3 py-2 bg-[#2c2c2e] rounded"
          />
          <input
            type="text"
            value={lpContent}
            onChange={(e) => setLpContent(e.target.value)}
            placeholder="LP 내용"
            className="w-full mb-2 px-3 py-2 bg-[#2c2c2e] rounded"
          />
          <div className="flex gap-2 w-full mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              placeholder="LP Tag"
              className="flex-grow px-3 py-2 bg-[#2c2c2e] rounded"
            />
            <button
              onClick={addTag}
              className="bg-[#444] px-4 py-2 rounded text-sm"
            >
              Add
            </button>
          </div>

          {/* 태그 목록 표시 */}
          <div className="flex flex-wrap gap-2 w-full mb-4">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-[#3a3a3c] text-white px-2 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-pink-500 to-purple-500 w-full py-2 rounded mt-2">
            Add LP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpModal;
