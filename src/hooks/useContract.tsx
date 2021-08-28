import { useRef } from 'react';
import useWeb3 from 'hooks/useWeb3';
import abis from 'rubix/abi';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import useWeb3React from 'hooks/useWeb3React';
import { Web3ReactCustom } from 'hooks/useWeb3React';

interface useContractReturnType {
    web3: Web3;
    contract: Contract;
    web3React: Web3ReactCustom;
}

const useContract: (contractName: string) => useContractReturnType = (contractName) => {
    const web3React = useWeb3React();
    const web3 = useWeb3();
    const contract = useRef(null);

    if (!abis[contractName]?.abi) {
        throw new Error(`Abi not found of ${contractName}`);
    }

    if (!abis[contractName]?.address) {
        throw new Error(`Address not found of ${contractName}`);
    }
    if (web3React.active && web3) {
        contract.current = new web3.eth.Contract(abis[contractName].abi, abis[contractName].address);
    }
    return { web3, contract: contract.current, web3React };
};

export default useContract;
