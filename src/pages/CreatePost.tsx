import { useAccount } from "wagmi"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import ImageResize from "tiptap-extension-resize-image"
import Header from "../components/Header"
import { useToast } from "../providers/ToastProvider"
import { ToastType } from "../utils/enums"
import Image from "../icons/Image"
import Checkbox from "../components/Checkbox"
import { useState } from "react"
import { db } from "../utils/db"

interface Tags {
  [tag: string]: boolean;
}

function CreatePost() {
  const account = useAccount()
  const { addToast } = useToast()
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<Tags>({})
  
  const editor = useEditor({
    extensions: [
      StarterKit, 
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      ImageResize
    ],
    content: "",
  })

  const formatTags = () => {
    const formattedTags: string[] = []
    Object.keys(tags).forEach(tag => {
      if (tags[tag]) formattedTags.push(tag)
    })
    return formattedTags
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return;

    if (account.isConnected) {
      // Upload to cloudinary
      // editor.chain().focus().setImage({ src: imageUrl }).run();
    } else {
      const reader = new FileReader()
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
    const content = editor.getHTML()
    const matches = Array.from(content.matchAll(base64Regex))
    const div = document.createElement('div');
    div.innerHTML = content;
    const preview = div.querySelector('p')?.textContent || ''
    const draft = {
      title,
      content,
      preview,
      author: account.address,
      images: matches.map(match => match[1]),
      tags: formatTags(),
      timestamp: `${Date.now()}`
    }
    if (account.isConnected) {
      // Save to firestore
    } else {
      const id = await db.drafts.add(draft)
      console.log(id)
      addToast("Draft saved locally! Connect wallet to save to DB!", {
        duration: 3000, type: ToastType.SUCCESS
      })
      setTimeout(() => window.location.reload(), 3000)
    }
  }

  const handlePublish = () => {
    if (!account.isConnected) {
      addToast("Connect wallet to publish your post!", {
        duration: 3000, type: ToastType.INFO
      })
      return;
    }
    // const 
  }

  return (
    <>
      <Header />
      <main className="mt-16 mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-semibold">Create Post</h1>
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
            <div className="flex flex-col items-end space-y-1 md:space-y-0 md:flex-row md:space-x-2">
              <Checkbox setTags={setTags} label="#blockchain" />
              <Checkbox setTags={setTags} label="#web3" />
              <Checkbox setTags={setTags} label="#decentralised" />
              <Checkbox setTags={setTags} label="..." more={true} />
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

export default CreatePost