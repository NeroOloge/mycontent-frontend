import { doc, setDoc } from "firebase/firestore"
import { db, Draft } from "./db"
import { convertToURL, uploadBase64 } from "./pinata"
import { firestore } from "./firebase"
import { PopulatedComment, PopulatedPost, Tags } from "./types"

const getAMPM = (hour: number) => {
  if (hour === 0) return "AM"
  else if (hour === 12) return "PM"
  if (hour > 12) return "PM"
  else return "AM"
}

const getHour = (hour: number) => {
  if (hour === 0) return 12
  else if (hour > 12) return hour - 12
  else return hour
}

export const displayTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const [__, timeString] = date.toLocaleString().split(", ")
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const [hour, minute, _] = timeString.split(":")
  
  return `${day}/${month}/${year} 
    ${getHour(Number(hour))}:${minute} ${getAMPM(Number(hour))}`
}

export const displayAddress = (address: `0x${string}`) => {
  return `${address?.slice(0, 5)}...${address?.slice(address?.length-3)}`
}

export const syncLocalDrafts = async (localDrafts: Draft[], address: `0x${string}`) => {
  const localDraftIds = []
  for (const draft of localDrafts) {
    let updatedContent = draft.content
    const updatedImages = []
    for (const image of draft.images) {
      const draftImageUpload = await uploadBase64("", image)
      if (draftImageUpload) {
        const draftImageUrl = await convertToURL(draftImageUpload.cid)
        updatedContent = draft.content.replace(image, draftImageUrl)
        updatedImages.push(draftImageUrl)
      }
    }
    
    await setDoc(doc(firestore, "drafts", `${draft.id}`), {
      ...draft,
      author: address,
      content: updatedContent,
      images: updatedImages,
      id: draft.id,
    })
    localDraftIds.push(draft.id)
  }
  db.drafts.bulkDelete(localDraftIds)
}

export const getPreview = (html: string) => {
  const regex = /<p>(.*?)<\/p>/g
  const matches = Array.from(html.matchAll(regex))
  
  const paragraphs = matches.map(match => match[1]).filter(p => p.length > 0)
  return paragraphs.length > 0 ? paragraphs[0] : ""
}

export const formatTags = (tags: Tags) => {
  const formattedTags: string[] = []
  Object.keys(tags).forEach(tag => {
    if (tags[tag]) {
      // if (tag.charAt(0) !== "#") formattedTags.push(`#${tag}`)
      formattedTags.push(tag)
    }
  })
  return formattedTags
}

export const unformatTags = (formattedTags: string[]) => {
  const tags: Tags = {}
  formattedTags.forEach(tag => {
    tags[tag] = true
  })
  return tags
}

export const appendHash = (tag: string) => {
  if (tag.charAt(0) !== "#") return `#${tag}`
  else return tag
}

export const sortPosts = (posts: PopulatedPost[], byLikes?: boolean) => {
  return posts.sort((a, b) => {
    if (byLikes) {
      return b.likes - a.likes || Number(b.timestamp) - Number(a.timestamp)
    }
    return Number(b.timestamp) - Number(a.timestamp)
  })
}

export const sortComments = (comments: PopulatedComment[]) => {
  return comments.sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
}

export const isAuthor = (currentUser: string, author: string) => {
  return currentUser.toLowerCase() === author.toLowerCase()
}