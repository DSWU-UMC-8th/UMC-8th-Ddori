import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useEditMyInfo from "../hooks/mutations/useEditMyInfo";
import { uploadImage } from "../apis/lp";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false); // ✅ 업로드 상태

  const { mutate: editInfoMutate } = useEditMyInfo();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyInfo();
      setData(response);
      setName(response.data.name);
      setBio(response.data.bio ?? "");
      setAvatar(response.data.avatar ?? "");
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("닉네임은 빈칸일 수 없습니다!");
      return;
    }

    editInfoMutate(
      { name, bio, avatar },
      {
        onSuccess: async () => {
          const updated = await getMyInfo();
          setData(updated);
          setIsEditing(false);
        },
      }
    );
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file); // ✅ 파일 업로드
      setAvatar(imageUrl); // ✅ URL 설정
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 p-6 text-white bg-black min-h-screen">
      {!isEditing ? (
        <>
          <h1 className="text-2xl font-semibold">{data.data.name}님 환영합니다</h1>
          <img
            src={data.data.avatar || "/default-avatar.png"}
            alt="프로필"
            className="w-24 h-24 rounded-full bg-white"
          />
          <p>{data.data.email}</p>
          <p className="text-gray-400">{data.data.bio || "소개글이 없습니다."}</p>

          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              설정
            </button>
            <button
              onClick={handleLogout}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              로그아웃
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">내 정보 수정</h2>

          <label>
            닉네임*
            <input
              type="text"
              className="block w-full mt-1 p-2 rounded bg-zinc-800 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            소개글
            <textarea
              className="block w-full mt-1 p-2 rounded bg-zinc-800 text-white"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>

          <label>
            프로필 사진
            <div className="flex items-center gap-4 mt-1">
              <img
                src={avatar || "/default-avatar.png"}
                alt="프로필 미리보기"
                className="w-16 h-16 rounded-full bg-white"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-white"
              />
              {uploading && <span className="text-sm text-gray-400">업로드 중...</span>}
            </div>
          </label>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPage;
