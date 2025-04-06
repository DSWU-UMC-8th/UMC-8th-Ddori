/// <reference types="vite/client" />
interface InportMetaEnv {
  readonly VITE_TMDB_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMeta;
}