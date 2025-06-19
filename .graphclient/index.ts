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

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Post = {
  id: Scalars['ID']['output'];
  author: Scalars['Bytes']['output'];
  cid: Scalars['String']['output'];
  tags: Array<Tag>;
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

export type PostDeleted = {
  id: Scalars['Bytes']['output'];
  postId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PostDeleted_filter = {
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
  and?: InputMaybe<Array<InputMaybe<PostDeleted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PostDeleted_filter>>>;
};

export type PostDeleted_orderBy =
  | 'id'
  | 'postId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type PostLiked = {
  id: Scalars['Bytes']['output'];
  postId: Scalars['BigInt']['output'];
  liker: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PostLiked_filter = {
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
  liker?: InputMaybe<Scalars['Bytes']['input']>;
  liker_not?: InputMaybe<Scalars['Bytes']['input']>;
  liker_gt?: InputMaybe<Scalars['Bytes']['input']>;
  liker_lt?: InputMaybe<Scalars['Bytes']['input']>;
  liker_gte?: InputMaybe<Scalars['Bytes']['input']>;
  liker_lte?: InputMaybe<Scalars['Bytes']['input']>;
  liker_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  liker_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  liker_contains?: InputMaybe<Scalars['Bytes']['input']>;
  liker_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<PostLiked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PostLiked_filter>>>;
};

export type PostLiked_orderBy =
  | 'id'
  | 'postId'
  | 'liker'
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

export type PostUnliked = {
  id: Scalars['Bytes']['output'];
  postId: Scalars['BigInt']['output'];
  unliker: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PostUnliked_filter = {
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
  unliker?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_not?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_gt?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_lt?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_gte?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_lte?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  unliker_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  unliker_contains?: InputMaybe<Scalars['Bytes']['input']>;
  unliker_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
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
  and?: InputMaybe<Array<InputMaybe<PostUnliked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PostUnliked_filter>>>;
};

export type PostUnliked_orderBy =
  | 'id'
  | 'postId'
  | 'unliker'
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
  postDeleted?: Maybe<PostDeleted>;
  postDeleteds: Array<PostDeleted>;
  postLiked?: Maybe<PostLiked>;
  postLikeds: Array<PostLiked>;
  postUnbookmarked?: Maybe<PostUnbookmarked>;
  postUnbookmarkeds: Array<PostUnbookmarked>;
  postUnliked?: Maybe<PostUnliked>;
  postUnlikeds: Array<PostUnliked>;
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


export type QuerypostDeletedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostDeletedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostDeleted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PostDeleted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostLikedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostLikedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostLiked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PostLiked_filter>;
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


export type QuerypostUnlikedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostUnlikedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostUnliked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PostUnliked_filter>;
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
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  CommentAdded: ResolverTypeWrapper<CommentAdded>;
  CommentAdded_filter: CommentAdded_filter;
  CommentAdded_orderBy: CommentAdded_orderBy;
  CommentDeleted: ResolverTypeWrapper<CommentDeleted>;
  CommentDeleted_filter: CommentDeleted_filter;
  CommentDeleted_orderBy: CommentDeleted_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Followed: ResolverTypeWrapper<Followed>;
  Followed_filter: Followed_filter;
  Followed_orderBy: Followed_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  Post: ResolverTypeWrapper<Post>;
  PostBookmarked: ResolverTypeWrapper<PostBookmarked>;
  PostBookmarked_filter: PostBookmarked_filter;
  PostBookmarked_orderBy: PostBookmarked_orderBy;
  PostDeleted: ResolverTypeWrapper<PostDeleted>;
  PostDeleted_filter: PostDeleted_filter;
  PostDeleted_orderBy: PostDeleted_orderBy;
  PostLiked: ResolverTypeWrapper<PostLiked>;
  PostLiked_filter: PostLiked_filter;
  PostLiked_orderBy: PostLiked_orderBy;
  PostUnbookmarked: ResolverTypeWrapper<PostUnbookmarked>;
  PostUnbookmarked_filter: PostUnbookmarked_filter;
  PostUnbookmarked_orderBy: PostUnbookmarked_orderBy;
  PostUnliked: ResolverTypeWrapper<PostUnliked>;
  PostUnliked_filter: PostUnliked_filter;
  PostUnliked_orderBy: PostUnliked_orderBy;
  Post_filter: Post_filter;
  Post_orderBy: Post_orderBy;
  ProfileUpdated: ResolverTypeWrapper<ProfileUpdated>;
  ProfileUpdated_filter: ProfileUpdated_filter;
  ProfileUpdated_orderBy: ProfileUpdated_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  Tag_filter: Tag_filter;
  Tag_orderBy: Tag_orderBy;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Tipped: ResolverTypeWrapper<Tipped>;
  Tipped_filter: Tipped_filter;
  Tipped_orderBy: Tipped_orderBy;
  Unfollowed: ResolverTypeWrapper<Unfollowed>;
  Unfollowed_filter: Unfollowed_filter;
  Unfollowed_orderBy: Unfollowed_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  CommentAdded: CommentAdded;
  CommentAdded_filter: CommentAdded_filter;
  CommentDeleted: CommentDeleted;
  CommentDeleted_filter: CommentDeleted_filter;
  Float: Scalars['Float']['output'];
  Followed: Followed;
  Followed_filter: Followed_filter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Post: Post;
  PostBookmarked: PostBookmarked;
  PostBookmarked_filter: PostBookmarked_filter;
  PostDeleted: PostDeleted;
  PostDeleted_filter: PostDeleted_filter;
  PostLiked: PostLiked;
  PostLiked_filter: PostLiked_filter;
  PostUnbookmarked: PostUnbookmarked;
  PostUnbookmarked_filter: PostUnbookmarked_filter;
  PostUnliked: PostUnliked;
  PostUnliked_filter: PostUnliked_filter;
  Post_filter: Post_filter;
  ProfileUpdated: ProfileUpdated;
  ProfileUpdated_filter: ProfileUpdated_filter;
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  Tag_filter: Tag_filter;
  Timestamp: Scalars['Timestamp']['output'];
  Tipped: Tipped;
  Tipped_filter: Tipped_filter;
  Unfollowed: Unfollowed;
  Unfollowed_filter: Unfollowed_filter;
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

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CommentAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CommentAdded'] = ResolversParentTypes['CommentAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  commentId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  commenter?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentDeletedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CommentDeleted'] = ResolversParentTypes['CommentDeleted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  commentId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Followed'] = ResolversParentTypes['Followed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
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

export type PostResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<PosttagsArgs, 'skip' | 'first'>>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostBookmarkedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PostBookmarked'] = ResolversParentTypes['PostBookmarked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bookmarker?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDeletedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PostDeleted'] = ResolversParentTypes['PostDeleted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostLikedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PostLiked'] = ResolversParentTypes['PostLiked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liker?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostUnbookmarkedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PostUnbookmarked'] = ResolversParentTypes['PostUnbookmarked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unbookmarker?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostUnlikedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PostUnliked'] = ResolversParentTypes['PostUnliked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unliker?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProfileUpdated'] = ResolversParentTypes['ProfileUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
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
  commentAdded?: Resolver<Maybe<ResolversTypes['CommentAdded']>, ParentType, ContextType, RequireFields<QuerycommentAddedArgs, 'id' | 'subgraphError'>>;
  commentAddeds?: Resolver<Array<ResolversTypes['CommentAdded']>, ParentType, ContextType, RequireFields<QuerycommentAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  commentDeleted?: Resolver<Maybe<ResolversTypes['CommentDeleted']>, ParentType, ContextType, RequireFields<QuerycommentDeletedArgs, 'id' | 'subgraphError'>>;
  commentDeleteds?: Resolver<Array<ResolversTypes['CommentDeleted']>, ParentType, ContextType, RequireFields<QuerycommentDeletedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  followed?: Resolver<Maybe<ResolversTypes['Followed']>, ParentType, ContextType, RequireFields<QueryfollowedArgs, 'id' | 'subgraphError'>>;
  followeds?: Resolver<Array<ResolversTypes['Followed']>, ParentType, ContextType, RequireFields<QueryfollowedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  postBookmarked?: Resolver<Maybe<ResolversTypes['PostBookmarked']>, ParentType, ContextType, RequireFields<QuerypostBookmarkedArgs, 'id' | 'subgraphError'>>;
  postBookmarkeds?: Resolver<Array<ResolversTypes['PostBookmarked']>, ParentType, ContextType, RequireFields<QuerypostBookmarkedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostArgs, 'id' | 'subgraphError'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostsArgs, 'skip' | 'first' | 'subgraphError'>>;
  postDeleted?: Resolver<Maybe<ResolversTypes['PostDeleted']>, ParentType, ContextType, RequireFields<QuerypostDeletedArgs, 'id' | 'subgraphError'>>;
  postDeleteds?: Resolver<Array<ResolversTypes['PostDeleted']>, ParentType, ContextType, RequireFields<QuerypostDeletedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  postLiked?: Resolver<Maybe<ResolversTypes['PostLiked']>, ParentType, ContextType, RequireFields<QuerypostLikedArgs, 'id' | 'subgraphError'>>;
  postLikeds?: Resolver<Array<ResolversTypes['PostLiked']>, ParentType, ContextType, RequireFields<QuerypostLikedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  postUnbookmarked?: Resolver<Maybe<ResolversTypes['PostUnbookmarked']>, ParentType, ContextType, RequireFields<QuerypostUnbookmarkedArgs, 'id' | 'subgraphError'>>;
  postUnbookmarkeds?: Resolver<Array<ResolversTypes['PostUnbookmarked']>, ParentType, ContextType, RequireFields<QuerypostUnbookmarkedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  postUnliked?: Resolver<Maybe<ResolversTypes['PostUnliked']>, ParentType, ContextType, RequireFields<QuerypostUnlikedArgs, 'id' | 'subgraphError'>>;
  postUnlikeds?: Resolver<Array<ResolversTypes['PostUnliked']>, ParentType, ContextType, RequireFields<QuerypostUnlikedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  profileUpdated?: Resolver<Maybe<ResolversTypes['ProfileUpdated']>, ParentType, ContextType, RequireFields<QueryprofileUpdatedArgs, 'id' | 'subgraphError'>>;
  profileUpdateds?: Resolver<Array<ResolversTypes['ProfileUpdated']>, ParentType, ContextType, RequireFields<QueryprofileUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QuerytagArgs, 'id' | 'subgraphError'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QuerytagsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tipped?: Resolver<Maybe<ResolversTypes['Tipped']>, ParentType, ContextType, RequireFields<QuerytippedArgs, 'id' | 'subgraphError'>>;
  tippeds?: Resolver<Array<ResolversTypes['Tipped']>, ParentType, ContextType, RequireFields<QuerytippedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unfollowed?: Resolver<Maybe<ResolversTypes['Unfollowed']>, ParentType, ContextType, RequireFields<QueryunfollowedArgs, 'id' | 'subgraphError'>>;
  unfolloweds?: Resolver<Array<ResolversTypes['Unfollowed']>, ParentType, ContextType, RequireFields<QueryunfollowedsArgs, 'skip' | 'first' | 'subgraphError'>>;
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

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TippedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Tipped'] = ResolversParentTypes['Tipped']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnfollowedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Unfollowed'] = ResolversParentTypes['Unfollowed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
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
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CommentAdded?: CommentAddedResolvers<ContextType>;
  CommentDeleted?: CommentDeletedResolvers<ContextType>;
  Followed?: FollowedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  PostBookmarked?: PostBookmarkedResolvers<ContextType>;
  PostDeleted?: PostDeletedResolvers<ContextType>;
  PostLiked?: PostLikedResolvers<ContextType>;
  PostUnbookmarked?: PostUnbookmarkedResolvers<ContextType>;
  PostUnliked?: PostUnlikedResolvers<ContextType>;
  ProfileUpdated?: ProfileUpdatedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Tipped?: TippedResolvers<ContextType>;
  Unfollowed?: UnfollowedResolvers<ContextType>;
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
              config: {"endpoint":"https://api.studio.thegraph.com/query/114177/mycontent-subgraph/v0.1.1"},
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
        "7fd085973cdb3c9cac305b09aeb8dcf094324aa7420281e6fe25ac793dd3c8a1": GetPostByIdDocument,
"7fd085973cdb3c9cac305b09aeb8dcf094324aa7420281e6fe25ac793dd3c8a1": GetPostsByAuthorDocument,
"7fd085973cdb3c9cac305b09aeb8dcf094324aa7420281e6fe25ac793dd3c8a1": GetPostsDocument
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
        sha256Hash: '7fd085973cdb3c9cac305b09aeb8dcf094324aa7420281e6fe25ac793dd3c8a1'
      },{
        document: GetPostsByAuthorDocument,
        get rawSDL() {
          return printWithCache(GetPostsByAuthorDocument);
        },
        location: 'GetPostsByAuthorDocument.graphql',
        sha256Hash: '7fd085973cdb3c9cac305b09aeb8dcf094324aa7420281e6fe25ac793dd3c8a1'
      },{
        document: GetPostsDocument,
        get rawSDL() {
          return printWithCache(GetPostsDocument);
        },
        location: 'GetPostsDocument.graphql',
        sha256Hash: '7fd085973cdb3c9cac305b09aeb8dcf094324aa7420281e6fe25ac793dd3c8a1'
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


export type GetPostByIdQuery = { post?: Maybe<Pick<Post, 'id' | 'author' | 'cid'>> };

export type GetPostsByAuthorQueryVariables = Exact<{
  author: Scalars['Bytes']['input'];
}>;


export type GetPostsByAuthorQuery = { posts: Array<Pick<Post, 'id' | 'author' | 'cid'>> };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { posts: Array<Pick<Post, 'id' | 'author' | 'cid'>> };


export const GetPostByIdDocument = gql`
    query GetPostById($id: ID!) {
  post(id: $id) {
    id
    author
    cid
  }
}
    ` as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostsByAuthorDocument = gql`
    query GetPostsByAuthor($author: Bytes!) {
  posts(where: {author: $author}) {
    id
    author
    cid
  }
}
    ` as unknown as DocumentNode<GetPostsByAuthorQuery, GetPostsByAuthorQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  posts(first: 5) {
    id
    author
    cid
  }
}
    ` as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;




export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetPostById(variables: GetPostByIdQueryVariables, options?: C): Promise<GetPostByIdQuery> {
      return requester<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, variables, options) as Promise<GetPostByIdQuery>;
    },
    GetPostsByAuthor(variables: GetPostsByAuthorQueryVariables, options?: C): Promise<GetPostsByAuthorQuery> {
      return requester<GetPostsByAuthorQuery, GetPostsByAuthorQueryVariables>(GetPostsByAuthorDocument, variables, options) as Promise<GetPostsByAuthorQuery>;
    },
    GetPosts(variables?: GetPostsQueryVariables, options?: C): Promise<GetPostsQuery> {
      return requester<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables, options) as Promise<GetPostsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;