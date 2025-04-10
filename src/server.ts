// import { Posts } from "./utils/types"

// // Solidity
// export const POSTS = [
//   {
//     cid: "bafkreifv3p4ragzcut7gzpj274trbszatczcgxajiz4g65jjhdbm7rhjgi",
//     author: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//     timestamp: BigInt(1742127315171),
//   }
// ]

// export const filterPostsByAuthor = (author: string) => {
//   return POSTS.filter(post => post.author === author)
// }
// // Solidity

// export const paginatePosts = (posts: Posts, page: number) => {
//   return posts.slice((page-1) * 5, ((page-1) * 5) + 5)
// }

// // Solidity
// export const LIKES = [
//   {
//     by: "0xbdafF4CDba93eFa2a35aD7A9B6F2f3A0DF54acA5",
//     postCid: "bafkreifv3p4ragzcut7gzpj274trbszatczcgxajiz4g65jjhdbm7rhjgi",
//   }
// ]

// export const getLikesNumberByPost = (cid: string) => {
//   return LIKES.filter(like => like.postCid === cid).length
// }

// export const filterLikesByUser = (user: string) => {
//   return LIKES.filter(like => like.by === user)
// }
// // Solidity

// export const like = (postCid: string, user: string) => {
//   LIKES.push({ by: user, postCid })
//   return getLikesNumberByPost(postCid)
// }

// export const unlike = (postCid: string, user: string) => {
//   const idx = LIKES.findIndex(like => like.by === user && like.postCid === postCid)
//   LIKES.splice(idx, 1)
//   return getLikesNumberByPost(postCid)
// }

// // Solidity
// export const COMMENTS = [
//   {
//     cid: "bafkreic3ab5hwabzg2eflx2elahu3hxmwtsz6sphxluyqz7ebewkwlrtha",
//     postCid: "bafkreifv3p4ragzcut7gzpj274trbszatczcgxajiz4g65jjhdbm7rhjgi",
//     timestamp: "2025-03-16T13:19:15.171Z",
//     commenter: "0x4d729551aDC0c7c9f87F086efC5Fc961f1b4F851",
//   }
// ]

// export const filterCommentsByPost = (postCid: string) => {
//   return COMMENTS.filter(comment => comment.postCid === postCid)
// }

// export const filterCommentsByCommenter = (commenter: string) => {
//   return COMMENTS.filter(comment => comment.commenter === commenter)
// }
// // Solidity

// export const getTotalPostComments = (postCid: string) => {
//   return filterCommentsByPost(postCid).length
// }
