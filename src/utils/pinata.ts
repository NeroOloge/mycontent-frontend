import { PinataSDK, UploadResponse } from "pinata"
import { PinataComment, PinataPost, PopulatedComment, PostComment, SolidityComment, SolidityPost } from "./types"
import { PINATA_COMMENT_GROUP, PINATA_DRAFT_IMAGE_GROUP, PINATA_POST_GROUP } from "./constants"

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT!}`,
  pinataGateway: `${import.meta.env.VITE_PINATA_GATEWAY_URL}`
})

export const populatePost = async (postCid: string) => {
  return (await pinata.gateways.public.get(postCid)).data as unknown as PinataPost
}

export const populatePosts = async (posts: SolidityPost[]) => {
  const populatedPosts = []
  for (let post of posts) {
    const postJSON = await populatePost(post.cid)
    populatedPosts.push({...postJSON, cid: post.cid, id: post.id})
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

export const formatComments = async (populatedComments: PopulatedComment[]) => {
  const formattedComments: PostComment = {}
  await Promise.all(populatedComments.map(async (comment) => {
    const currPostComments = (formattedComments[comment.postCid] || [])
    const populatedPost = await populatePost(comment.postCid)
    currPostComments.push({ ...comment, post: populatedPost })
    formattedComments[comment.postCid] = currPostComments
  }))
  return formattedComments
}

export const uploadPost = async (post: PinataPost, fileName: string): Promise<UploadResponse> => {
  const data = await pinata.upload.public.json(post)
    .group(PINATA_POST_GROUP).name(fileName)
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

const generateSignedUrl = async (fileName: string) => {
  try {
    const url = await pinata.upload.public.createSignedURL({
      expires: 30,
      name: fileName,
      groupId: PINATA_DRAFT_IMAGE_GROUP
    })
    return url
  } catch (error) {
    console.error(error)
  }
}

export const uploadDraftImage = async (fileName: string, file: File) => {
  try {
    const url = await generateSignedUrl(fileName)

    if (url) {
      const upload = await pinata.upload.public.file(file).url(url)
      return upload
    }
  } catch (error) {
    console.error(error)
  }
}

export const uploadBase64 = async (fileName: string, base64: string) => {
  try {
    const url = await generateSignedUrl(fileName)

    if (url) {
      const upload = await pinata.upload.public.base64(base64).url(url)
      return upload
    }
  } catch (error) {
    console.error(error)
  }
}

export const convertToURL = async (cid: string) => {
  const url = await pinata.gateways.public.convert(
    cid
  )
  return url
}