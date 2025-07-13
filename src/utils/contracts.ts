export const wagmiContractConfig = {
  address: `${import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`}`,
  abi: [
    {
      type: 'function',
      name: 'createPost',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'cid', type: 'string' }, 
        { name: 'tags', type: 'string[]' },
        { name: 'imageCIDs', type: 'string[]' },
        { name: 'title', type: 'string' },
        { name: 'timestamp', type: 'uint256' }
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deletePost',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postId', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'like',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postId', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'unlike',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postId', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'bookmark',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postId', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'unbookmark',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postId', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addComment',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'postId', type: 'uint256' }, 
        { name: 'cid', type: 'string' },
        { name: 'timestamp', type: 'uint256' }
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deleteComment',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'commentId', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'follow',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'userToFollow', type: 'address' }, { name: 'timestamp', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'unfollow',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'userToUnfollow', type: 'address' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'updateProfile',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'username', type: 'string' }, 
        { name: 'bio', type: 'string' },
        { name: 'imageCID', type: 'string' },
        { name: 'timestamp', type: 'uint256' }
      ],
      outputs: [],
    }
  ]
} as const