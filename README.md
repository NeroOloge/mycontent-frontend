# MyContent — Decentralised Blogging Frontend

**MyContent** is a censorship-resistant blogging platform designed around **content ownership** and **verifiable publishing**. Drafts are managed off-chain for usability, while published posts are stored on IPFS and referenced on-chain, enabling durable and tamper-evident content.

## Live Demo

[https://mycontent-frontend.vercel.app](https://mycontent-frontend.vercel.app)

---

## Key Capabilities
### Publishing & Identity
- Rich text editor with embedded image support (Tiptap)
- Wallet connection (wagmi and Ethers.js)
- ENS resolution for author identity (name + address display)
### Content Storage Model
- Drafts stored off-chain (Firebase) for fast iteration and offline-friendly editing
- Published posts persisted to IPFS (Pinata / web3.storage) with on-chain references
- Indexed querying via The Graph for fast feed rendering and filtering
### Discovery & Feed
- Explore feed with lazy loading / incremental fetch
- Search by title and author
- Tag-based discovery and browsing
### Engagement
- Likes, comments, and bookmarks recorded on-chain
- User profile with tabs for:
  - Posts
  - Replies
  - Bookmarks
### Analytics (Current)
- Account-level engagement summary:
  - Total likes
  - Total replies
  - Total bookmarks

---

## Tech Stack

- **Frontend**: React + TypeScript
- **Editor**: Tiptap
- **Web3**: wagmi + Ethers.js
- Draft Management: Firebase (Firestore + Storage) with offline fallback
- **Media**: Cloudinary (draft image uploads)
- **Storage**: IPFS via Pinata / web3.storage
- **Indexing**: The Graph (post indexing and feed queries)

---

## Architecture Overview (High-Level)

- **Draft workflow**: off-chain for speed and usability
- **Publish workflow**: content → IPFS → on-chain reference
- **Read workflow**: The Graph indexes on-chain data → frontend queries indexed views
- **Engagement workflow**: like/comment/bookmark transactions on-chain, reflected via indexing

---

## Local Development

### 1. Clone the repo
```bash
git clone https://github.com/NeroOloge/mycontent-frontend
cd mycontent-frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Add environment variables
Create a .env.local file:
```env
VITE_WC_PROJECT_ID=your_wallet_connect_project_id
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_JWT=your_pinata_jwt
VITE_PINATA_GATEWAY_URL=your_pinata_gateway_url
VITE_CONTRACT_ADDRESS=0x316C9CD7feE43a1F6b93EEFe2b598Cf363d553C2

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```
### 4. Run the app
```bash
npm run dev
```

---

## Roadmap (Next Enhancements)

- Cursor-based pagination + deduplication for feed stability
- Full-text search (content-level search, fuzzy matching)
- Analytics upgrade: per-post metrics, view tracking, and time-window trends
- Trending tags / popular posts scoring with time-decay
- Notifications (off-chain) for replies and engagement

---

## 🤝 Contributing
Pull requests welcome! Feel free to fork the project and suggest improvements.