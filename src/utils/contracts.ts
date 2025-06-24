export const wagmiContractConfigOld = {
  address: `${import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`}`,
  abi: [
    {
      type: 'function',
      name: 'getAuthors',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'authors', type: 'address[]' }],
    },
    {
      type: 'function',
      name: 'getPostsByAuthor',
      stateMutability: 'view',
      inputs: [{ name: 'author', type: 'address' }],
      outputs: [{
        "components": [
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Blogging.Post[]",
        "name": "",
        "type": "tuple[]"
      }],
    },
    {
      type: 'function',
      name: 'paginatePosts',
      stateMutability: 'view',
      inputs: [
        { name: 'page', type: 'uint256' },
        { name: 'limit', type: 'uint256' },
        { name: 'author', type: 'address' },
      ],
      outputs: [{
        "components": [
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Blogging.Post[]",
        "name": "",
        "type": "tuple[]"
      }],
    },
    {
      type: 'function',
      name: 'getCommentsByUser',
      stateMutability: 'view',
      inputs: [{ name: 'user', type: 'address' }],
      outputs: [{
        "components": [
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "postCid",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "commenter",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Blogging.Comment[]",
        "name": "",
        "type": "tuple[]"
      }],
    },
    {
      type: 'function',
      name: 'getCommentsByPost',
      stateMutability: 'view',
      inputs: [{ name: 'postCid', type: 'string' }],
      outputs: [{
        "components": [
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "postCid",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "commenter",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Blogging.Comment[]",
        "name": "",
        "type": "tuple[]"
      }],
    },
    {
      type: 'function',
      name: 'getCommentsNumberByPost',
      stateMutability: 'view',
      inputs: [{ name: 'postCid', type: 'string' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'getLikesNumberByPost',
      stateMutability: 'view',
      inputs: [{ name: 'postCid', type: 'string' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'getLikesByUser',
      stateMutability: 'view',
      inputs: [{ name: 'user', type: 'address' }],
      outputs: [{ type: 'string[]' }],
    },
    {
      type: 'function',
      name: 'tipAuthor',
      stateMutability: 'payable',
      inputs: [{ name: 'postCid', type: 'string' }, { name: 'author', type: 'address' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addPost',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'cid', type: 'string' }, { name: 'timestamp', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'editPost',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'cid', type: 'string' }, 
        { name: 'timestamp', type: 'uint256' },
        { name: 'author', type: 'address' }
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deletePost',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'cid', type: 'string' }, { name: 'author', type: 'address' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addComment',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'postCid', type: 'string' }, 
        { name: 'cid', type: 'string' }, 
        { name: 'author', type: 'address' },
        { name: 'timestamp', type: 'uint256' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deleteComment',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'postCid', type: 'string' }, 
        { name: 'cid', type: 'string' }, 
        { name: 'author', type: 'address' },
        { name: 'commenter', type: 'address' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'like',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postCid', type: 'string' }, { name: 'author', type: 'address' }],
      outputs: [],
    },
    {
      type: 'function',
      name: 'unlike',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'postCid', type: 'string' }, { name: 'author', type: 'address' },],
      outputs: [],
    }
  ],
} as const

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
        { name: 'imageCIDs', type: 'string[]' }
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
  ]
} as const