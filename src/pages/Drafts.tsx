import Header from "../components/Header"
import useDraft from "../hooks/useDraft"
import Pencil from "../icons/Pencil"
import Trash from "../icons/Trash"

function Drafts() {
  const drafts = useDraft()

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // TODO: navigate to edit draft page
  }
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // TODO: delete draft
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // TODO: navigate to draft detail page
    console.log(e.currentTarget.id)
  }

  return (
    <>
      <Header />
      <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Drafts</h1>
          {drafts.length === 0 && 
            <div className="text-lg md:text-base text-secondary-foreground">No drafts found</div>}
          <div className="md:grid md:grid-cols-3 md:gap-3 space-y-3 md:space-y-0">
            {drafts.map(draft => (
              <div onClick={handleClick} id={`${draft.id}`} key={draft.id} className="cursor-pointer flex flex-col h-full px-3 py-2 rounded-lg bg-secondary">
                <h1 className="text-xl font-semibold mb-1 line-clamp-2">{draft.title}</h1>
                <p className="text-secondary-foreground h-5 mb-1">{draft.author || "Jane Doe"}</p>
                <p className="text-sm line-clamp-2 mb-2 flex-grow-0">{draft.preview}</p>
                {/* <RenderHTML content={draft.content} /> */}
                {draft.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto mb-1">
                    {draft.tags.map(tag => 
                      <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
                        {tag}
                      </span>)}
                  </div>
                )}
                <div className="flex justify-between">
                  <p className="text-xs text-secondary-foreground mt-auto">{new Date(Number(draft.timestamp)).toDateString()}</p>
                  <div className="flex space-x-2">
                    <button className="cursor-pointer" onClick={handleEdit}><Pencil /></button>
                    <button className="cursor-pointer" onClick={handleDelete}><Trash /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Drafts