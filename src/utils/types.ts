export type PostComment = {
  [key: string]: PopulatedComment[]
}

export type SolidityComment = {
  id: string;
  cid: string;
  post?: SolidityPost
}

export type PinataComment = {
  content: string;
  commenter: `0x${string}`;
  timestamp: number;
}

export type PopulatedComment = SolidityComment & PinataComment

export type SolidityPost = {
  id: string;
  cid: string;
  author: `0x${string}`;
  title: string;
  likes: number;
  bookmarks: number;
  comments: SolidityComment[];
}

export type PinataPost = {
  title: string;
  content: string;
  preview: string;
  author: `0x${string}`;
  timestamp: number;
  imageCIDs: string[];
  tags: string[];
  isDeleted: boolean;
  exists: boolean;
}

export type PopulatedPost = SolidityPost & PinataPost

export type Tags = {
  [tag: string]: boolean;
}

export type TagDisplayMap = {
  [tag: string]: string;
}

export type PostAnalytics = {
  likes: number;
  comments: number;
  bookmarks: number;
}

export type IProfile = {
  id: string;
  user: `0x${string}`
  username: string;
  bio: string;
  imageCID: string;
}

export type TopAuthor = {
  id: string;
  username?: string;
  address: `0x${string}`;
  totalLikes: number;
  postCount: number;
  imageCID?: string;
}

export type View = {
  postId: string;
  viewerType: 'guest' | 'wallet';
  viewerKey: string;
  durationMs?: number;
  scrolledPct?: number;
}