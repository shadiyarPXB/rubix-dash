import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({ supportedChainIds: [56, 97] });

export const walletconnect = new WalletConnectConnector({
    rpc: { 56: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
    bridge: 'https://pancakeswap.bridge.walletconnect.org/',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});
