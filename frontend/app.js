// Contract Configuration
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this with your deployed contract address
const CONTRACT_ABI = [
    // ERC-20 Standard Functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    
    // Custom Functions
    "function maxSupply() view returns (uint256)",
    "function mint(address to, uint256 amount)",
    "function burn(uint256 amount)",
    "function owner() view returns (address)",
    "function getTokenInfo() view returns (string, string, uint8, uint256, uint256)",
    
    // Events
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event TokensMinted(address indexed to, uint256 amount)",
    "event TokensBurned(address indexed from, uint256 amount)"
];

// Global Variables
let provider;
let signer;
let contract;
let userAccount;

// Initialize app when page loads
window.addEventListener('load', async () => {
    await checkWalletConnection();
});

// Check if MetaMask is installed and connected
async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    } else {
        showError('MetaMask is not installed. Please install MetaMask to use this DApp.');
    }
}

// Connect to MetaMask wallet
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            showError('MetaMask is not installed!');
            return;
        }

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAccount = await signer.getAddress();
        
        // Create contract instance
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        // Update UI
        await updateWalletUI();
        await loadTokenInfo();
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
        showSuccess('Wallet connected successfully!');
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showError('Failed to connect wallet: ' + error.message);
    }
}

// Update wallet UI after connection
async function updateWalletUI() {
    try {
        const network = await provider.getNetwork();
        
        document.getElementById('accountAddress').textContent = userAccount;
        document.getElementById('networkName').textContent = network.name === 'unknown' ? 'Localhost' : network.name;
        
        document.getElementById('walletSection').classList.add('connected');
        document.getElementById('walletStatus').textContent = 'Wallet Connected!';
        document.getElementById('connectBtn').style.display = 'none';
        document.getElementById('accountInfo').classList.remove('hidden');
        document.getElementById('tokenSection').classList.remove('hidden');
        
    } catch (error) {
        console.error('Error updating wallet UI:', error);
    }
}

// Load token information
async function loadTokenInfo() {
    try {
        const tokenInfo = await contract.getTokenInfo();
        const userBalance = await contract.balanceOf(userAccount);
        const owner = await contract.owner();
        
        document.getElementById('tokenName').textContent = tokenInfo[0];
        document.getElementById('tokenSymbol').textContent = tokenInfo[1];
        document.getElementById('userBalance').textContent = ethers.utils.formatEther(userBalance) + ' ' + tokenInfo[1];
        document.getElementById('totalSupply').textContent = ethers.utils.formatEther(tokenInfo[3]) + ' ' + tokenInfo[1];
        
        // Show mint section only if user is owner
        if (userAccount.toLowerCase() === owner.toLowerCase()) {
            document.getElementById('mintSection').style.display = 'block';
        } else {
            document.getElementById('mintSection').style.display = 'none';
        }
        
    } catch (error) {
        console.error('Error loading token info:', error);
        showError('Failed to load token information: ' + error.message);
    }
}

// Transfer tokens
async function transferTokens() {
    try {
        const to = document.getElementById('transferTo').value;
        const amount = document.getElementById('transferAmount').value;
        
        if (!to || !amount) {
            showError('Please fill in all fields');
            return;
        }
        
        if (!ethers.utils.isAddress(to)) {
            showError('Invalid address');
            return;
        }
        
        const amountWei = ethers.utils.parseEther(amount);
        const userBalance = await contract.balanceOf(userAccount);
        
        if (amountWei.gt(userBalance)) {
            showError('Insufficient balance');
            return;
        }
        
        showLoading('Transferring tokens...');
        
        const tx = await contract.transfer(to, amountWei);
        await tx.wait();
        
        showSuccess(`Successfully transferred ${amount} tokens to ${to}`);
        
        // Clear inputs and refresh balance
        document.getElementById('transferTo').value = '';
        document.getElementById('transferAmount').value = '';
        await loadTokenInfo();
        
    } catch (error) {
        console.error('Error transferring tokens:', error);
        showError('Transfer failed: ' + error.message);
    }
}

// Mint tokens (owner only)
async function mintTokens() {
    try {
        const to = document.getElementById('mintTo').value;
        const amount = document.getElementById('mintAmount').value;
        
        if (!to || !amount) {
            showError('Please fill in all fields');
            return;
        }
        
        if (!ethers.utils.isAddress(to)) {
            showError('Invalid address');
            return;
        }
        
        const amountWei = ethers.utils.parseEther(amount);
        
        showLoading('Minting tokens...');
        
        const tx = await contract.mint(to, amountWei);
        await tx.wait();
        
        showSuccess(`Successfully minted ${amount} tokens to ${to}`);
        
        // Clear inputs and refresh info
        document.getElementById('mintTo').value = '';
        document.getElementById('mintAmount').value = '';
        await loadTokenInfo();
        
    } catch (error) {
        console.error('Error minting tokens:', error);
        showError('Minting failed: ' + error.message);
    }
}

// Burn tokens
async function burnTokens() {
    try {
        const amount = document.getElementById('burnAmount').value;
        
        if (!amount) {
            showError('Please enter amount to burn');
            return;
        }
        
        const amountWei = ethers.utils.parseEther(amount);
        const userBalance = await contract.balanceOf(userAccount);
        
        if (amountWei.gt(userBalance)) {
            showError('Insufficient balance to burn');
            return;
        }
        
        showLoading('Burning tokens...');
        
        const tx = await contract.burn(amountWei);
        await tx.wait();
        
        showSuccess(`Successfully burned ${amount} tokens`);
        
        // Clear input and refresh info
        document.getElementById('burnAmount').value = '';
        await loadTokenInfo();
        
    } catch (error) {
        console.error('Error burning tokens:', error);
        showError('Burning failed: ' + error.message);
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected wallet
        location.reload();
    } else {
        // User switched accounts
        location.reload();
    }
}

// Handle chain changes
function handleChainChanged(chainId) {
    location.reload();
}

// Show error message
function showError(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `<div class="error">❌ ${message}</div>`;
    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `<div class="success">✅ ${message}</div>`;
    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 5000);
}

// Show loading message
function showLoading(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `<div class="success"><span class="loading"></span> ${message}</div>`;
}
