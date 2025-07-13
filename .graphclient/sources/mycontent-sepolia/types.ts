// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace MycontentSepoliaTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type Author = {
  id: Scalars['ID']['output'];
  postCount: Scalars['Int']['output'];
  totalLikes: Scalars['Int']['output'];
  totalBookmarks: Scalars['Int']['output'];
};

export type Author_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  postCount_not?: InputMaybe<Scalars['Int']['input']>;
  postCount_gt?: InputMaybe<Scalars['Int']['input']>;
  postCount_lt?: InputMaybe<Scalars['Int']['input']>;
  postCount_gte?: InputMaybe<Scalars['Int']['input']>;
  postCount_lte?: InputMaybe<Scalars['Int']['input']>;
  postCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  postCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalLikes?: InputMaybe<Scalars['Int']['input']>;
  totalLikes_not?: InputMaybe<Scalars['Int']['input']>;
  totalLikes_gt?: InputMaybe<Scalars['Int']['input']>;
  totalLikes_lt?: InputMaybe<Scalars['Int']['input']>;
  totalLikes_gte?: InputMaybe<Scalars['Int']['input']>;
  totalLikes_lte?: InputMaybe<Scalars['Int']['input']>;
  totalLikes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalLikes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalBookmarks?: InputMaybe<Scalars['Int']['input']>;
  totalBookmarks_not?: InputMaybe<Scalars['Int']['input']>;
  totalBookmarks_gt?: InputMaybe<Scalars['Int']['input']>;
  totalBookmarks_lt?: InputMaybe<Scalars['Int']['input']>;
  totalBookmarks_gte?: InputMaybe<Scalars['Int']['input']>;
  totalBookmarks_lte?: InputMaybe<Scalars['Int']['input']>;
  totalBookmarks_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalBookmarks_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Author_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Author_filter>>>;
};

export type Author_orderBy =
  | 'id'
  | 'postCount'
  | 'totalLikes'
  | 'totalBookmarks';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Bookmark = {
  id: Scalars['ID']['output'];
  post: Post;
  user: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type Bookmark_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  post?: InputMaybe<Scalars['String']['input']>;
  post_not?: InputMaybe<Scalars['String']['input']>;
  post_gt?: InputMaybe<Scalars['String']['input']>;
  post_lt?: InputMaybe<Scalars['String']['input']>;
  post_gte?: InputMaybe<Scalars['String']['input']>;
  post_lte?: InputMaybe<Scalars['String']['input']>;
  post_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_contains?: InputMaybe<Scalars['String']['input']>;
  post_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_contains?: InputMaybe<Scalars['String']['input']>;
  post_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_?: InputMaybe<Post_filter>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bookmark_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bookmark_filter>>>;
};

export type Bookmark_orderBy =
  | 'id'
  | 'post'
  | 'post__id'
  | 'post__author'
  | 'post__authorString'
  | 'post__cid'
  | 'post__title'
  | 'post__likes'
  | 'post__bookmarks'
  | 'post__isDeleted'
  | 'post__exists'
  | 'post__blockNumber'
  | 'post__blockTimestamp'
  | 'post__transactionHash'
  | 'user'
  | 'timestamp';

export type Comment = {
  id: Scalars['ID']['output'];
  post: Post;
  commenter: Scalars['Bytes']['output'];
  cid: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  exists: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Comment_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  post?: InputMaybe<Scalars['String']['input']>;
  post_not?: InputMaybe<Scalars['String']['input']>;
  post_gt?: InputMaybe<Scalars['String']['input']>;
  post_lt?: InputMaybe<Scalars['String']['input']>;
  post_gte?: InputMaybe<Scalars['String']['input']>;
  post_lte?: InputMaybe<Scalars['String']['input']>;
  post_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_contains?: InputMaybe<Scalars['String']['input']>;
  post_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_contains?: InputMaybe<Scalars['String']['input']>;
  post_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_?: InputMaybe<Post_filter>;
  commenter?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_not?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_gt?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_lt?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_gte?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_lte?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  commenter_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  commenter_contains?: InputMaybe<Scalars['Bytes']['input']>;
  commenter_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cid?: InputMaybe<Scalars['String']['input']>;
  cid_not?: InputMaybe<Scalars['String']['input']>;
  cid_gt?: InputMaybe<Scalars['String']['input']>;
  cid_lt?: InputMaybe<Scalars['String']['input']>;
  cid_gte?: InputMaybe<Scalars['String']['input']>;
  cid_lte?: InputMaybe<Scalars['String']['input']>;
  cid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cid_contains?: InputMaybe<Scalars['String']['input']>;
  cid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_not_contains?: InputMaybe<Scalars['String']['input']>;
  cid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_starts_with?: InputMaybe<Scalars['String']['input']>;
  cid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  cid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_ends_with?: InputMaybe<Scalars['String']['input']>;
  cid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  cid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isDeleted_not?: InputMaybe<Scalars['Boolean']['input']>;
  isDeleted_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isDeleted_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  exists_not?: InputMaybe<Scalars['Boolean']['input']>;
  exists_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  exists_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Comment_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Comment_filter>>>;
};

export type Comment_orderBy =
  | 'id'
  | 'post'
  | 'post__id'
  | 'post__author'
  | 'post__authorString'
  | 'post__cid'
  | 'post__title'
  | 'post__likes'
  | 'post__bookmarks'
  | 'post__isDeleted'
  | 'post__exists'
  | 'post__blockNumber'
  | 'post__blockTimestamp'
  | 'post__transactionHash'
  | 'commenter'
  | 'cid'
  | 'isDeleted'
  | 'exists'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Follow = {
  id: Scalars['ID']['output'];
  follower: Scalars['Bytes']['output'];
  following: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Follow_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  follower?: InputMaybe<Scalars['Bytes']['input']>;
  follower_not?: InputMaybe<Scalars['Bytes']['input']>;
  follower_gt?: InputMaybe<Scalars['Bytes']['input']>;
  follower_lt?: InputMaybe<Scalars['Bytes']['input']>;
  follower_gte?: InputMaybe<Scalars['Bytes']['input']>;
  follower_lte?: InputMaybe<Scalars['Bytes']['input']>;
  follower_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  follower_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  follower_contains?: InputMaybe<Scalars['Bytes']['input']>;
  follower_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  following?: InputMaybe<Scalars['Bytes']['input']>;
  following_not?: InputMaybe<Scalars['Bytes']['input']>;
  following_gt?: InputMaybe<Scalars['Bytes']['input']>;
  following_lt?: InputMaybe<Scalars['Bytes']['input']>;
  following_gte?: InputMaybe<Scalars['Bytes']['input']>;
  following_lte?: InputMaybe<Scalars['Bytes']['input']>;
  following_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  following_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  following_contains?: InputMaybe<Scalars['Bytes']['input']>;
  following_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Follow_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Follow_filter>>>;
};

export type Follow_orderBy =
  | 'id'
  | 'follower'
  | 'following'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Like = {
  id: Scalars['ID']['output'];
  post: Post;
  user: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type Like_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  post?: InputMaybe<Scalars['String']['input']>;
  post_not?: InputMaybe<Scalars['String']['input']>;
  post_gt?: InputMaybe<Scalars['String']['input']>;
  post_lt?: InputMaybe<Scalars['String']['input']>;
  post_gte?: InputMaybe<Scalars['String']['input']>;
  post_lte?: InputMaybe<Scalars['String']['input']>;
  post_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_contains?: InputMaybe<Scalars['String']['input']>;
  post_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_contains?: InputMaybe<Scalars['String']['input']>;
  post_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_?: InputMaybe<Post_filter>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Like_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Like_filter>>>;
};

export type Like_orderBy =
  | 'id'
  | 'post'
  | 'post__id'
  | 'post__author'
  | 'post__authorString'
  | 'post__cid'
  | 'post__title'
  | 'post__likes'
  | 'post__bookmarks'
  | 'post__isDeleted'
  | 'post__exists'
  | 'post__blockNumber'
  | 'post__blockTimestamp'
  | 'post__transactionHash'
  | 'user'
  | 'timestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Post = {
  id: Scalars['ID']['output'];
  author: Scalars['Bytes']['output'];
  authorString: Scalars['String']['output'];
  cid: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tags: Array<Tag>;
  comments: Array<Comment>;
  likes: Scalars['Int']['output'];
  bookmarks: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  exists: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};


export type PosttagsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tag_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Tag_filter>;
};


export type PostcommentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Comment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Comment_filter>;
};

export type Post_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  author?: InputMaybe<Scalars['Bytes']['input']>;
  author_not?: InputMaybe<Scalars['Bytes']['input']>;
  author_gt?: InputMaybe<Scalars['Bytes']['input']>;
  author_lt?: InputMaybe<Scalars['Bytes']['input']>;
  author_gte?: InputMaybe<Scalars['Bytes']['input']>;
  author_lte?: InputMaybe<Scalars['Bytes']['input']>;
  author_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  author_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  author_contains?: InputMaybe<Scalars['Bytes']['input']>;
  author_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  authorString?: InputMaybe<Scalars['String']['input']>;
  authorString_not?: InputMaybe<Scalars['String']['input']>;
  authorString_gt?: InputMaybe<Scalars['String']['input']>;
  authorString_lt?: InputMaybe<Scalars['String']['input']>;
  authorString_gte?: InputMaybe<Scalars['String']['input']>;
  authorString_lte?: InputMaybe<Scalars['String']['input']>;
  authorString_in?: InputMaybe<Array<Scalars['String']['input']>>;
  authorString_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  authorString_contains?: InputMaybe<Scalars['String']['input']>;
  authorString_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  authorString_not_contains?: InputMaybe<Scalars['String']['input']>;
  authorString_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  authorString_starts_with?: InputMaybe<Scalars['String']['input']>;
  authorString_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  authorString_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  authorString_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  authorString_ends_with?: InputMaybe<Scalars['String']['input']>;
  authorString_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  authorString_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  authorString_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid?: InputMaybe<Scalars['String']['input']>;
  cid_not?: InputMaybe<Scalars['String']['input']>;
  cid_gt?: InputMaybe<Scalars['String']['input']>;
  cid_lt?: InputMaybe<Scalars['String']['input']>;
  cid_gte?: InputMaybe<Scalars['String']['input']>;
  cid_lte?: InputMaybe<Scalars['String']['input']>;
  cid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cid_contains?: InputMaybe<Scalars['String']['input']>;
  cid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_not_contains?: InputMaybe<Scalars['String']['input']>;
  cid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_starts_with?: InputMaybe<Scalars['String']['input']>;
  cid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  cid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_ends_with?: InputMaybe<Scalars['String']['input']>;
  cid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  cid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tags_?: InputMaybe<Tag_filter>;
  comments_?: InputMaybe<Comment_filter>;
  likes?: InputMaybe<Scalars['Int']['input']>;
  likes_not?: InputMaybe<Scalars['Int']['input']>;
  likes_gt?: InputMaybe<Scalars['Int']['input']>;
  likes_lt?: InputMaybe<Scalars['Int']['input']>;
  likes_gte?: InputMaybe<Scalars['Int']['input']>;
  likes_lte?: InputMaybe<Scalars['Int']['input']>;
  likes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  likes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  bookmarks?: InputMaybe<Scalars['Int']['input']>;
  bookmarks_not?: InputMaybe<Scalars['Int']['input']>;
  bookmarks_gt?: InputMaybe<Scalars['Int']['input']>;
  bookmarks_lt?: InputMaybe<Scalars['Int']['input']>;
  bookmarks_gte?: InputMaybe<Scalars['Int']['input']>;
  bookmarks_lte?: InputMaybe<Scalars['Int']['input']>;
  bookmarks_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  bookmarks_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isDeleted_not?: InputMaybe<Scalars['Boolean']['input']>;
  isDeleted_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isDeleted_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  exists_not?: InputMaybe<Scalars['Boolean']['input']>;
  exists_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  exists_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Post_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Post_filter>>>;
};

export type Post_orderBy =
  | 'id'
  | 'author'
  | 'authorString'
  | 'cid'
  | 'title'
  | 'tags'
  | 'comments'
  | 'likes'
  | 'bookmarks'
  | 'isDeleted'
  | 'exists'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Profile = {
  id: Scalars['ID']['output'];
  user: Scalars['Bytes']['output'];
  username: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  imageCID: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Profile_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_not?: InputMaybe<Scalars['String']['input']>;
  username_gt?: InputMaybe<Scalars['String']['input']>;
  username_lt?: InputMaybe<Scalars['String']['input']>;
  username_gte?: InputMaybe<Scalars['String']['input']>;
  username_lte?: InputMaybe<Scalars['String']['input']>;
  username_in?: InputMaybe<Array<Scalars['String']['input']>>;
  username_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  username_contains?: InputMaybe<Scalars['String']['input']>;
  username_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  username_not_contains?: InputMaybe<Scalars['String']['input']>;
  username_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  username_starts_with?: InputMaybe<Scalars['String']['input']>;
  username_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  username_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  username_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  username_ends_with?: InputMaybe<Scalars['String']['input']>;
  username_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  username_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  username_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  bio_not?: InputMaybe<Scalars['String']['input']>;
  bio_gt?: InputMaybe<Scalars['String']['input']>;
  bio_lt?: InputMaybe<Scalars['String']['input']>;
  bio_gte?: InputMaybe<Scalars['String']['input']>;
  bio_lte?: InputMaybe<Scalars['String']['input']>;
  bio_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bio_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_starts_with?: InputMaybe<Scalars['String']['input']>;
  bio_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bio_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_ends_with?: InputMaybe<Scalars['String']['input']>;
  bio_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bio_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageCID?: InputMaybe<Scalars['String']['input']>;
  imageCID_not?: InputMaybe<Scalars['String']['input']>;
  imageCID_gt?: InputMaybe<Scalars['String']['input']>;
  imageCID_lt?: InputMaybe<Scalars['String']['input']>;
  imageCID_gte?: InputMaybe<Scalars['String']['input']>;
  imageCID_lte?: InputMaybe<Scalars['String']['input']>;
  imageCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageCID_contains?: InputMaybe<Scalars['String']['input']>;
  imageCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  imageCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  imageCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  imageCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Profile_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Profile_filter>>>;
};

export type Profile_orderBy =
  | 'id'
  | 'user'
  | 'username'
  | 'bio'
  | 'imageCID'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  follow?: Maybe<Follow>;
  follows: Array<Follow>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  author?: Maybe<Author>;
  authors: Array<Author>;
  like?: Maybe<Like>;
  likes: Array<Like>;
  bookmark?: Maybe<Bookmark>;
  bookmarks: Array<Bookmark>;
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  tagSummary?: Maybe<TagSummary>;
  tagSummaries: Array<TagSummary>;
  tip?: Maybe<Tip>;
  tips: Array<Tip>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycommentArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycommentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Comment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Comment_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfollowArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfollowsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Follow_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Follow_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Post_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Post_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Author_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Author_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylikeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylikesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Like_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Like_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybookmarkArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybookmarksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bookmark_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bookmark_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofileArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofilesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Profile_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Profile_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytagArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytagsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tag_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Tag_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytagSummaryArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytagSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TagSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TagSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytipArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytipsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tip_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Tip_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Tag = {
  id: Scalars['ID']['output'];
  post: Post;
  tag: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TagSummary = {
  id: Scalars['ID']['output'];
  count: Scalars['Int']['output'];
  lastUsed?: Maybe<Scalars['BigInt']['output']>;
};

export type TagSummary_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_not?: InputMaybe<Scalars['Int']['input']>;
  count_gt?: InputMaybe<Scalars['Int']['input']>;
  count_lt?: InputMaybe<Scalars['Int']['input']>;
  count_gte?: InputMaybe<Scalars['Int']['input']>;
  count_lte?: InputMaybe<Scalars['Int']['input']>;
  count_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUsed?: InputMaybe<Scalars['BigInt']['input']>;
  lastUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TagSummary_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TagSummary_filter>>>;
};

export type TagSummary_orderBy =
  | 'id'
  | 'count'
  | 'lastUsed';

export type Tag_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  post?: InputMaybe<Scalars['String']['input']>;
  post_not?: InputMaybe<Scalars['String']['input']>;
  post_gt?: InputMaybe<Scalars['String']['input']>;
  post_lt?: InputMaybe<Scalars['String']['input']>;
  post_gte?: InputMaybe<Scalars['String']['input']>;
  post_lte?: InputMaybe<Scalars['String']['input']>;
  post_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  post_contains?: InputMaybe<Scalars['String']['input']>;
  post_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_contains?: InputMaybe<Scalars['String']['input']>;
  post_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  post_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  post_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  post_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  post_?: InputMaybe<Post_filter>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tag_not?: InputMaybe<Scalars['String']['input']>;
  tag_gt?: InputMaybe<Scalars['String']['input']>;
  tag_lt?: InputMaybe<Scalars['String']['input']>;
  tag_gte?: InputMaybe<Scalars['String']['input']>;
  tag_lte?: InputMaybe<Scalars['String']['input']>;
  tag_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tag_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tag_contains?: InputMaybe<Scalars['String']['input']>;
  tag_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tag_not_contains?: InputMaybe<Scalars['String']['input']>;
  tag_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tag_starts_with?: InputMaybe<Scalars['String']['input']>;
  tag_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tag_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tag_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tag_ends_with?: InputMaybe<Scalars['String']['input']>;
  tag_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tag_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tag_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tag_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Tag_filter>>>;
};

export type Tag_orderBy =
  | 'id'
  | 'post'
  | 'post__id'
  | 'post__author'
  | 'post__authorString'
  | 'post__cid'
  | 'post__title'
  | 'post__likes'
  | 'post__bookmarks'
  | 'post__isDeleted'
  | 'post__exists'
  | 'post__blockNumber'
  | 'post__blockTimestamp'
  | 'post__transactionHash'
  | 'tag'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Tip = {
  id: Scalars['ID']['output'];
  from: Scalars['Bytes']['output'];
  to: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Tip_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tip_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Tip_filter>>>;
};

export type Tip_orderBy =
  | 'id'
  | 'from'
  | 'to'
  | 'amount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  comment: InContextSdkMethod<Query['comment'], QuerycommentArgs, MeshContext>,
  /** null **/
  comments: InContextSdkMethod<Query['comments'], QuerycommentsArgs, MeshContext>,
  /** null **/
  follow: InContextSdkMethod<Query['follow'], QueryfollowArgs, MeshContext>,
  /** null **/
  follows: InContextSdkMethod<Query['follows'], QueryfollowsArgs, MeshContext>,
  /** null **/
  post: InContextSdkMethod<Query['post'], QuerypostArgs, MeshContext>,
  /** null **/
  posts: InContextSdkMethod<Query['posts'], QuerypostsArgs, MeshContext>,
  /** null **/
  author: InContextSdkMethod<Query['author'], QueryauthorArgs, MeshContext>,
  /** null **/
  authors: InContextSdkMethod<Query['authors'], QueryauthorsArgs, MeshContext>,
  /** null **/
  like: InContextSdkMethod<Query['like'], QuerylikeArgs, MeshContext>,
  /** null **/
  likes: InContextSdkMethod<Query['likes'], QuerylikesArgs, MeshContext>,
  /** null **/
  bookmark: InContextSdkMethod<Query['bookmark'], QuerybookmarkArgs, MeshContext>,
  /** null **/
  bookmarks: InContextSdkMethod<Query['bookmarks'], QuerybookmarksArgs, MeshContext>,
  /** null **/
  profile: InContextSdkMethod<Query['profile'], QueryprofileArgs, MeshContext>,
  /** null **/
  profiles: InContextSdkMethod<Query['profiles'], QueryprofilesArgs, MeshContext>,
  /** null **/
  tag: InContextSdkMethod<Query['tag'], QuerytagArgs, MeshContext>,
  /** null **/
  tags: InContextSdkMethod<Query['tags'], QuerytagsArgs, MeshContext>,
  /** null **/
  tagSummary: InContextSdkMethod<Query['tagSummary'], QuerytagSummaryArgs, MeshContext>,
  /** null **/
  tagSummaries: InContextSdkMethod<Query['tagSummaries'], QuerytagSummariesArgs, MeshContext>,
  /** null **/
  tip: InContextSdkMethod<Query['tip'], QuerytipArgs, MeshContext>,
  /** null **/
  tips: InContextSdkMethod<Query['tips'], QuerytipsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["mycontent-sepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
