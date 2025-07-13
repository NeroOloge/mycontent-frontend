# MyContent — Decentralised Blogging Frontend

**MyContent** is a censorship-resistant, Web3 blogging platform that lets writers own their content. Drafts can be saved off-chain, while published posts are stored permanently on IPFS with content references recorded on-chain.

## 🚀 Live Demo

👉 [https://mycontent-frontend.vercel.app](https://mycontent-frontend.vercel.app)

---

## ✨ Features

- ✍️ Rich text editor with embedded image support (via Tiptap)
- 🔐 Wallet connection (via wagmi and Ethers.js)
- 💾 Draft syncing via Firebase (with offline fallback)
- 📝 On-chain post creation with IPFS storage
- 💬 Comments, Likes, Bookmarks (all on-chain)
- 🧾 ENS-based identity support
- 🔍 Explore and search by tags, titles, and authors
- 📄 Editable user profiles (on-chain)
- 🔄 Fully indexed via The Graph

---

## 🛠️ Stack

- **React + TypeScript**
- **Tiptap** for rich text editing
- **wagmi + Ethers.js** for blockchain interaction
- **Firebase (Firestore + Storage)** for draft management
- **Cloudinary** for draft image uploads
- **IPFS** (via web3.storage and Pinata)
- **The Graph** for post indexing and filtering

---

## 🔧 Setup

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

## 🤝 Contributing
Pull requests welcome! Feel free to fork the project and suggest improvements.