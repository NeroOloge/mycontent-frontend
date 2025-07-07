import Header from "../components/Header"

function Explore() {
  return (
    <>
      <Header />
      <main className="mt-16 mx-auto px-2 space-y-6 md:space-y-0 grid 
        md:grid-cols-3 grid-cols-1">
        <aside className="space-y-6">
          <section>
            <h2>Trending Tags</h2>
            <div>Tags</div>
          </section>
          <section>
            <h2>Top Authors</h2>
            <div>Authors</div>
          </section>
        </aside>
        <section className="col-span-2">Posts</section>
      </main>
    </>
  )
}

export default Explore