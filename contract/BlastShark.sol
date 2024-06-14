// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC721A.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BlastShark is ERC721A, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    uint256 public constant OG_PRICE = 0.01 ether;
    uint256 public constant SHARK_PRICE = 0.02 ether;
    uint256 public constant MINT_PRICE = 0.025 ether;

    uint256 constant MAX_SUPPLY = 3333;
    using Strings for uint256;
    using MerkleProof for bytes32[];

    // Base URI for metadata
    string private _baseTokenURI = "https://ipfs.filebase.io/ipfs/QmaceqUieC7rF7ZhwMXDYifupKwmbzoQweNMM6pzgdW2Zx/";

    bytes32 private og_merkleroot;
    bytes32 private shark_merkleroot;

    // Timestamp of OG mint phase start
    uint256 public OG_START_TIME;
    uint256 public constant OG_OPEN_FOR = 1 hours;

    // Event for successful minting
    event Mint(address indexed to, uint256 tokenId);

    // Constructor
    constructor() ERC721A("Blast Shark", "$BS") Ownable(msg.sender) {}

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    // Modifier to check if OG mint has started and has been more than 1 hour
    modifier onlyAfterOgMintEnds() {
        require(OG_START_TIME != 0, "OG mint has not started yet");
        require(
            block.timestamp >= OG_START_TIME + OG_OPEN_FOR,
            "Og mint not yet ended"
        );
        _; // Continue executing the function
    }

    // Modifier to check if OG mint has started and has been more than 1 hour
    modifier onlyAftersharkMintEnds() {
        require(
            block.timestamp >= OG_START_TIME + OG_OPEN_FOR.add(1 hours),
            "Shark mint not yet ended"
        );
        _; // Continue executing the function
    }

    // Function to check if OG mint has started
    function ogStarted() public view returns (bool) {
        return OG_START_TIME > 0;
    }

    // Function to check if OG mint has ended
    function ogEnded() public view returns (bool) {
        return
            OG_START_TIME > 0 && block.timestamp >= OG_START_TIME + OG_OPEN_FOR;
    }

    // Function to check if Shark mint has started
    function sharkStarted() public view returns (bool) {
        if (OG_START_TIME == 0) {
            return false;
        }
        return ogEnded();
    }

    // Function to check if Shark mint has ended
    function sharkEnded() public view returns (bool) {
        return
            ogEnded() &&
            block.timestamp >= OG_START_TIME + OG_OPEN_FOR.add(1 hours);
    }

    // Start OG mint phase
    function startOgMint() external onlyOwner {
        require(OG_START_TIME == 0, "OG mint already started");
        OG_START_TIME = block.timestamp;
    }

    // Set base URI
    function setBaseURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    // Set whitelist root hash
    function setMerkleRoot(bytes32 _og, bytes32 _whitelist) external onlyOwner {
        og_merkleroot = _og;
        shark_merkleroot = _whitelist;
    }

    // Mint with whitelist proof
    function ogtMint(bytes32[] calldata proof) external payable nonReentrant {
        require(OG_START_TIME > 0, "OG mint is not started yet!");
        require(!ogEnded(), "Og mint has ended!");
        require(
            verifyProof(msg.sender, proof, og_merkleroot),
            "Invalid whitelist proof"
        );
        require(
            OG_PRICE == msg.value,
            string(abi.encodePacked("You can mint in og phase for ", OG_PRICE))
        );
        require(balanceOf(msg.sender) < 10, "You have already minted 10 NFT");

        _mintToken(msg.sender);
    }

    function teamMint(address to) external payable nonReentrant onlyOwner {
        _mintToken(to);
    }

    // Mint with whitelist proof
    function sharkMint(bytes32[] calldata proof)
        external
        payable
        onlyAfterOgMintEnds
        nonReentrant
    {
        require(OG_START_TIME > 0, "OG mint is not started yet!");
        require(!sharkEnded(), "Shark mint has ended!");
        require(
            verifyProof(msg.sender, proof, shark_merkleroot),
            "Invalid whitelist proof"
        );

        require(
            SHARK_PRICE == msg.value,
            string(
                abi.encodePacked("You can mint in og phase for ", SHARK_PRICE)
            )
        );
        require(balanceOf(msg.sender) < 10, "You have already minted 10 NFT");

        _mintToken(msg.sender);
    }

    // Mint without whitelist proof
    function mint() external payable onlyAftersharkMintEnds nonReentrant {
        require(sharkEnded(), "Shark mint has not ended yet!");
        require(balanceOf(msg.sender) < 10, "You have already minted 10 NFT");
        _mintToken(msg.sender);
    }

    // Burn tokens
    function burn(uint256 tokenId) external {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not approved or owner");
        _burn(tokenId);
    }

    // Internal function to mint a token
    function _mintToken(address to) internal {
        require(totalSupply() < MAX_SUPPLY, "Exceeded total supply");
        _safeMint(to, 1);
        emit Mint(to, 1);
    }

    // Verify whitelist proof
    function verifyProof(
        address account,
        bytes32[] calldata proof,
        bytes32 root
    ) public pure returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return MerkleProof.verify(proof, root, leaf);
    }

    // Get token URI
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist");

        return
            bytes(_baseTokenURI).length > 0
                ? string(
                    abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json")
                )
                : "";
    }

 
}
