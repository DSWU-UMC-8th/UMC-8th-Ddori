import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lp } from "../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleCardClick = () => {
    if (accessToken) {
      navigate(`/lp/${lp.id}`);
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-md shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 will-change-transform"
      onClick={handleCardClick}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-64 object-cover rounded-md"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        <h2 className="text-lg font-semibold">{lp.title}</h2>
        <p className="text-sm">{lp.createdAt}</p>
        <p className="text-sm">❤️ {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard;
