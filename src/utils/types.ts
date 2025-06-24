export type PostComment = {
  [key: string]: PopulatedComment[]
}

export type SolidityComment = {
  cid: string;
  postCid: string;
  commenter: string;
}

export type PinataComment = {
  content: string;
  postCid: string;
  commenter: `0x${string}`;
  timestamp: number;
}

export type PopulatedComment = SolidityComment & PinataComment & {
  post?: PinataPost
}

export type SolidityPost = {
  id: string;
  cid: string;
}

export type PinataPost = {
  title: string;
  content: string;
  preview: string;
  author: `0x${string}`;
  timestamp: number;
  likes: number;
  comments: number;
  bookmarks: number;
  imageCIDs: string[];
  tags: string[];
  isDeleted: boolean;
  exists: boolean;
}

export type PopulatedPost = SolidityPost & PinataPost
export type FormattedPost = PopulatedPost & {
}

export type PostDetail = FormattedPost & {
  usersComments: PopulatedComment[];
}

export type Posts = {
  cid: string;
  author: string;
  timestamp: BigInt;
}[]

export type Comments = {
  cid: string;
  postCid: string;
  timestamp: BigInt;
  commenter: string;
}[]

export interface Tags {
  [tag: string]: boolean;
}

export interface TagDisplayMap {
  [tag: string]: string;
}