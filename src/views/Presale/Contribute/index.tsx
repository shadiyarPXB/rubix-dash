import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import SectionHeader from 'components/SectionHeader';
import SectionWrapper from 'components/SectionWrapper';
import { GridContainer, GridItem } from 'components/Gird';
import InfoCard from 'components/InfoCard';
import ContributeCard from './ContributeCard';
import Card from 'components/Card';
import useContract from 'hooks/useContract';
import toast from 'utils/toast';
import CustomTable from 'components/CustomTable';
import stringShortener from 'utils/stringShortener';
import Loader from 'components/Loader';
import CustomButton from 'components/CustomButton';

interface ContributeProps {
    id?: string;
}

const Contribute: React.FC<ContributeProps> = ({ id }) => {
    // @ts-ignore
    const isLgUpScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const { web3, web3React, contract: presaleLotteryContract } = useContract('presaleLottery');
    const { contract: rubixTokenContract } = useContract('rubixToken');

    const [contributeQty, setContributeQty] = useState(1);
    const [balance, setBalance] = useState({ bnb: '0', rbx: '0' });
    const [unclaimedRbx, setUnclaimedRbx] = useState(0);
    const [contributeLoading, setContributeLoading] = useState(false);
    const [eventsData, setEventsData] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [refundBtnDisabled, setRefundBtnDisabled] = useState(false);
    const [claimBtnDisabled, setClaimBtnDisabled] = useState(false);
    const [claimRewardsBtnDisabled, setClaimRewardsBtnDisabled] = useState(false);
    const [lotteryData, setLotteryData] = useState({});

    // @ts-ignore
    const { TicketsSold: ticketsSold, Goal: goal, Deadline: deadline } = lotteryData;

    const isRefundable = goal && deadline && new Date() > new Date(deadline * 1000) && ticketsSold < goal;
    const isClaimable = goal && deadline && new Date() > new Date(deadline * 1000) && ticketsSold >= 3000;

    const contributeChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        const value = +e.target.value;

        if (value > 99) {
            toast('Error! Maximum is 99');
            return;
        }
        setContributeQty(value);
    };

    const contributeMaxBtnHandler: () => void = () => {
        setContributeQty(99);
    };

    const contributeHandler: () => void = useCallback(async () => {
        setContributeLoading(true);

        if (web3React.active && web3) {
            await presaleLotteryContract.methods
                .Contribute(contributeQty)
                .send({
                    from: web3React.account,
                    // gas: 9200000,
                    // @ts-ignore
                    value: web3.utils.toWei('0.032') * contributeQty,
                })
                .once('transactionHash', function (hash) {
                    toast(
                        <>
                            Transactions is submitted... <a href={`https://bscscan.com/tx/${hash}`}>TxID</a>
                        </>,
                    );
                })

                .once('confirmation', function (confirmationNumber, receipt) {
                    const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                    toast(
                        <>
                            Your transaction is confirmed! <a href={link}>TxID</a>
                        </>,
                        null,
                        60000,
                    );
                    setContributeLoading(false);
                })
                .once('error', function () {
                    toast('Error! Please try sending again with higher gas fees', 'error');
                    setContributeLoading(false);
                });
        }
    }, [presaleLotteryContract, web3React.account, web3]);

    const getLotteryData: () => void = async () => {
        try {
            const res = await presaleLotteryContract.methods.getLotteryData().call();

            setLotteryData(res);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const getRBX: () => void = async () => {
        try {
            const res = await presaleLotteryContract.methods.getUserBalances(web3React.account).call();
            // @ts-ignore
            setUnclaimedRbx(web3.utils.fromWei(res[0] + res[1]) / 10);
        } catch (error) {
            console.log(error);
        }
    };

    const getBalance: () => void = async () => {
        try {
            const [rbx, bnb] = await Promise.all([
                rubixTokenContract.methods.balanceOf(web3React.account).call(),
                web3.eth.getBalance(web3React.account),
            ]);
            setBalance({ rbx: web3.utils.fromWei(rbx, 'ether'), bnb: web3.utils.fromWei(bnb, 'ether') });
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };
    const getEventsData: () => void = async () => {
        setEventsLoading(true);
        try {
            const fromBlock = 9785836;
            const loop = Math.ceil((web3React.blockNumber - fromBlock) / 5000);
            let data = [];
            for (let i = 0; i < loop; i++) {
                const currentFromBlock = fromBlock + i * 5000;
                const res = await presaleLotteryContract.getPastEvents('ContributeToPresale', {
                    filter: { Contributor: web3React.account },
                    fromBlock: currentFromBlock,
                    toBlock: currentFromBlock + 4999,
                });
                data = [...data, ...res];
            }
            setEventsData(data);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        } finally {
            setEventsLoading(false);
        }
    };

    const refundHandler: () => void = async () => {
        setRefundBtnDisabled(true);
        try {
            await presaleLotteryContract.methods.refund().send({ from: web3React.account });
            await getLotteryData();
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        } finally {
            setRefundBtnDisabled(false);
        }
    };

    const claimHandler: () => void = async () => {
        setClaimBtnDisabled(true);

        await presaleLotteryContract.methods
            .claim()
            .send({ from: web3React.account })
            .once('transactionHash', function (hash) {
                //toast(`Transactions is submitted...
                //https://bscscan.com/tx/${hash}`);
                toast(
                    <>
                        Transactions is submitted... <a href={`https://bscscan.com/tx/${hash}`}>TxID</a>
                    </>,
                );
            })

            .once('confirmation', function (confirmationNumber, receipt) {
                const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                toast(
                    <>
                        Your transaction is confirmed! <a href={link}>TxID</a>
                    </>,
                    null,
                    60000,
                );
                setClaimBtnDisabled(false);
            })
            .once('error', function () {
                toast('Error! Please try sending again with higher gas fees', 'error');
                setClaimBtnDisabled(false);
            });
    };
    const claimRewardHandler: () => void = async () => {
        setClaimRewardsBtnDisabled(true);

        await presaleLotteryContract.methods
            .claimReward()
            .send({ from: web3React.account })
            .once('transactionHash', function (hash) {
                //toast(`Transactions is submitted...
                //https://bscscan.com/tx/${hash}`);
                toast(
                    <>
                        Transactions is submitted... <a href={`https://bscscan.com/tx/${hash}`}>TxID</a>
                    </>,
                );
            })

            .once('confirmation', function (confirmationNumber, receipt) {
                const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                toast(
                    <>
                        Your transaction is confirmed! <a href={link}>TxID</a>
                    </>,
                    null,
                    60000,
                );
                setClaimRewardsBtnDisabled(false);
            })
            .once('error', function () {
                toast('Error! Please try sending again with higher gas fees', 'error');
                setClaimRewardsBtnDisabled(false);
            });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'TxId',
                accessor: 'transactionHash',
            },
            {
                Header: 'Ticket# From',
                accessor: 'ticketForm',
            },
            {
                Header: 'Ticket# To',
                accessor: 'ticketTo',
            },
            {
                Header: 'Credit',
                accessor: 'credit',
            },
            {
                Header: 'Actions',
                accessor: 'actions',
            },
        ],
        [],
    );
    const eventsTableData = React.useMemo(
        () =>
            eventsData?.map((event) => ({
                transactionHash: stringShortener(event.transactionHash),
                ticketForm: event.returnValues[2],
                ticketTo: event.returnValues[3],
                credit: web3.utils.fromWei(event.returnValues.Amount) + ' RBX',
                actions: (
                    <CustomButton disabled={!isRefundable || refundBtnDisabled} onClick={refundHandler}>
                        Refund
                    </CustomButton>
                ),
            })),
        [eventsData],
    );

    const isRun = useRef(false);
    useEffect(() => {
        if (web3React.blockNumber && !isRun.current) {
            isRun.current = true;
            getEventsData();
        }
    }, [web3React.blockNumber]);

    useEffect(() => {
        if (web3React.active) {
            getLotteryData();
            getBalance();
            getRBX();
            getEventsData();
        } else {
            setEventsData([]);
        }
    }, [web3React.account]);

    const classes = useStyles();
    return (
        <SectionWrapper id={id}>
            <SectionHeader title="Contribute" />

            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} lg={6}>
                    <InfoCard logo="/rubix_logo(Dark).svg" text="Lottery Contract address">
                        <Typography variant="subtitle2" style={{ wordBreak: 'break-all' }}>
                            0x3c1c04553654c031765C510f0318193f3Ffd4291
                        </Typography>
                    </InfoCard>
                </GridItem>
                <GridItem xs={12} lg={6}>
                    <InfoCard logo="/rubix_logo.svg" text="Rubix Token (add this to your web3React)">
                        <Typography variant="subtitle2" style={{ wordBreak: 'break-all' }}>
                            0x3de1b7a29d28653a658d0bcf3befe981eeb8d1ba
                        </Typography>
                    </InfoCard>
                </GridItem>
            </GridContainer>
            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} md={6}>
                    <ContributeCard
                        title={
                            <>
                                Contribute{' '}
                                <strong>
                                    by <br />
                                    Lottery
                                </strong>
                            </>
                        }
                        infoText={`SOLD: ${ticketsSold} TICKETS`}
                        due={0.032 * contributeQty}
                        reward={67 * contributeQty}
                        balance={[
                            { logo: '/rubix_logo.svg', value: balance.rbx, type: 'RBX' },
                            {
                                logo: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
                                value: balance.bnb,
                                type: 'BNB',
                            },
                        ]}
                        inputProps={{
                            onChange: contributeChangeHandler,
                            value: contributeQty,
                            type: 'number',
                        }}
                        submitButtonProps={{
                            onClick: contributeHandler,
                            disabled: !web3React.active || contributeLoading,
                            loading: contributeLoading,
                            // CircularProgressProps: { className: classes.progress },
                        }}
                        maxButtonProps={{ onClick: contributeMaxBtnHandler }}
                    />
                </GridItem>
                <GridItem xs={12} md={6}>
                    <ContributeCard
                        bordered
                        title={
                            <>
                                Calculate{' '}
                                <strong>
                                    &<br /> Contribute
                                </strong>
                            </>
                        }
                        infoText="You can contribute up to 3 BNB."
                        due="0.00"
                        balance={[
                            { logo: '/rubix_logo.svg', value: balance.rbx, type: 'RBX' },
                            {
                                logo: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
                                value: balance.bnb,
                                type: 'BNB',
                            },
                        ]}
                        submitButtonProps={{ disabled: true }}
                        infoTooltip="You can contribute when >500 tickets sold"
                    />
                </GridItem>
            </GridContainer>
            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} md={6}>
                    <Card className={classes.leftSideCard}>
                        <div>
                            <Typography>
                                Minimum prize to: <strong>12 RBX</strong>
                            </Typography>
                            <Typography>
                                Current Multiplier: <strong>1x</strong>
                            </Typography>
                            <Typography>
                                Max Multiplier: <strong>50x</strong>
                            </Typography>
                            <Typography>
                                Tickets bought: <strong>{ticketsSold}</strong>
                            </Typography>
                        </div>
                        <div>
                            <Typography className={classes.rightSideText} variant="h4">
                                <span>UNCLAIMED RBX</span>
                                {unclaimedRbx} RBX
                            </Typography>
                        </div>
                    </Card>
                </GridItem>
                <GridItem xs={12} md={6}>
                    <Card className={classes.rightSideCard}>
                        <div>
                            <Typography className={classes.amountText} variant="h3">
                                <span>Amount Contributed:</span>0 BNB
                            </Typography>
                        </div>
                        <div>
                            <Typography className={classes.rightSideText} variant="h4">
                                <span>UNCLAIMED RBX</span> 0 RBX
                            </Typography>
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
            {ticketsSold > 0 && (
                <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                    <GridItem xs={12}>
                        <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                            Your contribution history
                        </Typography>

                        <div style={{ position: 'relative' }}>
                            <Loader loading={eventsLoading} />
                            {eventsTableData.length > 0 && !eventsLoading && (
                                <>
                                    <CustomTable data={eventsTableData} columns={columns} />
                                    <Card className={classes.historyCard}>
                                        <div className={classes.infoIcon}>
                                            <Tooltip
                                                title="You can claim this in case if lottery is succeed. Otherwise, you can refund 100% of your investment."
                                                placement="right-start"
                                            >
                                                <InfoIcon />
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Typography className={classes.amountText} variant="h3">
                                                <span>Amount Contributed:</span>
                                                {unclaimedRbx} RBX
                                            </Typography>
                                        </div>
                                        <div>
                                            <CustomButton
                                                style={{ marginRight: '10px' }}
                                                onClick={claimHandler}
                                                disabled={claimBtnDisabled || !isClaimable}
                                            >
                                                Claim
                                            </CustomButton>
                                            <CustomButton
                                                onClick={claimRewardHandler}
                                                disabled={claimRewardsBtnDisabled || !isClaimable}
                                            >
                                                Claim Reward
                                            </CustomButton>
                                        </div>
                                    </Card>
                                </>
                            )}
                        </div>
                    </GridItem>
                </GridContainer>
            )}
        </SectionWrapper>
    );
};

export default Contribute;

const useStyles = makeStyles((theme) => ({
    leftSideCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        minHeight: '100%',
        '& div p': {
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(14),
            },
        },
    },
    rightSideCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '100%' },
    rightSideText: { textAlign: 'right', fontWeight: 300, '& span': { fontSize: '50%', display: 'block' } },
    amountText: { '& span': { fontSize: '40%', display: 'block', fontWeight: 300 } },
    tableTitle: {
        fontWeight: 500,
        marginTop: '10px',
        [theme.breakpoints.up('lg')]: { fontSize: theme.typography.pxToRem(39), marginTop: '25px' },
    },
    historyCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        position: 'relative',
    },

    infoIcon: { position: 'absolute', right: '15px', top: '15px', cursor: 'pointer' },
}));
