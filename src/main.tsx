import { ThemeProvider, createTheme } from "@mui/material";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, configureChains } from "wagmi";
import App from "./App";

import { Chain, createConfig } from "@wagmi/core";

const bellecour = {
  id: 0x86,
  name: "iExec Sidechain",
  network: "bellecour",
  nativeCurrency: {
    decimals: 18,
    name: "xRLC",
    symbol: "xRLC",
  },
  rpcUrls: {
    public: { http: ["https://bellecour.iex.ec"] },
    default: { http: ["https://bellecour.iex.ec"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Blockscout",
      url: "https://blockscout-bellecour.iex.ec",
    },
    default: { name: "Blockscout", url: "https://blockscout-bellecour.iex.ec" },
  },
} as const satisfies Chain;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

// material ui theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#FCD15A",
      contrastText: "#1D1D24",
    },
  },
});

// Wagmi Client
if (!import.meta.env.WALLET_CONNECT_PROJECT_ID) {
  throw new Error(
    "You need to provide a WALLET_CONNECT_PROJECT_ID env variable"
  );
}
const projectId = import.meta.env.WALLET_CONNECT_PROJECT_ID!;

const chains = [bellecour];

const { chains } = configureChains(
  [chains],
  [w3mProvider({ chains, projectId })()]
);
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

// Wagmi Client
if (!import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID) {
  throw new Error(
    "You need to provide a WALLET_CONNECT_PROJECT_ID env variable"
  );
}

// Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <WagmiConfig config={wagmiConfig}>
          <App />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
