const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyFirstToken Learning Tests", function () {
    let token;
    let owner;
    let addr1;
    let addr2;
    
    const TOKEN_NAME = "My First Token";
    const TOKEN_SYMBOL = "MFT";
    const DECIMALS = 18;
    const INITIAL_SUPPLY = 1000; // 1000 tokens
    const MAX_SUPPLY = 10000; // 10000 tokens max
    
    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();
        
        // Deploy contract
        const MyFirstToken = await ethers.getContractFactory("MyFirstToken");
        token = await MyFirstToken.deploy(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            DECIMALS,
            INITIAL_SUPPLY,
            MAX_SUPPLY,
            owner.address
        );
    });
    
    describe("Deployment", function () {
        it("Should set the correct token name and symbol", async function () {
            expect(await token.name()).to.equal(TOKEN_NAME);
            expect(await token.symbol()).to.equal(TOKEN_SYMBOL);
        });
        
        it("Should set the correct decimals", async function () {
            expect(await token.decimals()).to.equal(DECIMALS);
        });
        
        it("Should assign the initial supply to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            const expectedBalance = ethers.parseUnits(INITIAL_SUPPLY.toString(), DECIMALS);
            expect(ownerBalance).to.equal(expectedBalance);
        });
        
        it("Should set the correct max supply", async function () {
            const expectedMaxSupply = ethers.parseUnits(MAX_SUPPLY.toString(), DECIMALS);
            expect(await token.maxSupply()).to.equal(expectedMaxSupply);
        });
        
        it("Should set the correct owner", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });
    });
    
    describe("Token Information", function () {
        it("Should return correct token info", async function () {
            const tokenInfo = await token.getTokenInfo();
            
            expect(tokenInfo.tokenName).to.equal(TOKEN_NAME);
            expect(tokenInfo.tokenSymbol).to.equal(TOKEN_SYMBOL);
            expect(tokenInfo.tokenDecimals).to.equal(DECIMALS);
            expect(tokenInfo.tokenMaxSupply).to.equal(ethers.parseUnits(MAX_SUPPLY.toString(), DECIMALS));
        });
    });
    
    describe("Minting", function () {
        it("Should allow owner to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100", DECIMALS);
            
            await expect(token.mint(addr1.address, mintAmount))
                .to.emit(token, "TokensMinted")
                .withArgs(addr1.address, mintAmount);
                
            expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
        });
        
        it("Should not allow non-owner to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100", DECIMALS);
            
            await expect(token.connect(addr1).mint(addr1.address, mintAmount))
                .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });
        
        it("Should not allow minting beyond max supply", async function () {
            const remainingSupply = ethers.parseUnits("9000", DECIMALS); // MAX - INITIAL
            const excessAmount = ethers.parseUnits("9001", DECIMALS);
            
            await expect(token.mint(addr1.address, excessAmount))
                .to.be.revertedWith("Exceeds maximum supply");
        });
    });
    
    describe("Burning", function () {
        beforeEach(async function () {
            // Transfer some tokens to addr1 for testing
            const transferAmount = ethers.parseUnits("100", DECIMALS);
            await token.transfer(addr1.address, transferAmount);
        });
        
        it("Should allow users to burn their tokens", async function () {
            const burnAmount = ethers.parseUnits("50", DECIMALS);
            const initialBalance = await token.balanceOf(addr1.address);
            
            await expect(token.connect(addr1).burn(burnAmount))
                .to.emit(token, "TokensBurned")
                .withArgs(addr1.address, burnAmount);
                
            const finalBalance = await token.balanceOf(addr1.address);
            expect(finalBalance).to.equal(initialBalance - burnAmount);
        });
        
        it("Should not allow burning more than balance", async function () {
            const burnAmount = ethers.parseUnits("200", DECIMALS); // More than addr1 has
            
            await expect(token.connect(addr1).burn(burnAmount))
                .to.be.revertedWith("Insufficient balance to burn");
        });
    });
    
    describe("Transfers", function () {
        it("Should transfer tokens between accounts", async function () {
            const transferAmount = ethers.parseUnits("50", DECIMALS);
            
            await expect(token.transfer(addr1.address, transferAmount))
                .to.emit(token, "Transfer")
                .withArgs(owner.address, addr1.address, transferAmount);
                
            expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);
        });
        
        it("Should fail if sender doesn't have enough tokens", async function () {
            const transferAmount = ethers.parseUnits("1", DECIMALS);
            
            await expect(token.connect(addr1).transfer(addr2.address, transferAmount))
                .to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
        });
    });
});
