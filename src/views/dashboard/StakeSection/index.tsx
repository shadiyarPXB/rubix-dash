import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { GridContainer, GridItem } from 'components/Gird';
import SectionWrapper from 'components/SectionWrapper';
import StakeHeader from 'views/dashboard/StakeSection/StakeHeader';
import StakingCard from 'views/dashboard/StakeSection/StakingCard';
import InfoCard from 'components/InfoCard';
import fixedNumber from 'utils/fixedNumber';
import useContract from 'hooks/useContract';
import CustomTable from 'components/CustomTable';
import toast from 'utils/toast';
import Button from '@material-ui/core/Button';
import abis from 'rubix/abi';
import stringShortener from 'utils/stringShortener';
import CustomButton from 'components/CustomButton';
import Loader from 'components/Loader';
import bannerBg from './bg2.svg';
import Card from 'components/Card';

interface StakeSectionProps {
    id?: string;
    subscribedPool?: number;
    activePool?: number;
}

const StakeSection: React.FC<StakeSectionProps> = ({ id }) => {
    const { web3, web3React, contract: rubixTokenContract } = useContract('rubixToken');
    const { contract: stakingContract } = useContract('staking');
    const [availableRbx, setAvailableRbx] = useState<number>(0);
    const [balance, setBalance] = useState<number | string>('Loading');
    const [Poolbalance, setPoolBalance] = useState<string>('Loading');
    const [activePool, setActivePool] = useState(null);
    const [fundedBalance, setFundedBalance] = useState(null);
    const [allowance, setAllowance] = useState<number>(0);
    const [flexStakingValue, setFlexStakingValue] = useState('');
    const [flexStakingBtnLoading, setFlexStakingBtnLoading] = useState(false);
    const [selectedFlexDay, setSelectedFlexDay] = useState('49');
    const [depositEventsData, setDepositEventsData] = useState(null);
    const [withdrawEventsData, setWithdrawEventsData] = useState(null);
    const [depositEventsLoading, setDepositEventsLoading] = useState(true);
    const [withdrawEventsLoading, setWithdrawEventsLoading] = useState(true);
    const [tabValue, setTabValue] = useState('Deposit');
    const fromBlock_ = 9806233;
    const loop_ = Math.ceil((web3React.blockNumber - fromBlock_) / 599);
    // @ts-ignore
    const isLgUpScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const handleTabChange: (e: MouseEvent, value: string) => void = (event, newValue) => {
        setTabValue(newValue);
    };
    const isApprovable = allowance < Number(web3?.utils.toWei(flexStakingValue || '0'));

    const flexDayClickHandler: (e: React.SyntheticEvent) => void = (e) => {
        // @ts-ignore
        setSelectedFlexDay(e.currentTarget.value);
    };
    const flexMaxBtnClickHandler: (e: React.SyntheticEvent) => void = () => {
        setFlexStakingValue(availableRbx < 4500 ? availableRbx.toString() : '4500');
    };

    const init: () => void = async () => {
        setBalance('Loading');
        try {
            const [rbx, bnb, allowance] = await Promise.all([
                rubixTokenContract.methods.balanceOf(web3React.account).call(),
                web3.eth.getBalance(web3React.account),
                rubixTokenContract.methods.allowance(web3React.account, abis.staking.address).call(),
            ]);
            setAllowance(allowance);
            setAvailableRbx(+fixedNumber(web3.utils.fromWei(rbx, 'ether')));
            setBalance(
                `${fixedNumber(web3.utils.fromWei(rbx, 'ether'))} RBX | ${fixedNumber(
                    web3.utils.fromWei(bnb, 'ether'),
                )} BNB `,
            );
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const pBalance: () => void = async () => {
        setPoolBalance('Loading');
        try {
            const [rbx] = await Promise.all([stakingContract.methods.getTotalStakedValue().call()]);
            setPoolBalance(`${fixedNumber(web3.utils.fromWei(rbx, 'ether'))} RBX / ${fixedNumber(700000)} RBX`);
            const activePool = await stakingContract.methods._poolId().call();
            setActivePool(activePool);
            const fundedBalance = await stakingContract.methods.pData(activePool).call();
            setFundedBalance(
                `${fixedNumber(web3.utils.fromWei(fundedBalance.rbxFunded2, 'ether'))} RBX | ${fixedNumber(
                    web3.utils.fromWei(fundedBalance.bnbFunded2, 'ether'),
                )} BNB`,
            );
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const flexStakingHandler: () => void = async () => {
        setFlexStakingBtnLoading(true);

        if (isApprovable) {
            rubixTokenContract.methods
                .increaseAllowance(abis.staking.address, web3?.utils.toWei('9999999'))
                .send({ from: web3React.account })
                .once('confirmation', function (confirmationNumber, receipt) {
                    const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                    toast(
                        <>
                            Your transaction is confirmed! <a href={link}>TxID</a>
                        </>,
                        null,
                    );
                    setFlexStakingBtnLoading(false);
                })
                .once('error', function () {
                    toast('Error! Please try sending again with higher gas fees', 'error');
                    setFlexStakingBtnLoading(false);
                });
        } else {
            stakingContract.methods
                .deposit(web3?.utils.toWei(flexStakingValue || '0'), 86400 * +selectedFlexDay)
                .send({ from: web3React.account })
                .once('confirmation', function (confirmationNumber, receipt) {
                    const link = `https://bscscan.com/tx/${receipt.transactionHash}`;
                    toast(
                        <>
                            Your transaction is confirmed! <a href={link}>TxID</a>
                        </>,
                        null,
                    );
                    setFlexStakingBtnLoading(false);
                })
                .once('error', function () {
                    toast('Error! Please try sending again with higher gas fees', 'error');
                    setFlexStakingBtnLoading(false);
                });
        }
    };

    const claimHandler: (e: React.SyntheticEvent) => void = async (e) => {
        //    TODO: Have to disabled after clicking the button
        await stakingContract.methods
            // @ts-ignore
            .withdraw(e.currentTarget.value)
            .send({ from: web3React.account })
            .once('transactionHash', function (hash) {
                // toast(`Transactions is submitted...
                //     https://bscscan.com/tx/${hash}`);
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
                );
                // setClaimBtnDisabled(false);
            })
            .once('error', function () {
                toast('Error! Please try sending again with higher gas fees', 'error');
                // setClaimBtnDisabled(false);
            });
    };

    const depositColumns = React.useMemo(
        () => [
            {
                Header: 'TxId',
                accessor: 'transactionHash',
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Staked Value',
                accessor: 'stakedValue',
            },
            {
                Header: 'Unclaimed RBX',
                accessor: 'unclaimedReward',
            },
            {
                Header: 'Subscribed Pool',
                accessor: 'subscribedPool',
            },
            {
                Header: 'Share of the pool',
                accessor: 'shareOfThePool',
            },
            {
                Header: 'Actions',
                accessor: 'actions',
            },
        ],
        [],
    );
    const withdrawColumns = React.useMemo(
        () => [
            {
                Header: 'TxId',
                accessor: 'transactionHash',
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'RBX',
                accessor: 'RBX',
            },
            {
                Header: 'wBNB',
                accessor: 'wBNB',
            },
        ],
        [],
    );

    const classes = useStyles();
    const getDepositEventsData: () => void = async () => {
        setDepositEventsLoading(true);
        try {
            const sleep = (milliseconds) => {
                return new Promise((resolve) => setTimeout(resolve, milliseconds));
            };
            const fromBlock = 9806233;

            const loop = Math.ceil((web3React.blockNumber - fromBlock) / 599);
            console.log('loop', loop);
            let data = [];
            for (let i = 0; i < loop; i++) {
                console.log('loop2', i);
                const currentFromBlock = fromBlock + i * 599;

                const res = await stakingContract.getPastEvents('staked', {
                    filter: { account: web3React.account },
                    fromBlock: currentFromBlock,
                    toBlock: currentFromBlock + 599,
                });
                console.log('data', res);
                console.log('fromBlock', currentFromBlock);

                data = [...data, ...res];
            }

            const dataEl = await Promise.all(
                data.map(async (event) => {
                    const unclaimedReward = await stakingContract.methods
                        .getUnclaimedBalance(event.returnValues.ID)
                        .call()
                        .catch(() => 0);

                    const isClaimable = await stakingContract.methods
                        .isClaimed(event.returnValues.ID)
                        .call()
                        .catch(() => ({ 0: true }));

                    const subscribedPool = await stakingContract.methods.iData(event.returnValues.ID).call();

                    return {
                        transactionHash: stringShortener(event.transactionHash),
                        id: event.returnValues.ID,
                        ticketTo: event.returnValues[3],
                        stakedValue: web3.utils.fromWei(event.returnValues.amount) + ' RBX',
                        unclaimedReward: parseFloat(web3.utils.fromWei(unclaimedReward)).toFixed(6) + ' RBX',
                        subscribedPool: parseFloat(subscribedPool[4]),
                        shareOfThePool: (parseFloat(subscribedPool[3]) / 1e12) * 100 + '%',

                        actions:
                            isClaimable[0] === false ? (
                                <CustomButton
                                    className={classes.tableActionBtn}
                                    value={event.returnValues.ID}
                                    onClick={claimHandler}
                                    size="small"
                                >
                                    Redeem
                                </CustomButton>
                            ) : (
                                ''
                            ),
                    };
                }),
            );
            if (web3React.active) {
                setDepositEventsData(dataEl);
            }
            // } catch (error) {
            //     toast(
            //         'Wrong RPC Network Detected!',
            //         <Button color={'primary'} size="small" href="https://docs.rubix.onl">
            //             Quick Fix
            //         </Button>,
            //         'error',
            //     );
        } finally {
            setDepositEventsLoading(false);
        }
    };
    const getWithdrawEventsData: () => void = async () => {
        setWithdrawEventsLoading(true);
        try {
            const sleep = (milliseconds) => {
                return new Promise((resolve) => setTimeout(resolve, milliseconds));
            };
            const fromBlock = 9806233;
            const loop = Math.ceil((web3React.blockNumber - fromBlock) / 4999);

            let data = [];
            for (let i = 0; i < loop; i++) {
                await sleep(600000);
                const currentFromBlock = fromBlock + i * 4999;
                const res = await stakingContract.getPastEvents('claimed', {
                    filter: { account: web3React.account },
                    fromBlock: web3React.blockNumber - 4000,
                    toBlock: web3React.blockNumber + 4000,
                });

                data = [...data, ...res];
            }

            const dataEl = data.map((event) => {
                return {
                    transactionHash: stringShortener(event.transactionHash),
                    id: event.returnValues.ID,
                    RBX: parseFloat(web3.utils.fromWei(event.returnValues.RBX)).toFixed(6),
                    wBNB: parseFloat(web3.utils.fromWei(event.returnValues.wBNB)).toFixed(6),
                    stakedValue: web3.utils.fromWei(event.returnValues.amount) + ' RBX',
                };
            });

            if (web3React.active) {
                setWithdrawEventsData(dataEl);
            }
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        } finally {
            setWithdrawEventsLoading(false);
        }
    };

    const isRun = useRef(false);
    useEffect(() => {
        if (web3React.blockNumber && !isRun.current) {
            isRun.current = true;
            getDepositEventsData();
            getWithdrawEventsData();
        }
    }, [web3React.blockNumber]);

    useEffect(() => {
        if (web3React.active && web3) {
            init();
            pBalance();
        } else {
            setBalance('');
            setDepositEventsData(null);
            setWithdrawEventsData(null);
        }
    }, [web3React.account]);

    return (
        <SectionWrapper id={id}>
            <StakeHeader />
            {/* <GridContainer>
                <GridItem xs={12}>
                    <Card className={classes.banner} />
                </GridItem>
            </GridContainer> */}
            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} lg={6}>
                    <InfoCard
                        className={classes.info}
                        logo="/rubix_logo.svg"
                        text="Earn loyalty rewards for simply staking RBX tokens!"
                    />
                </GridItem>
            </GridContainer>
            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} lg={6}>
                    <StakingCard
                        bordered
                        heading="Flexible Staking"
                        title="STAKE"
                        titleSpan=" RBX"
                        availableRbx={balance}
                        TextFieldProps={{
                            onChange: (e) => setFlexStakingValue(e.target.value),
                            color: 'secondary',
                            value: flexStakingValue,
                            type: 'number',
                            placeholder: '0 RBX',
                            error: +flexStakingValue > 4500,
                            helperText: '0-4500 RBX',
                        }}
                        maxButtonProps={{ onClick: flexMaxBtnClickHandler }}
                        submitButtonTitle={isApprovable ? 'APPROVE' : 'SEND'}
                        submitButtonProps={{
                            onClick: flexStakingHandler,
                            disabled: flexStakingBtnLoading || !web3React.account || +flexStakingValue > 4500,
                            loading: flexStakingBtnLoading,
                        }}
                        periodButtons={[
                            { title: '14 Days', value: '14', selected: '14' === selectedFlexDay },
                            { title: '28 Days', value: '28', selected: '28' === selectedFlexDay },
                            { title: '49 Days', value: '49', selected: '49' === selectedFlexDay },
                        ]}
                        periodButtonsProps={{ onClick: flexDayClickHandler }}
                        earnPercentage=">15"
                        poolSize={Poolbalance}
                        // earnLogo="rubix_bnb_logo.svg"
                    />
                </GridItem>
                <GridItem xs={12} lg={6}>
                    <Card className={classes.banner} />
                </GridItem>
                <GridItem xs={12} lg={6}>
                    <Card className={classes.leftSideCard}>
                        <div>
                            <Typography variant="h6" className={classes.leftSideText}>
                                <span>ACTIVE POOL:</span>
                                {activePool}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.rightSideText}>
                                <span>
                                    <strong>LOYALTY REWARDS:</strong>
                                </span>
                                {fundedBalance}
                            </Typography>
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer className={classes.historyArea}>
                <GridItem xs={12}>
                    <Typography className={classes.tableTitle} variant="h4" gutterBottom style={{ marginTop: '30px' }}>
                        HISTORY
                    </Typography>
                </GridItem>
                <GridItem xs={12}>
                    {depositEventsLoading == true && (
                        <Typography className={classes.HistoryLoader}>
                            👾 Indexing {loop_ * 650} blocks...{' '}
                            <strong> (~ {(loop_ * 0.678).toFixed(1)} seconds)</strong>
                        </Typography>
                    )}
                </GridItem>
            </GridContainer>
            {depositEventsData?.length > 0 && (
                <GridContainer>
                    <GridItem xs={12}>
                        <TabContext value={tabValue}>
                            <div className={classes.tablistWrapper}>
                                <div>Filter Events:</div>

                                <TabList
                                    // @ts-ignore
                                    onChange={handleTabChange}
                                >
                                    <Tab
                                        classes={{ selected: classes.selectedTabButton }}
                                        className={classes.tabButton}
                                        label="DEPOSIT"
                                        value="Deposit"
                                    />
                                    <Tab
                                        classes={{ selected: classes.selectedTabButton }}
                                        className={classes.tabButton}
                                        label="REDEEM"
                                        value="Withdraw"
                                    />
                                </TabList>
                            </div>
                            <TabPanel className={classes.tabPanel} value="Deposit">
                                <div
                                    style={{
                                        position: 'relative',
                                        height: depositEventsLoading ? '100px' : 'auto',
                                    }}
                                >
                                    <Loader loading={depositEventsLoading} />
                                    {depositEventsData && depositEventsData.length > 0 && !depositEventsLoading && (
                                        <CustomTable data={depositEventsData} columns={depositColumns} />
                                    )}
                                    {depositEventsData && depositEventsData.length < 1 && !depositEventsLoading && (
                                        <Typography className={classes.noEvents} variant="body2" gutterBottom>
                                            You have no deposits yet
                                        </Typography>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel className={classes.tabPanel} value="Withdraw">
                                <div
                                    style={{
                                        position: 'relative',
                                        height: withdrawEventsLoading ? '100px' : 'auto',
                                    }}
                                >
                                    <Loader loading={withdrawEventsLoading} />
                                    {withdrawEventsData && withdrawEventsData.length > 0 && !withdrawEventsLoading && (
                                        <CustomTable data={withdrawEventsData} columns={withdrawColumns} />
                                    )}
                                    {withdrawEventsData && withdrawEventsData.length < 1 && !withdrawEventsLoading && (
                                        <Typography className={classes.noEvents} variant="h4" gutterBottom>
                                            You have no withdraws yet
                                        </Typography>
                                    )}
                                </div>
                            </TabPanel>
                        </TabContext>
                    </GridItem>
                </GridContainer>
            )}
        </SectionWrapper>
    );
};

export default StakeSection;

const useStyles = makeStyles((theme) => ({
    sectionBg: {
        background: 'linear-gradient(135deg, hsla(290, 100%, 88%, 1) 0%, hsla(337, 100%, 79%, 1) 100%)',
        borderRadius: '20px',
        BackgroundOpacity: '599%',
    },
    leftSideCard: {
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '0.2px solid #6c64ac',
        borderColor: theme.palette.primary.main,
        padding: '10px 20px',
        //   marginTop: '5px',
        minHeight: '100%',
        '& div p': {
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(14),
            },
        },
    },
    secondaryCard: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '400px',
    },
    leftSideText: {
        color: '#fff',
        textAlign: 'left',
        fontWeight: 300,
        fontFamily: 't26-carbon, monospace',
        '& span': { fontSize: '50%', display: 'block' },
    },
    rightSideText: {
        color: '#0bce7a',
        textAlign: 'right',
        fontWeight: 300,
        fontFamily: 't26-carbon, monospace',
        '& span': { fontSize: '50%', display: 'block', color: '#fff' },
    },
    banner: {
        height: '360px',
        marginBottom: '20px',
        background: `url(${bannerBg}) no-repeat center center`,
        backgroundSize: 'cover',
    },
    info: { marginBottom: '5px' },
    tablistWrapper: {
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 4999,
        fontSize: theme.typography.pxToRem(16),
        fontFamily: 'roc-grotesk, sans-serif',
        color: '#fff',

        '& >div': { marginRight: '10px' },
        '& .MuiTabs-root': { minHeight: 'auto' },
        '& .MuiTabs-indicator': { display: 'none' },
        '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
            margin: '-3px',
            [theme.breakpoints.up('sm')]: { margin: '-5px' },
        },
    },

    HistoryLoader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '3px',
        background: '#6c63ac',
        color: '#fff',
        borderColor: theme.palette.primary.main,
        padding: '10px 10px',
        marginTop: '5px',
        minHeight: '100%',
        fontSize: theme.typography.pxToRem(16),
        fontWeight: 100,
        fontFamily: 't26-carbon, monospace',
    },
    historyArea: {
        marginTop: '50px',
    },

    tabButton: {
        textTransform: 'capitalize',
        background: '#32275b',
        fontFamily: 't26-carbon, monospace',
        color: '#fff',
        minHeight: 'auto',
        minWidth: 'auto',
        padding: '4px 8px',
        margin: '3px',
        borderRadius: '2px',
        opacity: 1,
        fontWeight: 4999,
        fontSize: theme.typography.pxToRem(12),
        [theme.breakpoints.up('sm')]: { padding: '4px 15px', margin: '5px', fontSize: theme.typography.pxToRem(14) },
    },
    selectedTabButton: { background: '#5b4c93', color: '#fff' },
    tabPanel: { padding: 0 },
    latestWinnerCard: { marginBottom: '30px' },
    tableTitle: {
        fontFamily: 't26-carbon, monospace',
        fontWeight: 100,
        color: '#fff',
        [theme.breakpoints.up('lg')]: { fontSize: theme.typography.pxToRem(39), color: '#fff' },
    },
    noEvents: {
        fontWeight: 4999,
        color: '#fff',
        fontFamily: 't26-carbon, monospace',
        [theme.breakpoints.up('lg')]: { fontSize: theme.typography.pxToRem(25) },
    },
    tableActionBtn: {
        fontSize: theme.typography.pxToRem(599),
        fontWeight: 700,
    },
}));
