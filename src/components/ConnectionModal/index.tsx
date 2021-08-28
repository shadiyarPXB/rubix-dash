/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Web3Provider } from '@ethersproject/providers';
import WalletCard from './WalletCard';
import walletConnectLogo from 'assets/images/walletconnect-logo.png';
import metamaskfox from 'assets/images/metamask-fox.svg';
import toast from 'utils/toast';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { injected, walletconnect } from 'connectors';
import useEagerConnect from 'hooks/useEagerConnect';
import useInactiveListener from 'hooks/useInactiveListener';

enum ConnectorNames {
    Injected = 'Injected',
    WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
};

function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
        return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
        //  toast('You are on the wrong network!');
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect ||
        error instanceof UserRejectedRequestErrorFrame
    ) {
        return 'Please authorize this website to access your Ethereum account.';
    } else {
        console.error(error);
        return 'An unknown error occurred. Check the console for more details.';
    }
}
interface ConnectionModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, setIsOpen }) => {
    const { connector, activate, active } = useWeb3React<Web3Provider>();

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState<any>();
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();
    const [open, setOpen] = React.useState(false);
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    const activateHandler: (name: ConnectorNames) => void = async (name) => {
        try {
            await activate(connectorsByName[name]);
            //   toast('Login successfully!');
        } catch (error) {
            //  toast('Error!');
        }
    };

    useEffect(() => {
        if (active) {
            setIsOpen(false);
        }
    }, [active]);

    const classes = useStyles();
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div className={classes.modalWrapper}>
                <WalletCard
                    title="WalletConnect"
                    logo={walletConnectLogo}
                    onClick={() => activateHandler(ConnectorNames.WalletConnect)}
                />
                <WalletCard
                    title="Metamask"
                    logo={metamaskfox}
                    onClick={() => activateHandler(ConnectorNames.Injected)}
                />
            </div>
        </Modal>
    );
};

export default ConnectionModal;

const useStyles = makeStyles((theme) => ({
    modalWrapper: {
        backgroundColor: theme.palette.info.main,
        padding: '30px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        maxWidth: 600,
        width: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderRadius: '10px',
    },
}));
