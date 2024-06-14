import "./App.css";
import ConnectWallet from "./pages/ConnectWallet/ConnectWallet";
import { Landinpage, Mint } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./utils/config";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landinpage />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/connectwallet" element={<ConnectWallet />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </WagmiProvider>
  );
}

export default App;
