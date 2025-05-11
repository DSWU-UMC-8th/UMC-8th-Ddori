import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LpCard = ({ lp }) => {
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
      className="relative group overflow-hidden rounded-md shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        <h2 className="text-lg font-semibold">{lp.title}</h2>
        <p className="text-sm">{lp.createdAt}</p>
        <p className="text-sm">❤️ {lp.likes}</p>
      </div>
    </div>
  );
};

export default LpCard;
