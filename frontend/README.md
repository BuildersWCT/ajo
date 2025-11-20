# Ajo PiggyBank Frontend

A modern, decentralized savings application built with **React**, **Vite**, **REOWN AppKit**, and **WalletConnect** on Base blockchain.

## 🚀 Features

- **REOWN AppKit Integration**: Seamless wallet connection with WalletConnect v2
- **Base Network Support**: Built for Base Sepolia testnet and Base mainnet
- **Time-Locked Savings**: Deposit ETH with enforced lock periods
- **Modern UI/UX**: Responsive design with glass-morphism effects
- **Real-time Updates**: Live balance and countdown timer
- **Type-Safe**: Built with TypeScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A REOWN Project ID ([Get one here](https://cloud.reown.com/))
- MetaMask or any WalletConnect-compatible wallet

## 🛠️ Installation

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. **Edit \`.env\` file:**
   \`\`\`env
   VITE_REOWN_PROJECT_ID=your_reown_project_id_here
   VITE_PIGGYBANK_ADDRESS=your_deployed_piggybank_contract_address_here
   \`\`\`

   **To get a REOWN Project ID:**
   - Visit [REOWN Cloud](https://cloud.reown.com/)
   - Create a new project
   - Copy your Project ID

   **🎯 Setting VITE_PIGGYBANK_ADDRESS:**

   **💻 Local Development:**
   - **Option A - Local Network:**
     1. Deploy contract to local Hardhat/Foundry network
     2. Copy address from deployment output
     3. \`VITE_PIGGYBANK_ADDRESS=0x1234567890123456789012345678901234567890\`

   - **Option B - Shared Testnet:**
     1. Get testnet address from your development team
     2. \`VITE_PIGGYBANK_ADDRESS=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd\`

   **🌐 Base Sepolia Testnet:**
   1. Deploy contract to Base Sepolia testnet
   2. Find address at [Base Sepolia Explorer](https://sepolia.basescan.org/)
   3. \`VITE_PIGGYBANK_ADDRESS=0x1234567890123456789012345678901234567890\`

   **🚀 Base Mainnet (Production):**
   1. Deploy contract to Base mainnet
   2. Verify on [BaseScan](https://basescan.org/)
   3. \`VITE_PIGGYBANK_ADDRESS=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd\`

   **⚠️  Critical Notes:**
   - Testnet and mainnet addresses are **NOT interchangeable**
   - Frontend fails to load with incorrect/missing address
   - Always match the address to your target network
   - Share testnet addresses within your team for consistent testing

## 🎯 Available Scripts

### Development
\`\`\`bash
npm run dev
\`\`\`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### Build
\`\`\`bash
npm run build
\`\`\`
Builds the app for production to the \`dist\` folder

### Preview
\`\`\`bash
npm run preview
\`\`\`
Preview the production build locally

### Lint
\`\`\`bash
npm run lint
\`\`\`
Check code for linting errors

## 🏗️ Project Structure

\`\`\`
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with wallet connect
│   │   ├── PiggyBankDashboard.tsx
│   │   ├── BalanceCard.tsx  # Balance display with countdown
│   │   ├── DepositForm.tsx  # Deposit ETH form
│   │   └── WithdrawButton.tsx
│   ├── config/              # Configuration files
│   │   ├── wagmi.ts         # REOWN AppKit & Wagmi setup
│   │   └── contracts.ts     # Smart contract ABIs & addresses
│   ├── hooks/               # Custom React hooks
│   │   ├── usePiggyBank.ts  # Contract interaction hook
│   │   └── useTimelock.ts   # Time lock countdown logic
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── App.css              # Component styles
│   └── index.css            # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example
\`\`\`

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **TypeScript** | Type safety |
| **REOWN AppKit** | Wallet connection & WalletConnect integration |
| **Wagmi** | Ethereum interactions |
| **Viem** | Lightweight Ethereum library |
| **TanStack Query** | Async state management |
| **Base Network** | Layer 2 blockchain |

## 🌐 REOWN & WalletConnect Integration

This project uses **REOWN AppKit** (formerly WalletConnect AppKit) for all wallet interactions.

**Built with ❤️ using REOWN AppKit & WalletConnect on Base**
