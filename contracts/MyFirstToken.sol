// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyFirstToken
 * @dev Learning project: Simple ERC-20 token with basic functionality
 */
contract MyFirstToken is ERC20, Ownable {
    uint8 private _decimals;
    uint256 public maxSupply;
    
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply,
        uint256 maxSupply_,
        address initialOwner
    ) ERC20(name, symbol) Ownable(initialOwner) {
        _decimals = decimals_;
        maxSupply = maxSupply_ * 10**decimals_;
        
        // Mint initial supply ke owner
        _mint(initialOwner, initialSupply * 10**decimals_);
        
        emit TokensMinted(initialOwner, initialSupply * 10**decimals_);
    }
    
    /**
     * @dev Returns the number of decimals used to get user representation
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    /**
     * @dev Mint new tokens - only owner can call this
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply() + amount <= maxSupply, "Exceeds maximum supply");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     */
    function burn(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance to burn");
        
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @dev Get token information
     */
    function getTokenInfo() public view returns (
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        uint256 tokenTotalSupply,
        uint256 tokenMaxSupply
    ) {
        return (
            name(),
            symbol(),
            decimals(),
            totalSupply(),
            maxSupply
        );
    }
}
