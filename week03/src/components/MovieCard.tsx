import { useState } from "react"
import { Movie } from "../types/movie"

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <img 
      src= {`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      alt={`${movie.title} 영화의 이미지`}
      className=""
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center p-4 text-white">
          <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
          <p className="text-sn text-gray-300 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
        </div>
      )}
    </div>
  )
}

export default MovieCard