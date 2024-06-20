import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { getAuthProvider } from './arcanaConnector';


export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({
      projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
    }),
    ArcanaConnector(
      {
        auth: getAuthProvider(),
      }
    )
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
