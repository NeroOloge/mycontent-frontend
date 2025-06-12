import Header from "../components/Header"

function Dashboard() {
  return (
    <>
      <Header />
      <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">My Posts</h1>
          <div className="text-lg md:text-base text-secondary-foreground">No posts found</div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Drafts</h1>
          <div className="text-lg md:text-base text-secondary-foreground">No drafts found</div>
        </div>
      </main>
    </>
  )
}

export default Dashboard