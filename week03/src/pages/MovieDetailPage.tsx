import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner";
import { Credit, MovieDetail } from "../types/movieDetail";

const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetail>();
    const [credit, setCredit] = useState<Credit>();
    const { movieId } = useParams<{movieId: string;}>();
    // 로딩 상태
    const [isPending, setIsPending] = useState(false);
    // 에러 상태
    const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true);

      try {
      const { data } = await axios.get<MovieDetail>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovie(data);
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchCredit = async () => {
      setIsPending(true);
      
      try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      // console.log(data);
      setCredit(data);
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
    };

    fetchCredit();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )} 
      
      {!isPending && (
        <div className="text-white bg-black min-h-screen">
          {movie && (
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-10 left-10 space-y-4">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="text-xl">평균 {movie.vote_average}</p>
                <p>{movie.release_date.slice(0, 4)}</p>
                <p>{movie.runtime}분</p>
                <p className="max-w-xl text-gray-300">{movie.overview}</p>
              </div>
            </div>
          )}

          {credit && (
            <div className="p-10">
              <h2 className="text-3xl font-bold border-b border-white pb-2 mb-6">감독/출연</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {credit.cast.map((cast) => (
                  <div key={cast.credit_id} className="flex flex-col items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                      alt={cast.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-white"
                    />
                    <p className="mt-2 font-semibold text-center">{cast.name}</p>
                    <p className="text-sm text-gray-400 text-center">{cast.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default MovieDetailPage