import { useRef } from 'react';
import Web3 from 'web3';

const useWeb3: () => Web3 = () => {
    const web3Ref = useRef(null);

    if (process.browser) {
        // @ts-ignore
        web3Ref.current = new Web3(window.ethereum);
    }

    return web3Ref.current;
};

export default useWeb3;
