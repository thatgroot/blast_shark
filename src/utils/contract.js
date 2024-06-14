import { ethers } from "ethers";
import { parseAbi, parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ABI } from "./abi";
import { getProof, og_whitelist, shark_whitelist } from "./proofs";
export const CONTRACT_ADDRESS = "0xcc08391F6A9cee8592a441516597f42b9ce08040";
// 0x7d7A3ce7a2FA58394C6f3898dDf74c52fbD66Cef
// 0x63C7Cb9e98958bD778d070507A5790DA4D9F6b4d
// 0x438D8681e9276345ED87c7FA050F99dB4A5a34df

export async function getProvider() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
}

export async function getSigner() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  return signer;
}
export async function getContract(signer_or_provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer_or_provider);
}

export async function mintOg() {
  // Initialize the contract instance
  const signer = await getSigner();
  const address = signer.address;
  const blast_shark = await getContract(signer);
  const proof = getProof(og_whitelist, address);

  try {
    const tx = await blast_shark.ogtMint(proof, {
      value: parseEther("0.000015"),
    });
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    return {
      status: receipt.status,
      reason: "Successfuly minted a Shark!",
    };
  } catch (error) {
    // Handle errors, e.g., if the contract does not support totalSupply
    return {
      status: "error",
      reason: error.reason ? error.reason : error.message,
    };
  }
}

export async function mintShark() {
  // Initialize the contract instance
  const signer = await getSigner();
  const address = signer.address;
  const blast_shark = await getContract(signer);
  const proof = getProof(shark_whitelist, address);

  try {
    const tx = await blast_shark.sharkMint(proof, {
      value: parseEther("0.000020"),
    });
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    return {
      status: receipt.status,
      reason: "Successfuly minted a Shark!",
    };
  } catch (error) {
    // Handle errors, e.g., if the contract does not support totalSupply
    return {
      status: "error",
      reason: error.reason ? error.reason : error.message,
    };
  }
}

export async function mint() {
  const signer = await getSigner();
  const blast_shark = await getContract(signer);
  try {
    const tx = await blast_shark.mint({
      value: parseEther("0.000025"),
    });
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    return {
      status: receipt.status,
      reason: "Successfuly minted a Shark!",
    };
  } catch (error) {
    // Handle errors, e.g., if the contract does not support totalSupply
    return {
      status: "error",
      reason: error.reason ? error.reason : error.message,
    };
  }
}
export async function useOgMint(tokenId) {
  const provider = await getProvider();
  provider.getSigner().then((value) => {
    alert(value.address);
  });
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    isConfirming,
    isConfirmed,
    hash,
    error,
    isPending,
    mint: writeContract({
      address: CONTRACT_ADDRESS,
      abi: parseAbi([
        "function ogtMint(uint256 tokenId, bytes32[] calldata proof)",
      ]),
      functionName: "ogtMint",
      args: [BigInt(tokenId)],
      value: parseEther("0.015"),
    }),
  };
}

export function useSharkMint(tokenId) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  writeContract({
    address: CONTRACT_ADDRESS,
    abi: parseAbi([
      "function sharkMint(uint256 tokenId, bytes32[] calldata proof)",
    ]),
    functionName: "sharkMint",
    args: [BigInt(tokenId)],
    value: parseEther("0.020"),
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return { isConfirming, isConfirmed, hash, error, isPending };
}
export function useMint(tokenId) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  writeContract({
    address: CONTRACT_ADDRESS,
    abi: parseAbi(["function mint(uint256 tokenId)"]),
    functionName: "mint",
    args: [BigInt(tokenId)],
    value: parseEther("0.025"),
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return { isConfirming, isConfirmed, hash, error, isPending };
}
