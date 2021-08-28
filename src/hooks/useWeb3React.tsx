import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { useWeb3React } from '@web3-react/core';

export interface Web3ReactCustom extends Web3ReactContextInterface {
    blockNumber: number;
}

const useWeb3ReactCustom: () => Web3ReactCustom = () => {
    const context = useWeb3React<Web3Provider>();
    const [blockNumber, setBlockNumber] = useState<number>();
    useEffect(() => {
        if (!!context.library) {
            let stale = false;

            context.library
                .getBlockNumber()
                .then((blockNumber: number) => {
                    if (!stale) {
                        setBlockNumber(blockNumber);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBlockNumber(null);
                    }
                });

            const updateBlockNumber = (blockNumber: number): void => {
                setBlockNumber(blockNumber);
            };
            context.library.on('block', updateBlockNumber);

            return () => {
                stale = true;
                context.library.removeListener('block', updateBlockNumber);
                setBlockNumber(undefined);
            };
        }
    }, [context.library, context.chainId]);

    return { ...context, blockNumber };
};

export default useWeb3ReactCustom;
