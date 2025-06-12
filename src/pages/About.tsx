import Blocks from "../icons/Blocks"
import Header from "../components/Header"
import MoveRight from "../icons/MoveRight"
import Box from "../icons/Box"
import Wallet from "../icons/Wallet"
import EmptyPersonImage from "../icons/EmptyPersonImage"

function About() {
  return (
    <>
      <Header />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold">Welcome To MyContent</h1>
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">About the Platform</h2>
          <p className="md:w-[75%] text-secondary-foreground md:text-sm">MyContent is a decentralised blogging platform that leverages
            an Ethereum smart contract for stores content on IPFS, enabling
            censorship-resistant and immutable content sharing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">How it Works</h2>
          <div className="flex space-x-2 items-center">
            <div>
              <Blocks label="Blockchain" />
            </div>
            <div>
              <MoveRight /> 
            </div>
            <div>
              <Box label="IPFS" />
            </div>
            <div>
              <MoveRight />
            </div>
            <div>
              <Wallet label="Wallet" />
            </div>
          </div>
          <button className="button button-dark">
            <a href="https://github.com/NeroOloge/mycontent-frontend">View on GitHub</a>
          </button>
        </section>
        <hr className="text-secondary" />
        <section className="space-y-4">
          <h2 className="text-2xl">Meet the Creator</h2>
          <div className="flex md:flex-row md:space-x-3 space-y-2 flex-col">
            {/* <img className="image" src="https://www.yarddiant.com/images/what-do-most-web-developers-use.jpg" /> */}
            <EmptyPersonImage classList="image" />
            <p className="md:w-[75%] text-secondary-foreground md:text-sm">
              I'm Nero, an Information Technology graduate from Middlesex 
              University with a passion for developing blockchain applications.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default About