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

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type CommentAdded = {
  id: Scalars['Bytes']['output'];
  commentId: Scalars['BigInt']['output'];
  postId: Scalars['BigInt']['output'];
  commenter: Scalars['Bytes']['output'];
  cid: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CommentAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  commentId?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_not?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commentId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  postId?: InputMaybe<Scalars['BigInt']['input']>;
  postId_not?: InputMaybe<Scalars['BigInt']['input']>;
  postId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  postId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  postId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  postId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  postId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  postId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  and?: InputMaybe<Array<InputMaybe<CommentAdded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CommentAdded_filter>>>;
};

export type CommentAdded_orderBy =
  | 'id'
  | 'commentId'
  | 'postId'
  | 'commenter'
  | 'cid'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CommentDeleted = {
  id: Scalars['Bytes']['output'];
  commentId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CommentDeleted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  commentId?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_not?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  commentId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commentId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  and?: InputMaybe<Array<InputMaybe<CommentDeleted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CommentDeleted_filter>>>;
};

export type CommentDeleted_orderBy =
  | 'id'
  | 'commentId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Followed = {
  id: Scalars['Bytes']['output'];
  follower: Scalars['Bytes']['output'];
  following: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Followed_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<Followed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Followed_filter>>>;
};

export type Followed_orderBy =
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
  | 'post__cid'
  | 'post__likes'
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
  cid: Scalars['String']['output'];
  tags: Array<Tag>;
  likes: Scalars['Int']['output'];
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

export type PostBookmarked = {
  id: Scalars['Bytes']['output'];
  postId: Scalars['BigInt']['output'];
  bookmarker: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PostBookmarked_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  postId?: InputMaybe<Scalars['BigInt']['input']>;
  postId_not?: InputMaybe<Scalars['BigInt']['input']>;
  postId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  postId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  postId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  postId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  postId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  postId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bookmarker?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_not?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bookmarker_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bookmarker_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bookmarker_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<PostBookmarked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PostBookmarked_filter>>>;
};

export type PostBookmarked_orderBy =
  | 'id'
  | 'postId'
  | 'bookmarker'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type PostUnbookmarked = {
  id: Scalars['Bytes']['output'];
  postId: Scalars['BigInt']['output'];
  unbookmarker: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PostUnbookmarked_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  postId?: InputMaybe<Scalars['BigInt']['input']>;
  postId_not?: InputMaybe<Scalars['BigInt']['input']>;
  postId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  postId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  postId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  postId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  postId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  postId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unbookmarker?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_not?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_gt?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_lt?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_gte?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_lte?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  unbookmarker_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  unbookmarker_contains?: InputMaybe<Scalars['Bytes']['input']>;
  unbookmarker_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<PostUnbookmarked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PostUnbookmarked_filter>>>;
};

export type PostUnbookmarked_orderBy =
  | 'id'
  | 'postId'
  | 'unbookmarker'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

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
  tags_?: InputMaybe<Tag_filter>;
  likes?: InputMaybe<Scalars['Int']['input']>;
  likes_not?: InputMaybe<Scalars['Int']['input']>;
  likes_gt?: InputMaybe<Scalars['Int']['input']>;
  likes_lt?: InputMaybe<Scalars['Int']['input']>;
  likes_gte?: InputMaybe<Scalars['Int']['input']>;
  likes_lte?: InputMaybe<Scalars['Int']['input']>;
  likes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  likes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  | 'cid'
  | 'tags'
  | 'likes'
  | 'isDeleted'
  | 'exists'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ProfileUpdated = {
  id: Scalars['Bytes']['output'];
  user: Scalars['Bytes']['output'];
  username: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  imageCID: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProfileUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<ProfileUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProfileUpdated_filter>>>;
};

export type ProfileUpdated_orderBy =
  | 'id'
  | 'user'
  | 'username'
  | 'bio'
  | 'imageCID'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  commentAdded?: Maybe<CommentAdded>;
  commentAddeds: Array<CommentAdded>;
  commentDeleted?: Maybe<CommentDeleted>;
  commentDeleteds: Array<CommentDeleted>;
  followed?: Maybe<Followed>;
  followeds: Array<Followed>;
  postBookmarked?: Maybe<PostBookmarked>;
  postBookmarkeds: Array<PostBookmarked>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  like?: Maybe<Like>;
  likes: Array<Like>;
  postUnbookmarked?: Maybe<PostUnbookmarked>;
  postUnbookmarkeds: Array<PostUnbookmarked>;
  profileUpdated?: Maybe<ProfileUpdated>;
  profileUpdateds: Array<ProfileUpdated>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  tipped?: Maybe<Tipped>;
  tippeds: Array<Tipped>;
  unfollowed?: Maybe<Unfollowed>;
  unfolloweds: Array<Unfollowed>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycommentAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycommentAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CommentAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CommentAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycommentDeletedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycommentDeletedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CommentDeleted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CommentDeleted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfollowedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfollowedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Followed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Followed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostBookmarkedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostBookmarkedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostBookmarked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PostBookmarked_filter>;
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


export type QuerypostUnbookmarkedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostUnbookmarkedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostUnbookmarked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PostUnbookmarked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofileUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofileUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProfileUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProfileUpdated_filter>;
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


export type QuerytippedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytippedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tipped_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Tipped_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunfollowedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunfollowedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Unfollowed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unfollowed_filter>;
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
  | 'post__cid'
  | 'post__likes'
  | 'post__isDeleted'
  | 'post__exists'
  | 'post__blockNumber'
  | 'post__blockTimestamp'
  | 'post__transactionHash'
  | 'tag'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Tipped = {
  id: Scalars['Bytes']['output'];
  from: Scalars['Bytes']['output'];
  to: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Tipped_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<Tipped_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Tipped_filter>>>;
};

export type Tipped_orderBy =
  | 'id'
  | 'from'
  | 'to'
  | 'amount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Unfollowed = {
  id: Scalars['Bytes']['output'];
  follower: Scalars['Bytes']['output'];
  following: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Unfollowed_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<Unfollowed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Unfollowed_filter>>>;
};

export type Unfollowed_orderBy =
  | 'id'
  | 'follower'
  | 'following'
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
  commentAdded: InContextSdkMethod<Query['commentAdded'], QuerycommentAddedArgs, MeshContext>,
  /** null **/
  commentAddeds: InContextSdkMethod<Query['commentAddeds'], QuerycommentAddedsArgs, MeshContext>,
  /** null **/
  commentDeleted: InContextSdkMethod<Query['commentDeleted'], QuerycommentDeletedArgs, MeshContext>,
  /** null **/
  commentDeleteds: InContextSdkMethod<Query['commentDeleteds'], QuerycommentDeletedsArgs, MeshContext>,
  /** null **/
  followed: InContextSdkMethod<Query['followed'], QueryfollowedArgs, MeshContext>,
  /** null **/
  followeds: InContextSdkMethod<Query['followeds'], QueryfollowedsArgs, MeshContext>,
  /** null **/
  postBookmarked: InContextSdkMethod<Query['postBookmarked'], QuerypostBookmarkedArgs, MeshContext>,
  /** null **/
  postBookmarkeds: InContextSdkMethod<Query['postBookmarkeds'], QuerypostBookmarkedsArgs, MeshContext>,
  /** null **/
  post: InContextSdkMethod<Query['post'], QuerypostArgs, MeshContext>,
  /** null **/
  posts: InContextSdkMethod<Query['posts'], QuerypostsArgs, MeshContext>,
  /** null **/
  like: InContextSdkMethod<Query['like'], QuerylikeArgs, MeshContext>,
  /** null **/
  likes: InContextSdkMethod<Query['likes'], QuerylikesArgs, MeshContext>,
  /** null **/
  postUnbookmarked: InContextSdkMethod<Query['postUnbookmarked'], QuerypostUnbookmarkedArgs, MeshContext>,
  /** null **/
  postUnbookmarkeds: InContextSdkMethod<Query['postUnbookmarkeds'], QuerypostUnbookmarkedsArgs, MeshContext>,
  /** null **/
  profileUpdated: InContextSdkMethod<Query['profileUpdated'], QueryprofileUpdatedArgs, MeshContext>,
  /** null **/
  profileUpdateds: InContextSdkMethod<Query['profileUpdateds'], QueryprofileUpdatedsArgs, MeshContext>,
  /** null **/
  tag: InContextSdkMethod<Query['tag'], QuerytagArgs, MeshContext>,
  /** null **/
  tags: InContextSdkMethod<Query['tags'], QuerytagsArgs, MeshContext>,
  /** null **/
  tipped: InContextSdkMethod<Query['tipped'], QuerytippedArgs, MeshContext>,
  /** null **/
  tippeds: InContextSdkMethod<Query['tippeds'], QuerytippedsArgs, MeshContext>,
  /** null **/
  unfollowed: InContextSdkMethod<Query['unfollowed'], QueryunfollowedArgs, MeshContext>,
  /** null **/
  unfolloweds: InContextSdkMethod<Query['unfolloweds'], QueryunfollowedsArgs, MeshContext>,
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
