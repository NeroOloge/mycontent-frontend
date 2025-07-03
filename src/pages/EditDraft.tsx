import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image"
import ImageResize from "tiptap-extension-resize-image"
import Header from "../components/Header"
import Image from "../icons/Image"
import { useNavigate, useParams } from "react-router";
import { useAccount, useWriteContract } from "wagmi";
import useDraft from "../hooks/useDraft";
import { useToast } from "../providers/ToastProvider";
import { Pages, ToastType } from "../utils/enums";
import { appendHash, formatTags, getPreview, unformatTags } from "../utils/functions";
import { TagDisplayMap, Tags } from "../utils/types";
import Checkbox from "../components/Checkbox";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { convertToURL, uploadDraftImage, uploadPost } from "../utils/pinata";
import { db } from "../utils/db";
import { QueryClient } from "@tanstack/react-query";
import { wagmiContractConfig } from "../utils/contracts";
import useTagDisplayMap from "../hooks/useTagDisplayMap";

function EditDraft() {
  const params = useParams()
  const navigate = useNavigate()
  const account = useAccount()
  const { draft, isLoading } = useDraft(params.draftId!)
  const { addToast } = useToast()
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<Tags>({})
  const [addNewTag, setAddNewTag] = useState(false)
  const [inputTag, setInputTag] = useState('')
  const [initialLoad, setInitialLoad] = useState(true)
  const [tagDisplayMap, setTagDisplayMap] = useState<TagDisplayMap>({})
  const initialTagDisplayMap = useTagDisplayMap()

  const { writeContract: createPost } = useWriteContract()

  const editor = useEditor({
    extensions: [
      StarterKit, 
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      ImageResize
    ],
    content: draft?.content || "",
  })

  useEffect(() => {
    if (isLoading) return;
    if (draft === undefined) {
      addToast("Draft does not exist", {
        type: ToastType.ERROR,
        duration: 3000
      })
      navigate(`${Pages.DRAFTS}`)
      return;
    }
    if (initialLoad) {
      setTitle(draft.title)
      editor?.commands?.insertContent(draft.content)
      setTags(unformatTags(draft.tags))
      setInitialLoad(false)
      setTagDisplayMap(prev => ({ ...prev, ...initialTagDisplayMap }))
    }
  }, [draft, initialLoad])

  
  const handleKeyDown = (e: any) => {
    if ((e.key === 'Enter' || e.key === ',') && inputTag.trim()) {
      e.preventDefault();
      const newTag = inputTag.trim();
      if (!tagDisplayMap[newTag.toLowerCase()]) {
        setTags((prev) => ({ ...prev, [`${appendHash(newTag.toLowerCase())}`]: true }))
        setTagDisplayMap((prev) => ({ ...prev, [`${appendHash(newTag.toLowerCase())}`]: `${appendHash(newTag)}` }))
      }
      setInputTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => ({ ...prev, [tag]: false }))
  }

  const saveTagDisplayMap = async () => {
    if (account.isConnected) {
      const docSnap = await getDoc(doc(firestore, "tagDisplayMap", account.address!))
      if (!docSnap.exists()) {
        await setDoc(doc(firestore, "tagDisplayMap", `${account.address}`), 
          tagDisplayMap)
      } else {
        await setDoc(doc(firestore, "tagDisplayMap", `${account.address}`), 
          { ...tagDisplayMap, ...docSnap.data() })
      }
    } else {
      const tagDoc = localStorage.getItem("tagDisplayMap")
      if (!tagDoc)
        localStorage.setItem("tagDisplayMap", JSON.stringify(tagDisplayMap))
      else {
        localStorage.setItem("tagDisplayMap", 
            JSON.stringify({ ...tagDisplayMap, ...JSON.parse(tagDoc) }))
      }
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return;

    if (account.isConnected) {
      // Upload to cloudinary
      const imageUpload = await uploadDraftImage(file.name, file)
      if (imageUpload) {
        const imageUrl = await convertToURL(imageUpload.cid)
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } else {
      const base64: string = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file)
      });
      editor.chain()
      .focus()
      .setImage({ src: base64 })
      .run();
      // editor.commands.insertContent(`<img src="${URL.createObjectURL(file)}" alt="uploaded" />`);
    }
  }

  const handleSaveDraft = async () => {
    if (!editor) return;
    const base64Regex = /src="(data:image\/[^;]+;base64[^"]+)"/g;
    const urlRegex = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/g
    const content = editor.getHTML()
    const preview = getPreview(content)
    const draftObj = {
      title,
      content,
      preview,
      author: account.address,
      tags: formatTags(tags),
      timestamp: `${Date.now()}`
    }
    if (account.isConnected) {
      const matches = Array.from(content.matchAll(urlRegex))
      
      await setDoc(doc(firestore, "drafts", `${params.draftId!}`), {
        ...draftObj,
        images: matches.map(match => match[1]),
      })
      addToast("Draft saved to DB.", {
        duration: 3000, type: ToastType.SUCCESS
      })
    } else {
      const matches = Array.from(content.matchAll(base64Regex))
      db.drafts.update(Number(params.draftId!), 
        { ...draftObj, images: matches.map(match => match[1]) })
      addToast("Draft saved locally! Connect wallet to save to DB!", {
        duration: 3000, type: ToastType.SUCCESS
      })
    }
    await saveTagDisplayMap()
    setTimeout(() => navigate(`${Pages.DRAFT_DETAIL}/${params.draftId!}`), 3000)
  }

  const handlePublish = () => {
    if (!account.isConnected) {
      addToast("Connect wallet to publish your post!", {
        duration: 3000, type: ToastType.INFO
      })
      return;
    }
    (async () => {
      if (!editor) return;
      const urlRegex = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/g
      const content = editor.getHTML()
      const preview = getPreview(content)
      const matches = Array.from(content.matchAll(urlRegex))
      const entity = {
        title,
        content,
        preview,
        author: account.address!,
        timestamp: Date.now(),
        // likes: 0,
        comments: 0,
        // bookmarks: 0,
        imageCIDs: matches.map(match => match[1]),
        tags: formatTags(tags),
        isDeleted: false,
        exists: true
      }
      const fileName = account.address + " " + entity.timestamp
      const data = await uploadPost(entity, fileName)
      
      createPost({
        ...wagmiContractConfig,
        functionName: 'createPost',
        args: [data.cid, entity.tags, entity.imageCIDs, entity.title]
      }, {
        onSuccess: (data) => {
          addToast("Successfully published post!", {
            duration: 3000, type: ToastType.SUCCESS
          })
          console.log("createPost data: ", data)
          new QueryClient()
            .invalidateQueries({ queryKey: ['readContract'] });
          (async () => {
            await saveTagDisplayMap()
            await deleteDoc(doc(firestore, "drafts", `${params.draftId!}`))
            navigate(Pages.DASHBOARD)
          })()
        },
        onError: (error) => {
          console.error(error)
          addToast(error.message, {
            duration: 3000, type: ToastType.ERROR
          })
        }
      })
    })()
  }

  return (
    <>
      <Header />
      <main className="mt-16 mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-semibold">Edit Draft</h1>
        <div className="space-y-4">
          <div className="space-y-2 flex flex-col">
            <label className="text-primary-foreground/70">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full font-semibold rounded-lg p-2 outline-none bg-secondary" />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-primary-foreground/70">Write your post...</label>
            <EditorContent className="bg-secondary w-full rounded-lg p-2 outline-none resize-none h-[30vh]" editor={editor} />
            {/* <textarea className="bg-secondary w-full rounded-lg p-2 outline-none resize-none h-[30vh]"></textarea> */}
          </div>
          <div className="flex justify-between">
            <div>
              <button onClick={() => document.getElementById("image-upload")?.click()} className="button button-gray text-white/90 flex space-x-2 items-center">
                <Image />
                <span>Add Image</span>
              </button>
              <input type="file" hidden id="image-upload" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className="flex flex-col items-end md:items-center space-y-1 md:space-y-0 md:flex-row md:space-x-2">
            {formatTags(tags)
                .map(tag => <Checkbox key={tag} removeTag={removeTag} 
                  label={tagDisplayMap[tag] || tag} isChecked={tags[tag]} />)}
              <Checkbox removeTag={removeTag} 
                setAddNewTag={setAddNewTag} label="..." more={true} />
              {addNewTag && <input
                type="text"
                className="text-sm px-4 py-2 placeholder:overflow-visible
                  rounded-3xl outline-none bg-transparent"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type tag and press Enter"
              />}
              
            </div>
          </div>
          <div className="text-right space-x-2">
            <button onClick={handleSaveDraft} className="md:w-[25%] button button-gray">Save Draft</button>
            <button onClick={handlePublish} className="md:w-[25%] button" title={account.isConnected ? "" : "Connect wallet to publish your post!"}>Publish</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default EditDraft