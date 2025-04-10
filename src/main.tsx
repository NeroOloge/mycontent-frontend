import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import { config } from './wagmi.ts'

import './index.css'
import Profile from './pages/Profile.tsx'
import AuthorPosts from './pages/AuthorPosts.tsx'
import Explore from './pages/Explore.tsx'
import Post from './pages/Post.tsx'
import CreatePost from './pages/CreatePost.tsx'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/posts' element={<AuthorPosts />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/post/:cid' element={<Post />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
