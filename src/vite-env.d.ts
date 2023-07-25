/// <reference types="vite/client" />
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum: any;
}

interface ImportMetaEnv {
  readonly WALLET_CONNECT_PROJECT_ID: "689eff2d0e4c3b59879d726f76c8fba7";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
