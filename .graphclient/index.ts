// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { MycontentSepoliaTypes } from './sources/mycontent-sepolia/types';
import * as importedModule$0 from "./sources/mycontent-sepolia/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  Author: ResolverTypeWrapper<Author>;
  Author_filter: Author_filter;
  Author_orderBy: Author_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Bookmark: ResolverTypeWrapper<Bookmark>;
  Bookmark_filter: Bookmark_filter;
  Bookmark_orderBy: Bookmark_orderBy;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  Comment_filter: Comment_filter;
  Comment_orderBy: Comment_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Follow: ResolverTypeWrapper<Follow>;
  Follow_filter: Follow_filter;
  Follow_orderBy: Follow_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Like_filter: Like_filter;
  Like_orderBy: Like_orderBy;
  OrderDirection: OrderDirection;
  Post: ResolverTypeWrapper<Post>;
  Post_filter: Post_filter;
  Post_orderBy: Post_orderBy;
  Profile: ResolverTypeWrapper<Profile>;
  Profile_filter: Profile_filter;
  Profile_orderBy: Profile_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagSummary: ResolverTypeWrapper<TagSummary>;
  TagSummary_filter: TagSummary_filter;
  TagSummary_orderBy: TagSummary_orderBy;
  Tag_filter: Tag_filter;
  Tag_orderBy: Tag_orderBy;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Tip: ResolverTypeWrapper<Tip>;
  Tip_filter: Tip_filter;
  Tip_orderBy: Tip_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Author: Author;
  Author_filter: Author_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Bookmark: Bookmark;
  Bookmark_filter: Bookmark_filter;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Comment: Comment;
  Comment_filter: Comment_filter;
  Float: Scalars['Float']['output'];
  Follow: Follow;
  Follow_filter: Follow_filter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Like: Like;
  Like_filter: Like_filter;
  Post: Post;
  Post_filter: Post_filter;
  Profile: Profile;
  Profile_filter: Profile_filter;
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  TagSummary: TagSummary;
  TagSummary_filter: TagSummary_filter;
  Tag_filter: Tag_filter;
  Timestamp: Scalars['Timestamp']['output'];
  Tip: Tip;
  Tip_filter: Tip_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalLikes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalBookmarks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BookmarkResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bookmark'] = ResolversParentTypes['Bookmark']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CommentResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  commenter?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  exists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Follow'] = ResolversParentTypes['Follow']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type LikeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  authorString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<PosttagsArgs, 'skip' | 'first'>>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<PostcommentsArgs, 'skip' | 'first'>>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bookmarks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  exists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageCID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerycommentArgs, 'id' | 'subgraphError'>>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerycommentsArgs, 'skip' | 'first' | 'subgraphError'>>;
  follow?: Resolver<Maybe<ResolversTypes['Follow']>, ParentType, ContextType, RequireFields<QueryfollowArgs, 'id' | 'subgraphError'>>;
  follows?: Resolver<Array<ResolversTypes['Follow']>, ParentType, ContextType, RequireFields<QueryfollowsArgs, 'skip' | 'first' | 'subgraphError'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostArgs, 'id' | 'subgraphError'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostsArgs, 'skip' | 'first' | 'subgraphError'>>;
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryauthorArgs, 'id' | 'subgraphError'>>;
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryauthorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QuerylikeArgs, 'id' | 'subgraphError'>>;
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QuerylikesArgs, 'skip' | 'first' | 'subgraphError'>>;
  bookmark?: Resolver<Maybe<ResolversTypes['Bookmark']>, ParentType, ContextType, RequireFields<QuerybookmarkArgs, 'id' | 'subgraphError'>>;
  bookmarks?: Resolver<Array<ResolversTypes['Bookmark']>, ParentType, ContextType, RequireFields<QuerybookmarksArgs, 'skip' | 'first' | 'subgraphError'>>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryprofileArgs, 'id' | 'subgraphError'>>;
  profiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryprofilesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QuerytagArgs, 'id' | 'subgraphError'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QuerytagsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tagSummary?: Resolver<Maybe<ResolversTypes['TagSummary']>, ParentType, ContextType, RequireFields<QuerytagSummaryArgs, 'id' | 'subgraphError'>>;
  tagSummaries?: Resolver<Array<ResolversTypes['TagSummary']>, ParentType, ContextType, RequireFields<QuerytagSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tip?: Resolver<Maybe<ResolversTypes['Tip']>, ParentType, ContextType, RequireFields<QuerytipArgs, 'id' | 'subgraphError'>>;
  tips?: Resolver<Array<ResolversTypes['Tip']>, ParentType, ContextType, RequireFields<QuerytipsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type TagResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagSummaryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TagSummary'] = ResolversParentTypes['TagSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUsed?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TipResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Tip'] = ResolversParentTypes['Tip']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Author?: AuthorResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bookmark?: BookmarkResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Comment?: CommentResolvers<ContextType>;
  Follow?: FollowResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Like?: LikeResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagSummary?: TagSummaryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Tip?: TipResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = MycontentSepoliaTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/mycontent-sepolia/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const mycontentSepoliaTransforms = [];
const additionalTypeDefs = [] as any[];
const mycontentSepoliaHandler = new GraphqlHandler({
              name: "mycontent-sepolia",
              config: {"endpoint":"https://api.studio.thegraph.com/query/114177/my-content-subgraph/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("mycontent-sepolia"),
              logger: logger.child("mycontent-sepolia"),
              importFn,
            });
sources[0] = {
          name: 'mycontent-sepolia',
          handler: mycontentSepoliaHandler,
          transforms: mycontentSepoliaTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetPostByIdDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetAuthorFirstPostDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetPostsByAuthorDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetPostsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetManyPostsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetMostLikedPostsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": FilterMostLikedPostsByTagDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": FilterMostLikedPostsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": FilterMostLikedPostsBySearchAndTagDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetPopularTagsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetTrendingTagsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": FilterPostsByTagDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": FilterPostsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": FilterPostsBySearchAndTagDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetCommentsByUserDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetFollowersDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetIsFollowingDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetPostUserInfoDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetTotalPostInfoByUserDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetPostsBookmarkedByUserDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetTopAuthorsDocument,
"9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2": GetProfileDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetPostByIdDocument,
        get rawSDL() {
          return printWithCache(GetPostByIdDocument);
        },
        location: 'GetPostByIdDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetAuthorFirstPostDocument,
        get rawSDL() {
          return printWithCache(GetAuthorFirstPostDocument);
        },
        location: 'GetAuthorFirstPostDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetPostsByAuthorDocument,
        get rawSDL() {
          return printWithCache(GetPostsByAuthorDocument);
        },
        location: 'GetPostsByAuthorDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetPostsDocument,
        get rawSDL() {
          return printWithCache(GetPostsDocument);
        },
        location: 'GetPostsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetManyPostsDocument,
        get rawSDL() {
          return printWithCache(GetManyPostsDocument);
        },
        location: 'GetManyPostsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetMostLikedPostsDocument,
        get rawSDL() {
          return printWithCache(GetMostLikedPostsDocument);
        },
        location: 'GetMostLikedPostsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: FilterMostLikedPostsByTagDocument,
        get rawSDL() {
          return printWithCache(FilterMostLikedPostsByTagDocument);
        },
        location: 'FilterMostLikedPostsByTagDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: FilterMostLikedPostsDocument,
        get rawSDL() {
          return printWithCache(FilterMostLikedPostsDocument);
        },
        location: 'FilterMostLikedPostsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: FilterMostLikedPostsBySearchAndTagDocument,
        get rawSDL() {
          return printWithCache(FilterMostLikedPostsBySearchAndTagDocument);
        },
        location: 'FilterMostLikedPostsBySearchAndTagDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetPopularTagsDocument,
        get rawSDL() {
          return printWithCache(GetPopularTagsDocument);
        },
        location: 'GetPopularTagsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetTrendingTagsDocument,
        get rawSDL() {
          return printWithCache(GetTrendingTagsDocument);
        },
        location: 'GetTrendingTagsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: FilterPostsByTagDocument,
        get rawSDL() {
          return printWithCache(FilterPostsByTagDocument);
        },
        location: 'FilterPostsByTagDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: FilterPostsDocument,
        get rawSDL() {
          return printWithCache(FilterPostsDocument);
        },
        location: 'FilterPostsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: FilterPostsBySearchAndTagDocument,
        get rawSDL() {
          return printWithCache(FilterPostsBySearchAndTagDocument);
        },
        location: 'FilterPostsBySearchAndTagDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetCommentsByUserDocument,
        get rawSDL() {
          return printWithCache(GetCommentsByUserDocument);
        },
        location: 'GetCommentsByUserDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetFollowersDocument,
        get rawSDL() {
          return printWithCache(GetFollowersDocument);
        },
        location: 'GetFollowersDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetIsFollowingDocument,
        get rawSDL() {
          return printWithCache(GetIsFollowingDocument);
        },
        location: 'GetIsFollowingDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetPostUserInfoDocument,
        get rawSDL() {
          return printWithCache(GetPostUserInfoDocument);
        },
        location: 'GetPostUserInfoDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetTotalPostInfoByUserDocument,
        get rawSDL() {
          return printWithCache(GetTotalPostInfoByUserDocument);
        },
        location: 'GetTotalPostInfoByUserDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetPostsBookmarkedByUserDocument,
        get rawSDL() {
          return printWithCache(GetPostsBookmarkedByUserDocument);
        },
        location: 'GetPostsBookmarkedByUserDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetTopAuthorsDocument,
        get rawSDL() {
          return printWithCache(GetTopAuthorsDocument);
        },
        location: 'GetTopAuthorsDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      },{
        document: GetProfileDocument,
        get rawSDL() {
          return printWithCache(GetProfileDocument);
        },
        location: 'GetProfileDocument.graphql',
        sha256Hash: '9fa808116132072c906cd51cdccfc6db6d19feb4b0e90877b1358067d95f17b2'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostByIdQuery = { post?: Maybe<(
    Pick<Post, 'id' | 'author' | 'cid' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter' | 'blockTimestamp'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type GetAuthorFirstPostQueryVariables = Exact<{
  author: Scalars['Bytes']['input'];
}>;


export type GetAuthorFirstPostQuery = { posts: Array<Pick<Post, 'id' | 'author' | 'cid' | 'blockTimestamp'>> };

export type GetPostsByAuthorQueryVariables = Exact<{
  author: Scalars['Bytes']['input'];
}>;


export type GetPostsByAuthorQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type GetPostsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
}>;


export type GetPostsQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type GetManyPostsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetManyPostsQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type GetMostLikedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMostLikedPostsQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type FilterMostLikedPostsByTagQueryVariables = Exact<{
  tag: Scalars['String']['input'];
}>;


export type FilterMostLikedPostsByTagQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type FilterMostLikedPostsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type FilterMostLikedPostsQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type FilterMostLikedPostsBySearchAndTagQueryVariables = Exact<{
  title: Scalars['String']['input'];
  author: Scalars['String']['input'];
  tag: Scalars['String']['input'];
}>;


export type FilterMostLikedPostsBySearchAndTagQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type GetPopularTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularTagsQuery = { tagSummaries: Array<Pick<TagSummary, 'id' | 'count'>> };

export type GetTrendingTagsQueryVariables = Exact<{
  time?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetTrendingTagsQuery = { tags: Array<Pick<Tag, 'id' | 'tag' | 'blockTimestamp'>> };

export type FilterPostsByTagQueryVariables = Exact<{
  tag: Scalars['String']['input'];
}>;


export type FilterPostsByTagQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type FilterPostsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type FilterPostsQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type FilterPostsBySearchAndTagQueryVariables = Exact<{
  title: Scalars['String']['input'];
  author: Scalars['String']['input'];
  tag: Scalars['String']['input'];
}>;


export type FilterPostsBySearchAndTagQuery = { posts: Array<(
    Pick<Post, 'id' | 'author' | 'cid' | 'title' | 'likes' | 'bookmarks'>
    & { comments: Array<Pick<Comment, 'id' | 'cid' | 'commenter'>>, tags: Array<Pick<Tag, 'id' | 'tag'>> }
  )> };

export type GetCommentsByUserQueryVariables = Exact<{
  user: Scalars['Bytes']['input'];
}>;


export type GetCommentsByUserQuery = { comments: Array<(
    Pick<Comment, 'id' | 'cid' | 'commenter'>
    & { post: Pick<Post, 'id' | 'author' | 'title'> }
  )> };

export type GetFollowersQueryVariables = Exact<{
  user: Scalars['Bytes']['input'];
}>;


export type GetFollowersQuery = { followers: Array<Pick<Follow, 'id' | 'follower' | 'following'>>, following: Array<Pick<Follow, 'id' | 'follower' | 'following'>> };

export type GetIsFollowingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetIsFollowingQuery = { isFollowing?: Maybe<Pick<Follow, 'id' | 'follower' | 'following'>> };

export type GetPostUserInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostUserInfoQuery = { like?: Maybe<(
    Pick<Like, 'user'>
    & { post: Pick<Post, 'id'> }
  )>, bookmark?: Maybe<(
    Pick<Bookmark, 'user'>
    & { post: Pick<Post, 'id'> }
  )> };

export type GetTotalPostInfoByUserQueryVariables = Exact<{
  user: Scalars['Bytes']['input'];
}>;


export type GetTotalPostInfoByUserQuery = { likes: Array<(
    Pick<Like, 'id' | 'user'>
    & { post: Pick<Post, 'id'> }
  )>, bookmarks: Array<(
    Pick<Bookmark, 'user'>
    & { post: Pick<Post, 'id'> }
  )>, comments: Array<(
    Pick<Comment, 'id' | 'commenter'>
    & { post: Pick<Post, 'id'> }
  )> };

export type GetPostsBookmarkedByUserQueryVariables = Exact<{
  user: Scalars['Bytes']['input'];
}>;


export type GetPostsBookmarkedByUserQuery = { bookmarks: Array<(
    Pick<Bookmark, 'user'>
    & { post: Pick<Post, 'id'> }
  )> };

export type GetTopAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopAuthorsQuery = { authors: Array<Pick<Author, 'id' | 'postCount' | 'totalLikes'>> };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProfileQuery = { profile?: Maybe<Pick<Profile, 'id' | 'user' | 'username' | 'bio' | 'imageCID'>> };


export const GetPostByIdDocument = gql`
    query GetPostById($id: ID!) {
  post(id: $id) {
    id
    author
    cid
    likes
    bookmarks
    comments(orderBy: blockTimestamp, orderDirection: desc) {
      id
      cid
      commenter
      blockTimestamp
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetAuthorFirstPostDocument = gql`
    query GetAuthorFirstPost($author: Bytes!) {
  posts(
    orderBy: blockTimestamp
    orderDirection: asc
    first: 1
    where: {author: $author}
  ) {
    id
    author
    cid
    blockTimestamp
  }
}
    ` as unknown as DocumentNode<GetAuthorFirstPostQuery, GetAuthorFirstPostQueryVariables>;
export const GetPostsByAuthorDocument = gql`
    query GetPostsByAuthor($author: Bytes!) {
  posts(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 10
    where: {author: $author, isDeleted: false}
  ) {
    id
    author
    cid
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<GetPostsByAuthorQuery, GetPostsByAuthorQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($skip: Int!) {
  posts(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 10
    skip: $skip
    where: {isDeleted: false}
  ) {
    id
    author
    cid
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const GetManyPostsDocument = gql`
    query GetManyPosts($ids: [ID!]) {
  posts(
    orderBy: blockTimestamp
    orderDirection: desc
    where: {isDeleted: false, id_in: $ids}
  ) {
    id
    author
    cid
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<GetManyPostsQuery, GetManyPostsQueryVariables>;
export const GetMostLikedPostsDocument = gql`
    query GetMostLikedPosts {
  posts(
    orderBy: likes
    orderDirection: desc
    first: 10
    where: {isDeleted: false}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<GetMostLikedPostsQuery, GetMostLikedPostsQueryVariables>;
export const FilterMostLikedPostsByTagDocument = gql`
    query FilterMostLikedPostsByTag($tag: String!) {
  posts(
    orderBy: likes
    orderDirection: desc
    first: 10
    where: {isDeleted: false, tags_: {tag_contains: $tag}}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<FilterMostLikedPostsByTagQuery, FilterMostLikedPostsByTagQueryVariables>;
export const FilterMostLikedPostsDocument = gql`
    query FilterMostLikedPosts($searchTerm: String!) {
  posts(
    orderBy: likes
    orderDirection: desc
    first: 10
    where: {and: [{isDeleted: false}, {or: [{title_contains_nocase: $searchTerm}, {tags_: {tag_contains: $searchTerm}}, {authorString_contains_nocase: $searchTerm}]}]}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<FilterMostLikedPostsQuery, FilterMostLikedPostsQueryVariables>;
export const FilterMostLikedPostsBySearchAndTagDocument = gql`
    query FilterMostLikedPostsBySearchAndTag($title: String!, $author: String!, $tag: String!) {
  posts(
    orderBy: likes
    orderDirection: desc
    first: 10
    where: {and: [{isDeleted: false}, {tags_: {tag_contains: $tag}}, {or: [{title_contains_nocase: $title}, {authorString_contains_nocase: $author}]}]}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<FilterMostLikedPostsBySearchAndTagQuery, FilterMostLikedPostsBySearchAndTagQueryVariables>;
export const GetPopularTagsDocument = gql`
    query GetPopularTags {
  tagSummaries(orderBy: count, orderDirection: desc, first: 10) {
    id
    count
  }
}
    ` as unknown as DocumentNode<GetPopularTagsQuery, GetPopularTagsQueryVariables>;
export const GetTrendingTagsDocument = gql`
    query GetTrendingTags($time: BigInt) {
  tags(where: {blockTimestamp_gt: $time}, first: 10) {
    id
    tag
    blockTimestamp
  }
}
    ` as unknown as DocumentNode<GetTrendingTagsQuery, GetTrendingTagsQueryVariables>;
export const FilterPostsByTagDocument = gql`
    query FilterPostsByTag($tag: String!) {
  posts(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 10
    where: {isDeleted: false, tags_: {tag_contains: $tag}}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<FilterPostsByTagQuery, FilterPostsByTagQueryVariables>;
export const FilterPostsDocument = gql`
    query FilterPosts($searchTerm: String!) {
  posts(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 10
    where: {and: [{isDeleted: false}, {or: [{title_contains_nocase: $searchTerm}, {tags_: {tag_contains: $searchTerm}}, {authorString_contains_nocase: $searchTerm}]}]}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<FilterPostsQuery, FilterPostsQueryVariables>;
export const FilterPostsBySearchAndTagDocument = gql`
    query FilterPostsBySearchAndTag($title: String!, $author: String!, $tag: String!) {
  posts(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 10
    where: {and: [{isDeleted: false}, {tags_: {tag_contains: $tag}}, {or: [{title_contains_nocase: $title}, {authorString_contains_nocase: $author}]}]}
  ) {
    id
    author
    cid
    title
    likes
    bookmarks
    comments {
      id
      cid
      commenter
    }
    tags {
      id
      tag
    }
  }
}
    ` as unknown as DocumentNode<FilterPostsBySearchAndTagQuery, FilterPostsBySearchAndTagQueryVariables>;
export const GetCommentsByUserDocument = gql`
    query GetCommentsByUser($user: Bytes!) {
  comments(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 10
    where: {commenter: $user}
  ) {
    id
    cid
    commenter
    post {
      id
      author
      title
    }
  }
}
    ` as unknown as DocumentNode<GetCommentsByUserQuery, GetCommentsByUserQueryVariables>;
export const GetFollowersDocument = gql`
    query GetFollowers($user: Bytes!) {
  followers: follows(where: {following: $user}) {
    id
    follower
    following
  }
  following: follows(where: {follower: $user}) {
    id
    follower
    following
  }
}
    ` as unknown as DocumentNode<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetIsFollowingDocument = gql`
    query GetIsFollowing($id: ID!) {
  isFollowing: follow(id: $id) {
    id
    follower
    following
  }
}
    ` as unknown as DocumentNode<GetIsFollowingQuery, GetIsFollowingQueryVariables>;
export const GetPostUserInfoDocument = gql`
    query GetPostUserInfo($id: ID!) {
  like(id: $id) {
    user
    post {
      id
    }
  }
  bookmark(id: $id) {
    user
    post {
      id
    }
  }
}
    ` as unknown as DocumentNode<GetPostUserInfoQuery, GetPostUserInfoQueryVariables>;
export const GetTotalPostInfoByUserDocument = gql`
    query GetTotalPostInfoByUser($user: Bytes!) {
  likes(where: {user: $user}) {
    id
    user
    post {
      id
    }
  }
  bookmarks(where: {user: $user}) {
    user
    post {
      id
    }
  }
  comments(where: {commenter: $user}) {
    id
    commenter
    post {
      id
    }
  }
}
    ` as unknown as DocumentNode<GetTotalPostInfoByUserQuery, GetTotalPostInfoByUserQueryVariables>;
export const GetPostsBookmarkedByUserDocument = gql`
    query GetPostsBookmarkedByUser($user: Bytes!) {
  bookmarks(
    orderBy: timestamp
    orderDirection: desc
    first: 10
    where: {user: $user}
  ) {
    user
    post {
      id
    }
  }
}
    ` as unknown as DocumentNode<GetPostsBookmarkedByUserQuery, GetPostsBookmarkedByUserQueryVariables>;
export const GetTopAuthorsDocument = gql`
    query GetTopAuthors {
  authors(orderBy: totalLikes, orderDirection: desc, first: 5) {
    id
    postCount
    totalLikes
  }
}
    ` as unknown as DocumentNode<GetTopAuthorsQuery, GetTopAuthorsQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($id: ID!) {
  profile(id: $id) {
    id
    user
    username
    bio
    imageCID
  }
}
    ` as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;























export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetPostById(variables: GetPostByIdQueryVariables, options?: C): Promise<GetPostByIdQuery> {
      return requester<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, variables, options) as Promise<GetPostByIdQuery>;
    },
    GetAuthorFirstPost(variables: GetAuthorFirstPostQueryVariables, options?: C): Promise<GetAuthorFirstPostQuery> {
      return requester<GetAuthorFirstPostQuery, GetAuthorFirstPostQueryVariables>(GetAuthorFirstPostDocument, variables, options) as Promise<GetAuthorFirstPostQuery>;
    },
    GetPostsByAuthor(variables: GetPostsByAuthorQueryVariables, options?: C): Promise<GetPostsByAuthorQuery> {
      return requester<GetPostsByAuthorQuery, GetPostsByAuthorQueryVariables>(GetPostsByAuthorDocument, variables, options) as Promise<GetPostsByAuthorQuery>;
    },
    GetPosts(variables: GetPostsQueryVariables, options?: C): Promise<GetPostsQuery> {
      return requester<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables, options) as Promise<GetPostsQuery>;
    },
    GetManyPosts(variables?: GetManyPostsQueryVariables, options?: C): Promise<GetManyPostsQuery> {
      return requester<GetManyPostsQuery, GetManyPostsQueryVariables>(GetManyPostsDocument, variables, options) as Promise<GetManyPostsQuery>;
    },
    GetMostLikedPosts(variables?: GetMostLikedPostsQueryVariables, options?: C): Promise<GetMostLikedPostsQuery> {
      return requester<GetMostLikedPostsQuery, GetMostLikedPostsQueryVariables>(GetMostLikedPostsDocument, variables, options) as Promise<GetMostLikedPostsQuery>;
    },
    FilterMostLikedPostsByTag(variables: FilterMostLikedPostsByTagQueryVariables, options?: C): Promise<FilterMostLikedPostsByTagQuery> {
      return requester<FilterMostLikedPostsByTagQuery, FilterMostLikedPostsByTagQueryVariables>(FilterMostLikedPostsByTagDocument, variables, options) as Promise<FilterMostLikedPostsByTagQuery>;
    },
    FilterMostLikedPosts(variables: FilterMostLikedPostsQueryVariables, options?: C): Promise<FilterMostLikedPostsQuery> {
      return requester<FilterMostLikedPostsQuery, FilterMostLikedPostsQueryVariables>(FilterMostLikedPostsDocument, variables, options) as Promise<FilterMostLikedPostsQuery>;
    },
    FilterMostLikedPostsBySearchAndTag(variables: FilterMostLikedPostsBySearchAndTagQueryVariables, options?: C): Promise<FilterMostLikedPostsBySearchAndTagQuery> {
      return requester<FilterMostLikedPostsBySearchAndTagQuery, FilterMostLikedPostsBySearchAndTagQueryVariables>(FilterMostLikedPostsBySearchAndTagDocument, variables, options) as Promise<FilterMostLikedPostsBySearchAndTagQuery>;
    },
    GetPopularTags(variables?: GetPopularTagsQueryVariables, options?: C): Promise<GetPopularTagsQuery> {
      return requester<GetPopularTagsQuery, GetPopularTagsQueryVariables>(GetPopularTagsDocument, variables, options) as Promise<GetPopularTagsQuery>;
    },
    GetTrendingTags(variables?: GetTrendingTagsQueryVariables, options?: C): Promise<GetTrendingTagsQuery> {
      return requester<GetTrendingTagsQuery, GetTrendingTagsQueryVariables>(GetTrendingTagsDocument, variables, options) as Promise<GetTrendingTagsQuery>;
    },
    FilterPostsByTag(variables: FilterPostsByTagQueryVariables, options?: C): Promise<FilterPostsByTagQuery> {
      return requester<FilterPostsByTagQuery, FilterPostsByTagQueryVariables>(FilterPostsByTagDocument, variables, options) as Promise<FilterPostsByTagQuery>;
    },
    FilterPosts(variables: FilterPostsQueryVariables, options?: C): Promise<FilterPostsQuery> {
      return requester<FilterPostsQuery, FilterPostsQueryVariables>(FilterPostsDocument, variables, options) as Promise<FilterPostsQuery>;
    },
    FilterPostsBySearchAndTag(variables: FilterPostsBySearchAndTagQueryVariables, options?: C): Promise<FilterPostsBySearchAndTagQuery> {
      return requester<FilterPostsBySearchAndTagQuery, FilterPostsBySearchAndTagQueryVariables>(FilterPostsBySearchAndTagDocument, variables, options) as Promise<FilterPostsBySearchAndTagQuery>;
    },
    GetCommentsByUser(variables: GetCommentsByUserQueryVariables, options?: C): Promise<GetCommentsByUserQuery> {
      return requester<GetCommentsByUserQuery, GetCommentsByUserQueryVariables>(GetCommentsByUserDocument, variables, options) as Promise<GetCommentsByUserQuery>;
    },
    GetFollowers(variables: GetFollowersQueryVariables, options?: C): Promise<GetFollowersQuery> {
      return requester<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, variables, options) as Promise<GetFollowersQuery>;
    },
    GetIsFollowing(variables: GetIsFollowingQueryVariables, options?: C): Promise<GetIsFollowingQuery> {
      return requester<GetIsFollowingQuery, GetIsFollowingQueryVariables>(GetIsFollowingDocument, variables, options) as Promise<GetIsFollowingQuery>;
    },
    GetPostUserInfo(variables: GetPostUserInfoQueryVariables, options?: C): Promise<GetPostUserInfoQuery> {
      return requester<GetPostUserInfoQuery, GetPostUserInfoQueryVariables>(GetPostUserInfoDocument, variables, options) as Promise<GetPostUserInfoQuery>;
    },
    GetTotalPostInfoByUser(variables: GetTotalPostInfoByUserQueryVariables, options?: C): Promise<GetTotalPostInfoByUserQuery> {
      return requester<GetTotalPostInfoByUserQuery, GetTotalPostInfoByUserQueryVariables>(GetTotalPostInfoByUserDocument, variables, options) as Promise<GetTotalPostInfoByUserQuery>;
    },
    GetPostsBookmarkedByUser(variables: GetPostsBookmarkedByUserQueryVariables, options?: C): Promise<GetPostsBookmarkedByUserQuery> {
      return requester<GetPostsBookmarkedByUserQuery, GetPostsBookmarkedByUserQueryVariables>(GetPostsBookmarkedByUserDocument, variables, options) as Promise<GetPostsBookmarkedByUserQuery>;
    },
    GetTopAuthors(variables?: GetTopAuthorsQueryVariables, options?: C): Promise<GetTopAuthorsQuery> {
      return requester<GetTopAuthorsQuery, GetTopAuthorsQueryVariables>(GetTopAuthorsDocument, variables, options) as Promise<GetTopAuthorsQuery>;
    },
    GetProfile(variables: GetProfileQueryVariables, options?: C): Promise<GetProfileQuery> {
      return requester<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, variables, options) as Promise<GetProfileQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;