import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorld: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
};

export type createLp = {
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    tags: Tag[];
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type LpDetail = {
    data: {
        id: number;
        title: string,
        content: string,
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
        author: Author;
    };
};

export type ResponseLpDto = CommonResponse<Lp>;

  export type RequestLpDto = {
    lpId: number;
  }

    export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
  }>;