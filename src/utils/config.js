import { http, createConfig, createStorage } from "wagmi";
import {  mainnet, sepolia,holesky } from "wagmi/chains";
import { coinbaseWallet,  walletConnect } from "@wagmi/connectors";

export const config = createConfig({
 chains: [mainnet, sepolia,holesky],
 storage: createStorage({ storage: window.localStorage }),
 connectors: [
   walletConnect({
     projectId: "671fb065dee58bbee48ff0c7d66f808c",
   }),
   coinbaseWallet({
     appName: "My Wagmi App",
   }),
 ],
 transports: {
   [mainnet.id]: http(),
   [sepolia.id]: http(),
   [holesky.id]: http(),
 },
});
