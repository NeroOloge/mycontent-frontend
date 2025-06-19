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
  cid: string;
}

export type PinataPost = {
  title: string;
  content: string;
  author: `0x${string}`;
  timestamp: number;
}

export type PopulatedPost = SolidityPost & PinataPost
export type FormattedPost = PopulatedPost & {
  likes: number;
  comments: number;
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