/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SectionHeader from 'components/SectionHeader';
// import CustomButton from 'components/CustomButton';
import useContract from 'hooks/useContract';
// import toast from 'utils/toast';

const WelcomeHeader: React.FC = () => {
    // @ts-ignore
    const isSmUpScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const { web3, web3React, contract: airdropContract } = useContract('airdrop');
    const [isClaimable, setIsClaimable] = useState(false);

    const init: () => void = async () => {
        try {
            const res = await airdropContract.methods.isWhitelisted(web3React.account).call();
            setIsClaimable(res);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    useEffect(() => {
        if (web3React.active && web3) {
            init();
        }
    }, [web3React.account]);

    const claimHandler: () => void = async () => {
        try {
            if (isClaimable && web3React.activate && web3) {
                await airdropContract.methods.claim().send({ from: web3React.account });
            }
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const classes = useStyles();
    return (
        <SectionHeader
            className={classes.welcomeHeader}
            title="Welcome to Rubix!"
            subTitle="Play. Earn. Trade. Repeat."
        >
            {/* {isSmUpScreen && (
                <CustomButton
                    onClick={claimHandler}
                    size="large"
                    color="black"
                    endIcon={<img className={classes.buttonIcon} src="/rubix_logo.svg" alt="rubix" />}
                    className={classes.button}
                    disabled={!isClaimable}
                >
                    <div className={classes.buttonContent}>
                        <small className={classes.buttonSmallText}>UNCLAIMED RBX</small>
                        {isClaimable ? 80 : 0} RBX
                    </div>
                </CustomButton>
            )} */}
        </SectionHeader>
    );
};

export default WelcomeHeader;

const useStyles = makeStyles((theme) => ({
    welcomeHeader: { marginBottom: '10px', color: theme.palette.common.white, fontFamily: 'lust-didone, serif' },
    button: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    buttonIcon: {
        height: '40px',
        width: '40px',
    },
    buttonContent: {
        fontSize: theme.typography.pxToRem(30),
        textAlign: 'right',
        lineHeight: 1,
        marginRight: '25px',
        [theme.breakpoints.only('sm')]: { fontSize: theme.typography.pxToRem(20) },
    },
    buttonSmallText: {
        fontSize: '20%',
        display: 'block',
    },
}));
