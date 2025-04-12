import { PinataSDK } from "pinata"
import { PinataComment, PinataPost, SolidityComment, SolidityPost } from "./types"
import { PINATA_COMMENT_GROUP, PINATA_POST_GROUP } from "./constants"

const vitePinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YzFlOWQwYi02ZWRiLTRkNjAtODM1ZS04NGFhMWRjMjM2NWIiLCJlbWFpbCI6Im5vbG9nZTM3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiZjlkN2I2YWYyZWRhYzQzY2UyYyIsInNjb3BlZEtleVNlY3JldCI6IjNjNjFjNWFjNWY2YmNlYzRmZDc1MDJmY2FlYTM1NTdjMWVmYmI1Njg0ZjBhYWI2MzEzMzVlNWNlZGU3YjBjYTkiLCJleHAiOjE3NzM4MzQ2OTR9.kSa84jSeACzRNopwcSQLtn8bLTt4S74pt2zFqsCL8Vo"

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT || vitePinataJwt}`,
  pinataGateway: `${import.meta.env.VITE_PINATA_GATEWAY_URL}`
})

export const populatePost = async (post: SolidityPost) => {
  return (await pinata.gateways.public.get(post.cid)).data as unknown as PinataPost
}

export const populatePosts = async (posts: SolidityPost[]) => {
  const populatedPosts = []
  for (let post of posts) {
    const postJSON = await populatePost(post)
    populatedPosts.push({...postJSON, cid: post.cid})
  }
  return populatedPosts
}

export const populateComment = async (comment: SolidityComment) => {
  return (await pinata.gateways.public.get(comment.cid)).data as unknown as PinataComment
}

export const populateComments = async (comments: SolidityComment[]) => {
  const populatedComments = []
  for (let comment of comments) {
    const commentJSON = await populateComment(comment)
    populatedComments.push({...commentJSON, cid: comment.cid})
  }
  return populatedComments
}

export const uploadPost = async ({ title, content, author, timestamp }: PinataPost, fileName: string) => {
  const data = await pinata.upload.public.json({
    timestamp,
    title,
    content,
    author
  }).group(PINATA_POST_GROUP).name(fileName)
  return data
}

export const uploadComment = async ({ commenter, timestamp, content, postCid }: PinataComment, fileName: string) => {
  const data = await pinata.upload.public.json({
    postCid,
    commenter,
    timestamp,
    content
  }).group(PINATA_COMMENT_GROUP).name(fileName)
  return data
}

export const getFileId = async (fileName: string) => {
  const { files } = await pinata.files.public.list().name(fileName)
  return files?.[0].id
}

export const deleteFile = async (fileName: string) => {
  const fileId = await getFileId(fileName)
  return await pinata.files.public.delete([fileId])
}