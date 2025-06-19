import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import { config } from './wagmi.ts'

import './index.css'

import Dashboard from './pages/Dashboard.tsx'
import AuthorPosts from './pages/AuthorPosts.tsx'
import Explore from './pages/Explore.tsx'
import Post from './pages/Post.tsx'
import CreatePost from './pages/CreatePost.tsx'
import About from './pages/About.tsx'
import Profile from './pages/Profile.tsx'
import Connect from './components/Connect.tsx'
import { ToastProvider } from './providers/ToastProvider.tsx'

import { Pages } from "./utils/enums"
import EditProfile from './pages/EditProfile.tsx'
import Drafts from './pages/Drafts.tsx'
import Draft from './pages/Draft.tsx'
import EditDraft from './pages/EditDraft.tsx'

(globalThis as any).Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path={Pages.ABOUT} element={<About />} />
              <Route path={Pages.CONNECT} element={<Connect />} />
              <Route path={Pages.DASHBOARD} element={<Dashboard />} />
              <Route path={Pages.POSTS} element={<AuthorPosts />} />
              <Route path={Pages.EXPLORE} element={<Explore />} />
              <Route path={Pages.CREATE_POST} element={<CreatePost />} />
              <Route path={Pages.DRAFTS} element={<Drafts />} />
              <Route path={Pages.EDIT_PROFILE} element={<EditProfile />} />
              <Route path={Pages.PROFILE+"/:authorAddress"} element={<Profile />} />
              <Route path={Pages.EDIT_DRAFT+"/:draftId"} element={<EditDraft />} />
              <Route path={Pages.DRAFT_DETAIL+"/:draftId"} element={<Draft />} />
              <Route path={Pages.POST_DETAIL+"/:cid"} element={<Post />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
