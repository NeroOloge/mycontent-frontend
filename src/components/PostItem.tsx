import 'primeicons/primeicons.css';
import { useNavigate } from "react-router"
import moment from "moment"
import { PopulatedPost } from "../utils/types"
import { Pages } from '../utils/enums';
import Like from '../icons/Like';
import Comment from '../icons/Comment';
import Pencil from '../icons/Pencil';
import Trash from '../icons/Trash';
import { displayAddress } from '../utils/functions';
import useTagDisplayMap from '../hooks/useTagDisplayMap';

type Props = {
  post: PopulatedPost
}

function PostItem({ post }: Props) {
  const navigate = useNavigate()
  const tagDisplayMap = useTagDisplayMap()

  // const handleLike = () => {
  //   if (!account.isConnected) {
  //     navigate(Pages.CONNECT, 
  //       { state: { from: location.pathname } })
  //     return;
  //   }
  //   // like({
  //   //   ...wagmiContractConfig,
  //   //   functionName: 'like',
  //   //   args: [post.cid, post.author]
  //   // }, {
  //   //   onSuccess: () => {
  //   //     // notifySuccess('Successfully added like.')
  //   //   },
  //   //   onError: (error) => {
  //   //     console.error(error)
  //   //     // notifyError(error.message.split("\n")[0])
  //   //   }
  //   // })
  //   new QueryClient()
  //     .invalidateQueries({ queryKey: ['readContract'] });
  // }

  // const handleUnlike = () => {
  //   if (!account.isConnected) {
  //     navigate(Pages.CONNECT, 
  //       { state: { from: location.pathname } })
  //     return;
  //   }
  //   // unlike({
  //   //   ...wagmiContractConfig,
  //   //   functionName: 'unlike',
  //   //   args: [post.cid, post.author]
  //   // }, {
  //   //   onSuccess: () => {
  //   //     // notifySuccess('Successfully removed like.')
  //   //   },
  //   //   onError: (error) => {
  //   //     console.error(error)
  //   //     // notifyError(error.message.split("\n")[0])
  //   //   }
  //   // })
  //   new QueryClient()
  //     .invalidateQueries({ queryKey: ['readContract'] });
  // }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`${Pages.POST_DETAIL}/${e.currentTarget.dataset.id}`)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  // const isAuthor = (author: string) => {
  //   return account.address === author
  // }

  return (
    <div onClick={handleClick} key={`${post.id}`} data-id={`${post.id}`} className="cursor-pointer flex flex-col h-full min-h-[200px] px-3 py-2 rounded-lg bg-secondary">
      <h1 className="text-xl font-semibold mb-1 line-clamp-2">{post.title}</h1>
      <p className="text-secondary-foreground h-5 mb-1">{post.author ? displayAddress(post.author) : "Anonymous"}</p>
      <p className="text-sm line-clamp-2 mb-2 flex-grow-0">{post.preview}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto mb-1">
        {post.tags.map(tag => 
          <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
            {tagDisplayMap[tag] || tag}
          </span>)}
        </div>
      )}
      <div className="flex justify-between mt-auto items-end">
        <div className="space-y-2">
          <p className="text-xs text-secondary-foreground">{moment(new Date(Number(post.timestamp))).fromNow()}</p>
          <div className="flex space-x-2">
            <span className="text-secondary-foreground flex items-center space-x-2">
              <button className="cursor-pointer"><Like /></button> <span>{post.likes}</span>
            </span>
            <span className="text-secondary-foreground flex items-center space-x-2">
              <button className="cursor-pointer"><Comment /></button> <span>{post.comments}</span>
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button data-id={`${post.id}`} className="cursor-pointer" onClick={handleEdit}><Pencil /></button>
          <button data-id={`${post.id}`} className="cursor-pointer" onClick={handleDelete}><Trash /></button>
        </div>
      </div>
    </div>
  )
}

export default PostItem