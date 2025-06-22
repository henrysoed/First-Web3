const { ethers } = require("hardhat");

async function main() {
    console.log("Starting deployment...");
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");
    
    // Token parameters
    const TOKEN_NAME = "My First Token";
    const TOKEN_SYMBOL = "MFT";
    const DECIMALS = 18;
    const INITIAL_SUPPLY = 1000; // 1000 tokens
    const MAX_SUPPLY = 10000; // 10000 tokens max
    
    console.log("\n=== Token Parameters ===");
    console.log("Name:", TOKEN_NAME);
    console.log("Symbol:", TOKEN_SYMBOL);
    console.log("Decimals:", DECIMALS);
    console.log("Initial Supply:", INITIAL_SUPPLY);
    console.log("Max Supply:", MAX_SUPPLY);
    console.log("Owner:", deployer.address);
    
    // Deploy MyFirstToken
    console.log("\n=== Deploying MyFirstToken ===");
    const MyFirstToken = await ethers.getContractFactory("MyFirstToken");
    
    const token = await MyFirstToken.deploy(
        TOKEN_NAME,
        TOKEN_SYMBOL,
        DECIMALS,
        INITIAL_SUPPLY,
        MAX_SUPPLY,
        deployer.address
    );
    
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    
    console.log("MyFirstToken deployed to:", tokenAddress);
    
    // Verify deployment
    console.log("\n=== Verifying Deployment ===");
    const tokenInfo = await token.getTokenInfo();
    console.log("Token Name:", tokenInfo.tokenName);
    console.log("Token Symbol:", tokenInfo.tokenSymbol);
    console.log("Token Decimals:", tokenInfo.tokenDecimals.toString());
    console.log("Total Supply:", ethers.formatUnits(tokenInfo.tokenTotalSupply, DECIMALS));
    console.log("Max Supply:", ethers.formatUnits(tokenInfo.tokenMaxSupply, DECIMALS));
    
    const ownerBalance = await token.balanceOf(deployer.address);
    console.log("Owner Balance:", ethers.formatUnits(ownerBalance, DECIMALS), TOKEN_SYMBOL);
    
    // Save deployment info
    const deploymentInfo = {
        network: await ethers.provider.getNetwork(),
        tokenAddress: tokenAddress,
        deployer: deployer.address,
        tokenName: TOKEN_NAME,
        tokenSymbol: TOKEN_SYMBOL,
        decimals: DECIMALS,
        initialSupply: INITIAL_SUPPLY,
        maxSupply: MAX_SUPPLY,
        deployedAt: new Date().toISOString()
    };
    
    console.log("\n=== Deployment Complete ===");
    console.log("Contract Address:", tokenAddress);
    console.log("Save this address for frontend integration!");
    
    return deploymentInfo;
}

// Handle errors and exit
main()
    .then((deploymentInfo) => {
        console.log("\n✅ Deployment successful!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });
