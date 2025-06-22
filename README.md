# 🚀 My First Web3 Project - Learning Journey

A comprehensive Web3 learning project featuring an ERC-20 token smart contract with a beautiful frontend DApp interface.

## 📋 Project Overview

This project demonstrates fundamental Web3 development concepts:
- Smart contract development with Solidity
- ERC-20 token implementation
- Local blockchain deployment with Hardhat
- Frontend integration with MetaMask
- Modern UI/UX for DApp interaction

## 🛠 Technology Stack

- **Smart Contracts**: Solidity ^0.8.28
- **Development Framework**: Hardhat
- **Standards**: OpenZeppelin ERC-20
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Web3 Library**: Ethers.js v5.6.9
- **Wallet**: MetaMask integration

## 📁 Project Structure

```
First-Web3/
├── contracts/
│   ├── Lock.sol                 # Sample Hardhat contract
│   └── MyFirstToken.sol         # Custom ERC-20 token
├── test/
│   ├── Lock.js                  # Lock contract tests
│   └── MyFirstToken.test.js     # Token contract tests (22 tests)
├── scripts/
│   └── deploy.js                # Deployment script
├── frontend/
│   ├── index.html               # Frontend UI
│   └── app.js                   # Web3 interaction logic
├── ignition/
│   └── modules/
│       └── Lock.js              # Ignition deployment
├── hardhat.config.js            # Hardhat configuration
├── package.json                 # Dependencies
└── .env.example                 # Environment template
```

## 🎯 Features

### Smart Contract Features
- ✅ **ERC-20 Standard**: Full compliance with ERC-20 token standard
- ✅ **Minting**: Owner can mint new tokens (with max supply limit)
- ✅ **Burning**: Users can burn their own tokens
- ✅ **Ownership**: Ownable contract with access control
- ✅ **Events**: Comprehensive event logging
- ✅ **Safety**: Built with OpenZeppelin security standards

### Frontend Features
- 🎨 **Modern UI**: Beautiful gradient design with responsive layout
- 🔗 **MetaMask Integration**: Seamless wallet connection
- 💰 **Token Management**: Transfer, mint, and burn tokens
- 📊 **Real-time Updates**: Live balance and supply tracking
- 🛡️ **Error Handling**: User-friendly error messages
- 👑 **Owner Controls**: Special UI for contract owner

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/henrysoed/First-Web3.git
   cd First-Web3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile contracts**
   ```bash
   npm run compile
   ```

4. **Run tests**
   ```bash
   npm test
   ```

### Local Development

1. **Start local blockchain**
   ```bash
   npm run node
   ```

2. **Deploy contracts (in new terminal)**
   ```bash
   npm run deploy:local
   ```

3. **Configure MetaMask**
   - Network: Localhost 8545
   - Chain ID: 1337
   - Import account using private key from Hardhat node

4. **Open Frontend**
   - Open `frontend/index.html` in your browser
   - Connect MetaMask wallet
   - Start interacting with your token!

## 📝 Contract Details

### MyFirstToken Contract
- **Name**: My First Token
- **Symbol**: MFT
- **Decimals**: 18
- **Initial Supply**: 1,000 MFT
- **Max Supply**: 10,000 MFT
- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (localhost)

### Available Functions
- `transfer(address to, uint256 amount)` - Transfer tokens
- `mint(address to, uint256 amount)` - Mint new tokens (owner only)
- `burn(uint256 amount)` - Burn your tokens
- `getTokenInfo()` - Get comprehensive token information
- Standard ERC-20 functions (balanceOf, approve, etc.)

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
npm test
```

**Test Results**: ✅ 22/22 tests passing
- Deployment tests
- Token information tests  
- Minting functionality tests
- Burning functionality tests
- Transfer functionality tests
- Access control tests

## 📱 Frontend Usage

1. **Connect Wallet**: Click "Connect MetaMask" button
2. **View Token Info**: See your balance and token details
3. **Transfer Tokens**: Send tokens to any address
4. **Mint Tokens**: (Owner only) Create new tokens
5. **Burn Tokens**: Destroy your tokens permanently

## 🌐 Network Configuration

### Local Development
- **Network**: Hardhat Network
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 1337

### Testnet (Future)
- **Network**: Sepolia
- **Configuration**: Ready in hardhat.config.js

## 📚 Learning Objectives Achieved

✅ **Smart Contract Development**
- Solidity programming fundamentals
- ERC-20 token standard implementation
- OpenZeppelin library usage
- Access control patterns

✅ **Testing & Deployment**
- Comprehensive test writing with Mocha/Chai
- Local blockchain deployment with Hardhat
- Contract interaction and verification

✅ **Frontend Integration**
- Web3 wallet integration (MetaMask)
- Ethers.js library usage
- Real-time blockchain data fetching
- Transaction handling and user feedback

✅ **Development Best Practices**
- Version control with structured Git commits
- Environment configuration
- Error handling and user experience
- Security considerations

## 🔐 Security Notes

- Never commit private keys to version control
- Always test on testnets before mainnet deployment
- Implement proper access controls
- Use established libraries like OpenZeppelin
- Perform thorough testing

## 🚀 Next Steps for Learning

1. **Deploy to Testnet**: Configure Sepolia deployment
2. **Add More Features**: Implement staking, governance, or NFTs
3. **Improve Frontend**: Add React.js or Vue.js
4. **Testing**: Add integration and end-to-end tests
5. **Security**: Learn about smart contract auditing

## 🤝 Contributing

This is a learning project! Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues or suggestions

## 📄 License

This project is for educational purposes. Feel free to use it for learning Web3 development.

## 🙏 Acknowledgments

- **Hardhat Team** - For the excellent development framework
- **OpenZeppelin** - For secure smart contract standards
- **Ethers.js** - For the amazing Web3 library
- **MetaMask** - For wallet integration capabilities

---

**Happy Learning! 🎉**

*Built with ❤️ for the Web3 community*
