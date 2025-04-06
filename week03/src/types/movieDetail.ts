// 장르
export type Genre = {
  id: number;
  name: string;
};

// 소속 컬렉션
export type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

// 제작사
export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

// 제작 국가
export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

// 언어
export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

// 영화 상세 타입
export type MovieDetail = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// 출연진 (Cast)
export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

// 제작진 (Crew)
export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  department: string;
  job: string;
  credit_id: string;
};

// 크레딧 전체 (Credits)
export type Credit = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
