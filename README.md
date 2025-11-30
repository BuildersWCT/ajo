# Ajo PiggyBank – Decentralized Savings dApp

Ajo PiggyBank is a decentralized savings application that allows users to deposit ETH into an on-chain piggy bank, lock it for a defined period, and withdraw only after the lock has expired. This repository currently hosts the **React + Vite** frontend, which is designed to connect to a `PiggyBank` smart contract (typically maintained in a separate Foundry repository) deployed on the Base network.

---

## Overview

The Ajo PiggyBank dApp is built to encourage disciplined savings by enforcing time-locked deposits on-chain.

Key capabilities:

- Connect an Ethereum wallet using **REOWN AppKit** with **WalletConnect v2**.
- Deposit ETH into a personal piggy bank contract.
- Configure time-locked savings with enforced lock periods.
- View real-time balance, lock status, and countdown timer.
- Withdraw funds only after the configured unlock time has passed.

> **Scope of this repository:** only the frontend lives here (in `frontend/`). The `PiggyBank` smart contract itself should be managed in a dedicated Solidity/Foundry repository and deployed separately to Base testnet or mainnet.

---

## Tech Stack

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| Frontend           | React 19, Vite 7, TypeScript      |
| State / Data       | TanStack Query                    |
| Wallet Integration | REOWN AppKit, WalletConnect v2    |
| Ethereum Toolkit   | Wagmi, Viem                       |
| Blockchain Network | Base (Testnet / Mainnet ready)    |
| Smart Contracts    | Solidity (via Foundry – external) |
| Tooling & Quality  | ESLint, TypeScript, Prettier      |

---

## Project Structure

```text
.
├── frontend/                # React + Vite dApp (UI and wallet integration)
└── README.md                # Project-level documentation (this file)
```

- Frontend details (components, hooks, config, scripts) are documented in `frontend/README.md`.
- The `PiggyBank` smart contract code is expected to live in a **separate** Solidity/Foundry repository (for example, `piggybank-contracts`) and is **not** part of this repo.

### Quickstart (Frontend + Contracts)

Use this if you want to run both the contracts (in your own Foundry repo) and the frontend locally:

1. Contracts (in your contracts repo):

   ```bash
   forge install
   forge build
   forge test -vvv
   # deploy and copy the deployed PiggyBank address
   ```

2. Frontend (in this repo):

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # set VITE_REOWN_PROJECT_ID and VITE_PIGGYBANK_ADDRESS
   npm run dev
   ```

**🔧 For Complete Local Development Setup:**  
See the comprehensive [Local Development Setup Guide in CONTRACTS.md](./CONTRACTS.md#-local-development-setup) for detailed step-by-step instructions on:

- Setting up local blockchain with Anvil
- Deploying contracts locally
- Configuring frontend for local testing
- Environment switching between local/testnet/mainnet
- Troubleshooting common issues

Additional details on the expected contract interface live in [CONTRACTS.md](./CONTRACTS.md). UX copy and demo scripts are in [docs/](./docs/).

Add a link here to your contracts repository once it is available, for example:

```text
Contracts repository: https://github.com/<org-or-user>/piggybank-contracts
```

---

## Frontend – Getting Started

### Prerequisites

- Node.js **v18+**
- npm (or another Node.js package manager)
- A REOWN Project ID (from [https://cloud.reown.com/](https://cloud.reown.com/))
- A WalletConnect-compatible Ethereum wallet (e.g. MetaMask)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Copy the example file and set the required values:

```bash
cd frontend
cp .env.example .env
```

Edit `.env` and provide your configuration:

```env
VITE_REOWN_PROJECT_ID=your_reown_project_id_here
VITE_PIGGYBANK_ADDRESS=your_deployed_piggybank_contract_address_here
```

**Required Configuration:**

- `VITE_REOWN_PROJECT_ID` – Project ID from [REOWN Cloud](https://cloud.reown.com/)
- `VITE_PIGGYBANK_ADDRESS` – Address of your deployed `PiggyBank` smart contract

**🌐 Setting VITE_PIGGYBANK_ADDRESS by Environment:**

**For Local Development:**

1. **Local Network (Hardhat/Foundry/Anvil):**

   ```bash
   # Deploy your contract to local network
   forge create PiggyBank --rpc-url http://localhost:8545
   # Copy the deployed address from output
   VITE_PIGGYBANK_ADDRESS=0x1234567890123456789012345678901234567890
   ```

2. **Using Existing Testnet Contract:**
   ```bash
   # Use a shared testnet contract from your team
   VITE_PIGGYBANK_ADDRESS=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
   ```

**For Base Sepolia Testnet:**

1. Deploy your PiggyBank contract to Base Sepolia:
   ```bash
   # Deploy to Base Sepolia testnet
   forge create PiggyBank --rpc-url $BASE_SEPOLIA_RPC --private-key $PRIVATE_KEY
   ```
2. Find your contract address:
   - Check deployment script output
   - Visit [Base Sepolia Explorer](https://sepolia.basescan.org/)
   - Search by transaction hash
3. Set the address:
   ```bash
   VITE_PIGGYBANK_ADDRESS=0x1234567890123456789012345678901234567890
   ```

**For Base Mainnet (Production):**

1. Deploy your PiggyBank contract to Base mainnet
2. Verify the contract on [BaseScan](https://basescan.org/)
3. Set the verified mainnet address:
   ```bash
   VITE_PIGGYBANK_ADDRESS=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
   ```

**🔗 Finding Contract Addresses:**

- **Base Sepolia:** [https://sepolia.basescan.org/](https://sepolia.basescan.org/)
- **Base Mainnet:** [https://basescan.org/](https://basescan.org/)
- **Local:** Check your deployment script terminal output

**⚠️ Important Notes:**

- Testnet and mainnet addresses are **completely different** and NOT interchangeable
- The frontend will fail to load if this address is incorrect or missing
- Always use the correct address for your target network
- Contract verification on blockchain explorers is recommended for transparency
- Share testnet addresses with your development team for consistent testing

### 3. Run the Development Server

```bash
cd frontend
npm run dev
```

By default, Vite serves the application at `http://localhost:3000` (or another available port as indicated in the terminal).

### 4. Build, Preview, and Lint

From the `frontend/` directory:

- Build for production:

  ```bash
  npm run build
  ```

- Preview the built app locally:

  ```bash
  npm run preview
  ```

- Lint the codebase:

  ```bash
  npm run lint
  ```

- Type-check the project:

  ```bash
  npm run type-check
  ```

---

## 🔧 Contract Configuration Guide

**Step-by-step guide to configure the frontend with a PiggyBank contract address for testing.**

This section provides focused instructions for setting up the `VITE_PIGGYBANK_ADDRESS` environment variable to connect your frontend to the correct contract on the right network.

### ⚡ Quick Setup (3 Options)

#### 🏠 Option A: Local Development (Fastest)

**Use this for local testing with Anvil/Hardhat blockchain:**

1. **Run the automated setup:**

   ```bash
   cd frontend
   ./scripts/switch-env.sh local
   ```

2. **Start the local blockchain:**

   ```bash
   anvil
   ```

3. **Deploy contract (if not already deployed):**

   ```bash
   forge create PiggyBank --rpc-url http://localhost:8545 --constructor-args 3600
   ```

4. **Update contract address in `.env` if needed:**

   ```env
   VITE_PIGGYBANK_ADDRESS=0x_your_deployed_local_contract_address
   ```

5. **Start frontend:**
   ```bash
   npm run dev
   ```

**✅ Result:** Frontend running at `http://localhost:3000` with local contract!

---

#### 🧪 Option B: Base Sepolia Testnet

**Use this for testing with Base Sepolia testnet:**

1. **Deploy your contract to testnet:**

   ```bash
   export RPC_URL="https://sepolia.base.org"
   export PRIVATE_KEY="your_private_key_here"
   forge create PiggyBank --rpc-url $RPC_URL --private-key $PRIVATE_KEY --constructor-args 3600
   ```

2. **Copy the deployed contract address** from the deployment output.

3. **Configure environment:**

   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env and set:
   VITE_PIGGYBANK_ADDRESS=0x_your_testnet_contract_address_here
   ```

4. **Start frontend:**
   ```bash
   npm run dev
   ```

**🔗 Find your contract:**

- **Base Sepolia Explorer:** [https://sepolia.basescan.org/](https://sepolia.basescan.org/)
- Search by transaction hash or address

**✅ Result:** Frontend connected to Base Sepolia testnet!

---

#### 🚀 Option C: Base Mainnet (Production)

**Use this for production with real ETH on Base mainnet:**

1. **Deploy your contract to mainnet:**

   ```bash
   export RPC_URL="https://mainnet.base.org"
   export PRIVATE_KEY="your_mainnet_private_key"
   forge create PiggyBank --rpc-url $RPC_URL --private-key $PRIVATE_KEY --constructor-args 31536000
   ```

2. **Copy the deployed contract address.**

3. **Configure environment:**

   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env and set:
   VITE_PIGGYBANK_ADDRESS=0x_your_mainnet_contract_address_here
   ```

4. **Start frontend:**
   ```bash
   npm run dev
   ```

**⚠️ Warning:** This uses real ETH on Base mainnet!

**🔗 Find your contract:**

- **BaseScan:** [https://basescan.org/](https://basescan.org/)

**✅ Result:** Frontend connected to Base mainnet!

---

### 🔄 Quick Environment Switching

**Switch between networks instantly:**

```bash
cd frontend

# Switch to local development
./scripts/switch-env.sh local

# Switch to Base Sepolia testnet
./scripts/switch-env.sh sepolia

# Switch to Base mainnet
./scripts/switch-env.sh mainnet
```

**Windows users:**

```powershell
.\scripts\switch-env.ps1 -Environment local
.\scripts\switch-env.ps1 -Environment sepolia
.\scripts\switch-env.ps1 -Environment mainnet
```

---

### 📋 Manual Configuration Steps

If you prefer to configure manually:

1. **Edit the `.env` file:**

   ```bash
   cd frontend
   cp .env.example .env
   nano .env  # or use your preferred editor
   ```

2. **Set the required variables:**

   ```env
   VITE_REOWN_PROJECT_ID=your_project_id_from_cloud_reown
   VITE_PIGGYBANK_ADDRESS=0x_your_contract_address_here
   ```

3. **Verify your setup:**
   - Network: Ensure you're connected to the correct network in MetaMask
   - Contract: Verify the address matches your deployed contract
   - Frontend: Check that the app loads without errors

---

### 🎯 Contract Address Sources

| Network          | How to Get Contract Address                            |
| ---------------- | ------------------------------------------------------ |
| **Local**        | Check deployment script output or use Anvil's default  |
| **Base Sepolia** | [Base Sepolia Explorer](https://sepolia.basescan.org/) |
| **Base Mainnet** | [BaseScan](https://basescan.org/)                      |

---

### ⚠️ Important Notes

- **Network-specific:** Contract addresses are network-specific and not interchangeable
- **Required for functionality:** `VITE_PIGGYBANK_ADDRESS` must be set correctly
- **Frontend will fail to load** if this address is incorrect or missing
- **Testnet vs Mainnet:** Never use testnet addresses on mainnet or vice versa

---

### 🆘 Troubleshooting

**Common issues:**

- **"Contract not deployed" error:** Check contract address and network
- **"Function not found" error:** Verify ABI matches deployed contract
- **Transaction fails:** Check account balance and network connection

**For detailed troubleshooting:** See [CONTRACTS.md](./CONTRACTS.md#troubleshooting-local-development)

---

### 🔗 Next Steps

After configuring the contract address:

1. **Start the development server:** `npm run dev`
2. **Connect your wallet** to the appropriate network
3. **Test the functionality** with deposits and withdrawals
4. **Verify contract interactions** work as expected

**For complete local development setup:** See [CONTRACTS.md#-local-development-setup](./CONTRACTS.md#-local-development-setup)

---

## Smart Contract (Conceptual Overview)

The actual `PiggyBank` implementation should live in your contracts repository (for example, a Foundry project) and be deployed to Base Sepolia or Base mainnet. The frontend in this repo only **consumes** that contract via its address and ABI.

A typical `PiggyBank` contract used with this dApp exposes the following behaviour:

- Stores the owner address.
- Stores a timestamp representing when funds can be withdrawn.
- Accepts ETH deposits while locked.
- Allows the owner to withdraw only after the unlock time.

An illustrative example contract might look as follows (for reference only):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PiggyBank {
    address public owner;
    uint256 public unlockTime;

    constructor(uint256 _unlockTime) payable {
        owner = msg.sender;
        unlockTime = _unlockTime;
    }

    function deposit() external payable {}

    function withdraw() external {
        require(block.timestamp >= unlockTime, "PiggyBank: Locked");
        require(msg.sender == owner, "PiggyBank: Not owner");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

The canonical source of truth for the contract (files, tests, deployment scripts) should be your contracts repository. Use this section to link to it and briefly describe how the frontend and contracts are wired together (e.g. how the ABI and address are kept in sync).

---

## Testing and Quality

### Frontend

From the `frontend/` directory:

- Run linting:

  ```bash
  npm run lint
  ```

- Run TypeScript type checks:

  ```bash
  npm run type-check
  ```

### Smart Contracts (Foundry – Example)

If you manage the `PiggyBank` smart contract with [Foundry](https://book.getfoundry.sh/), a typical workflow might look like:

```bash
forge install
forge build
forge test -vvv
```

Adapt these commands to match your actual contracts repository structure.

---

## Deployment

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the contents of `frontend/dist` to your preferred static hosting platform (e.g. Vercel, Netlify, Cloudflare Pages, or an S3 + CDN setup).

3. Ensure the deployed environment has the correct `VITE_REOWN_PROJECT_ID` and `VITE_PIGGYBANK_ADDRESS` values configured.

---

## CI/CD

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that:

- Runs on pull requests and pushes to `main`.
- Installs frontend dependencies, lints, type-checks, and builds the app.
- Optionally runs Foundry tests if `foundry.toml` exists in the repository.
- Provides an optional, manual `deploy` job via the "Run workflow" button.

### Triggers

- `pull_request`: Lint, type-check, and build run automatically for PRs.
- `push` to `main`: Same checks run on main.
- `workflow_dispatch`: Manual run; set input `deploy: true` to run optional deploy job.

### Optional deploy job secrets

Configure these repository secrets if you enable the deploy job (usually in your contracts repository):

- `PRIVATE_KEY`: Deployer private key (use a test key; never commit).
- `RPC_URL`: Network RPC endpoint (e.g., Base Sepolia).
- `EXPLORER_API_KEY`: Block explorer API key (optional, for verification if added).

Note: This repo hosts the frontend. Contract deployment/verification typically lives in the contracts repository where your Foundry project resides.

---

## Security and Disclaimer

- Always audit and thoroughly test smart contracts before deploying to mainnet.
- Do not deposit more funds than you are willing to lose while the system is under active development.
- This project is provided for educational and experimental purposes and comes with no guarantees.

---

## License

MIT
