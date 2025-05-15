import { CursorBasedResponse } from "./common";

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: string; 
  updatedAt: string;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;
