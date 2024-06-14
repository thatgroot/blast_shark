import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

const shark_whitelist = [
  "0xE36E96A3842039d68794C15ace30ab7C9143ad1A",
  "0xF69c12BCAb3cc3Bef5a5BF7eD990B26dA2871D55",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
]
const og_whitelist = [
  "0xE36E96A3842039d68794C15ace30ab7C9143ad1A",
  "0xF69c12BCAb3cc3Bef5a5BF7eD990B26dA2871D55",
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
];

function ogWhitelist(list, addr) {
  const leafNodes = list.map((item) =>
    keccak256(Buffer.from(item.replace("0x", ""), "hex"))
  );
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  const index = list.findIndex((item) => item === addr);
  const proof = merkleTree.getHexProof(leafNodes[index]);

  console.log("Root : ", merkleTree.getHexRoot());
  console.log("Proof : ", proof);
}

console.log('og')
ogWhitelist(og_whitelist, og_whitelist[1]);
console.log('-----------------')
console.log('shark')
ogWhitelist(shark_whitelist, shark_whitelist[1]);

// For each element : concatenate the two hex buffers
// to a single one as this keccak256 implementation only
// expects one input
