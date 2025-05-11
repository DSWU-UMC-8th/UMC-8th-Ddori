import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { accessToken } = useAuth();
const [data, setData] = useState<ResponseMyInfoDto | null>(null);
 const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    if (accessToken) {
    getData();
  }
  }, [accessToken]);
  return (
    <>
    <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 z-20 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0 w-48" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="text-pink-500 font-bold text-2xl">DOLIGO</div>
          <button onClick={() => setSidebarOpen(false)}>
            <FiX className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-4">
          <Link to="/search" className="hover:text-pink-400">🔍 찾기</Link>
          {accessToken && (
            <Link to="/my" className="hover:text-pink-400">📄 마이페이지</Link>
          )}
        </nav>
        <div className="absolute bottom-4 px-4 text-sm text-gray-400 hover:text-red-500 cursor-pointer">
          🔓 탈퇴하기
        </div>
      </aside>
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
  <div className="flex items-center justify-between p-4">

    <div className="flex items-center gap-4">
      <button onClick={() => setSidebarOpen(true)}>
        <FiMenu className="text-2xl" />
      </button>
      <Link
        to="/"
        className="text-xl font-bold text-gray-900 dark:text-white"
      >
        돌려돌려LP판
      </Link>
    </div>

    <div className="space-x-6">
      <Link
        to={"/search"}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
      >
        🔍
      </Link>
      {!accessToken && (
        <>
          <Link
            to={"/login"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            로그인
          </Link>
          <Link
            to={"/signup"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            회원가입
          </Link>
        </>
      )}

      {accessToken && (
        <Link
          to={"/my"}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          {data?.data.name}님 반갑습니다.
        </Link>
      )}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar