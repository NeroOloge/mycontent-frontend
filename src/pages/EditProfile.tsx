import { useAccount, useEnsName } from "wagmi"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { IProfile } from "../utils/types"
import makeBlockie from "ethereum-blockies-base64"
import { useNavigate, useParams } from "react-router"
import { displayAddress } from "../utils/functions"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import Copy from "../icons/Copy"
import { execute, GetProfileDocument } from "../../.graphclient"
import { useWriteContract } from "wagmi"
import { wagmiContractConfig } from "../utils/contracts"
import { QueryClient } from "@tanstack/react-query"

function EditProfile() {
  const navigate = useNavigate()
  const account = useAccount()
  const params = useParams()
  const { addToast } = useToast()
  const [profile, setProfile] = useState<IProfile>()
  const [username, setUsername] = useState<string>("Anonymous")
  const [bio, setBio] = useState<string>("Enter bio")

  const { data: ensName } = useEnsName({
    address: params.authorAddress! as `0x${string}`,
    query: {
      enabled: !!params.authorAddress,
    }
  })

  const { writeContract: updateProfile } = useWriteContract()

  useEffect(() => {
    (async () => {
      try {
        const profileResult = await execute(GetProfileDocument, { id: params.authorAddress!.toLowerCase() })
        if (profileResult.data && profileResult.data.profile) {
          setProfile(profileResult.data.profile)
          setUsername(profileResult.data.profile.username)
          setBio(profileResult.data.profile.bio)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const handleCopy = () => {
    const author = params.authorAddress || "Anonymous"
    navigator.clipboard.writeText(author)
    addToast("Copied to clipboard", {
      type: ToastType.INFO, duration: 1000
    })
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(prev => {
      const newValue = e.target.value
      if (newValue.charAt(newValue.length - 1) === " ") return prev
      else if (newValue.length <= prev.length || newValue.length <= 20)
        return newValue
      return prev
    })
  }
  
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(prev => {
      const newValue = e.target.value
      return (newValue.length <= prev.length || newValue.length <= 150) 
        ? newValue 
        : prev
    })
  }

  const handleSaveProfile = () => {
    (async () => {
      updateProfile({
        ...wagmiContractConfig,
        functionName: 'updateProfile',
        args: [username, bio, "", BigInt(Date.now())]
      }, {
        onSuccess: () => {
          addToast("Successfully updated profile!", {
            duration: 3000, type: ToastType.SUCCESS
          })
          new QueryClient()
            .invalidateQueries({ queryKey: ['readContract'] })
          navigate(`${Pages.PROFILE}/${params.authorAddress!}`)
        }
      })
    })()
  }

  return (
    <>
      <Header />
      {account.isConnected && <main className="mt-16 flex flex-col items-center mx-auto px-4 space-y-8">
        <img src={profile?.imageCID || makeBlockie(params.authorAddress!)} className="image image-profile" />
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl">{ensName || profile?.username || "Anonymous"}</h1>
            <p className="flex justify-center space-x-1 items-center">
              <span>{displayAddress(params.authorAddress! as `0x${string}`)}</span>
              <span className='cursor-pointer' onClick={handleCopy}><Copy /></span>
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-2 flex flex-col">
              <label>Username</label>
              <input 
                onChange={handleUsernameChange}
                value={username}
                className="outline-none w-[70vw] bg-secondary px-2 py-3 rounded-xl" />
            </div>
            <div className="space-y-2 flex flex-col">
              <label>Bio</label>
              <div className="bg-secondary">
                <textarea 
                  value={bio}
                  onChange={handleBioChange}
                  className="outline-none h-[12vh] resize-none w-[70vw] px-2 py-3 rounded-xl"></textarea>
                <p className="text-sm text-left px-2 py-3">{bio?.length || 0}/150 characters</p>
              </div>
            </div>
          </div>
          <div className="text-right space-x-2">
            <button onClick={() => navigate(-1)} className="md:w-[25%] button button-gray">Cancel</button>
            <button onClick={handleSaveProfile} className="md:w-[25%] button">Save</button>
          </div>
        </div>
      </main>}
    </>
  )
}

export default EditProfile