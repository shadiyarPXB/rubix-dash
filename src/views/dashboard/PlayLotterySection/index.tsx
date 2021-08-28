/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
// import Hidden from '@material-ui/core/Hidden';
// import Tab from '@material-ui/core/Tab';
// import TabContext from '@material-ui/lab/TabContext';
// import TabList from '@material-ui/lab/TabList';
// import TabPanel from '@material-ui/lab/TabPanel';
import abis from 'rubix/abi';
import Button from '@material-ui/core/Button';
import CustomButton from 'components/CustomButton';
import Card from 'components/Card';
import PaddingSectionWrapper from 'components/PaddingSectionWrapper';
import SectionHeader from 'components/SectionHeader';
import { GridContainer, GridItem } from 'components/Gird';
// import PlayLotteryCard from 'views/dashboard/PlayLotterySection/PlayLotteryCard';
import LatestWinnerCard from 'views/dashboard/PlayLotterySection/LatestWinnerCard';
import PlayLotteryCardShortTerm from 'views/dashboard/PlayLotterySection/PlayLotteryCardShortTerm';
import CustomTable from 'components/CustomTable';
import InfoCard from 'components/InfoCard';
import Countdown from 'react-countdown';
import bannerBg from './bg2.svg';
import fixedNumber from 'utils/fixedNumber';
import useContract from 'hooks/useContract';
import toast from 'utils/toast';

interface PlayLotterySectionProps {
    id?: string;
}

interface Event {
    ticketId: number;
    roundId: string;
    luckyNumbers: string;
}
const PlayLotterySection: React.FC<PlayLotterySectionProps> = ({ id }) => {
    // const [value, setValue] = React.useState('shortTerm');
    const { web3, web3React, contract: rubixTokenContract } = useContract('rubixToken');
    const { contract: lotteryContract } = useContract('lottery');

    const [availableRbx, setAvailableRbx] = useState<number | string>('Loading');
    const [lotteryPoolLoading, setLotteryPoolLoading] = useState(true);
    const [lotteryPool, setLotteryPool] = useState(true);
    const [events, setEvents] = useState<null | Event[]>(null);
    const [eventsLoading, setEventsLoading] = useState<boolean>(true);
    const [winingNumbers, setWiningNumbers] = useState('...');
    const [userBalance, setUserBalance] = useState(null);
    const [allowance, setAllowance] = useState<number>(0);
    const [lotteryInfo, setLotteryInfo] = useState<any>(null);
    const fromBlock_ = 10135646;
    const loop_ = Math.ceil((web3React.blockNumber - fromBlock_) / 4999);

    // @ts-ignore
    const isLgUpScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    // const handleChange: (e: MouseEvent, value: string) => void = (event, newValue) => {
    //     setValue(newValue);
    // };

    const columns = React.useMemo(
        () => [
            {
                Header: 'TICKET ID',
                accessor: 'ticketId',
            },
            {
                Header: 'Round ID',
                accessor: 'roundId',
            },
            {
                Header: 'Lucky Numbers',
                accessor: 'luckyNumbers',
            },
        ],
        [],
    );

    const claimHandler: (e: React.SyntheticEvent) => void = async (e) => {
        //    TODO: Have to disabled after clicking the button
        await lotteryContract.methods
            // @ts-ignore
            .claim()
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
                //   toast(
                //         'Wrong RPC Network Detected!',
                //         <Button color={'primary'} size="small" href="https://docs.rubix.onl">
                //             Quick Fix
                //         </Button>,
                //         'error',
                //     );
                // setClaimBtnDisabled(false);
            });
    };

    const getLotteryPool: () => Promise<void> = async () => {
        try {
            setLotteryPoolLoading(true);
            const res = await lotteryContract.methods.getFullPot().call();

            setLotteryPool(res);
            setLotteryPoolLoading(false);
        } catch (error) {
            setLotteryPoolLoading(false);
        }
    };
    const getAllowance: () => Promise<void> = async () => {
        try {
            const res = await rubixTokenContract.methods.allowance(web3React.account, abis.lottery.address).call();

            setAllowance(res);
        } catch (error) {
            console.log(error);
        }
    };

    const getBalance: () => void = async () => {
        try {
            setAvailableRbx('Loading');
            const [rbx, bnb] = await Promise.all([
                rubixTokenContract.methods.balanceOf(web3React.account).call(),
                web3.eth.getBalance(web3React.account),
            ]);

            setAvailableRbx(
                `${fixedNumber(web3.utils.fromWei(rbx, 'ether'))} RBX || ${fixedNumber(
                    web3.utils.fromWei(bnb, 'ether'),
                )} BNB `,
            );
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
            setAvailableRbx('');
        }
    };
    const getLuckyNumbers = async (ticketId: number): Promise<string> => {
        try {
            const res = await lotteryContract.methods.getTicketData(ticketId).call();
            return res.LuckyNumbers.toString();
        } catch (error) {
            return '';
        }
    };

    const getEvents: () => Promise<void> = async () => {
        setEventsLoading(true);
        try {
            const sleep = (milliseconds) => {
                return new Promise((resolve) => setTimeout(resolve, milliseconds));
            };
            const fromBlock = 10135646;
            const loop = Math.ceil((web3React.blockNumber - fromBlock) / 4999);
            let eventsWithDiscount = [];
            for (let i = 0; i < loop; i++) {
                await sleep(100);
                const currentFromBlock = fromBlock + i * 4999;
                const res = await lotteryContract.getPastEvents('BuyTicketsWithDiscount', {
                    filter: { player: web3React.account },
                    fromBlock: currentFromBlock,
                    toBlock: currentFromBlock + 4999,
                });
                eventsWithDiscount = [...eventsWithDiscount, ...res];
            }

            let eventsWithOutDiscount = [];
            for (let i = 0; i < loop; i++) {
                await sleep(100);
                const currentFromBlock = fromBlock + i * 4999;
                const res = await lotteryContract.getPastEvents('BuyTicketsWithoutDiscount', {
                    filter: { player: web3React.account },
                    fromBlock: currentFromBlock,
                    toBlock: currentFromBlock + 4999,
                });
                eventsWithOutDiscount = [...eventsWithOutDiscount, ...res];
            }

            const combinedEvents = [...eventsWithDiscount, ...eventsWithOutDiscount];
            const events: Event[] = [];

            for (let evIndex = 0; evIndex < combinedEvents.length; evIndex++) {
                const event = combinedEvents[evIndex];

                const roundId = event.returnValues.roundID;
                const fromNumber = parseInt(event.returnValues._fromNumber);
                const toNumber = parseInt(event.returnValues._toNmber);

                if (toNumber - fromNumber > 0) {
                    for (let index = fromNumber; index <= toNumber; index++) {
                        const luckyNumbers = await getLuckyNumbers(index);
                        events.push({
                            ticketId: index,
                            roundId,
                            luckyNumbers,
                        });
                    }
                } else {
                    const luckyNumbers = await getLuckyNumbers(fromNumber);
                    events.push({
                        ticketId: fromNumber,
                        roundId,
                        luckyNumbers,
                    });
                }
            }
            setEvents(events);
        } catch (error) {
            toast(
                'Wrong RPC Network Detected!',
                <Button color={'primary'} size="small" href="https://docs.rubix.onl">
                    Quick Fix
                </Button>,
                'error',
            );
        } finally {
            setEventsLoading(false);
        }
    };

    const getWiningNumbers = async (): Promise<void> => {
        setWiningNumbers('....');
        try {
            const activePool = await lotteryContract.methods.getActivePool().call();
            const res = await lotteryContract.methods.getWinningNumbers(activePool).call();
            setWiningNumbers(Object.values(res).toString());
        } catch (error) {
            setWiningNumbers('Error');
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const getUserBalance = async (): Promise<void> => {
        try {
            const res = await lotteryContract.methods._balanceOf(web3React.account).call();
            setUserBalance(res);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const getLotteryInfo: () => Promise<void> = async () => {
        try {
            const activePool = await lotteryContract.methods.getActivePool().call();
            const res = await lotteryContract.methods.getlotteryInfo(activePool).call();

            setLotteryInfo(res);
        } catch (error) {
            console.log(error);
        }
    };

    const isRun = useRef(false);
    useEffect(() => {
        if (web3React.blockNumber && !isRun.current) {
            isRun.current = true;
            getEvents();
        }
    }, [web3React.blockNumber]);

    useEffect(() => {
        if (web3React.active && web3) {
            getWiningNumbers();
            getBalance();
            getEvents();
            getLotteryInfo();
            getUserBalance();
            getLotteryPool();
            getAllowance();
        } else {
            setAvailableRbx('');
            setWiningNumbers('...');
            setEvents(null);
            setLotteryInfo(null);
            setUserBalance(null);
            setLotteryInfo(null);
        }
    }, [web3React.account]);
    const classes = useStyles();
    return (
        <PaddingSectionWrapper id={id} className={classes.sectionBg}>
            <GridContainer>
                <GridItem xs={12}>
                    <Typography className={classes.titleColor} variant="h4" component="h2">
                        🤑 Rubix Lottery
                    </Typography>
                    <Typography variant="body2" className={classes.textLottery}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum minus ducimus animi
                        eaque, voluptatibus neque fugit est? Voluptatum quos, veniam voluptas unde vel magni at officia
                        nulla repellendus. Id.
                    </Typography>
                </GridItem>
            </GridContainer>
            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} lg={6}>
                    <InfoCard
                        className={classes.info}
                        logo="/rubix_logo.svg"
                        text="Save up to 50% when with RBX tokens!"
                    />
                </GridItem>
                <GridItem xs={12} lg={6}>
                    <InfoCard
                        className={classes.infoLink}
                        logo="/chainlink-link-logo.svg"
                        text="Powered with Chainlink Provable Random Number Generator."
                    />
                </GridItem>
            </GridContainer>
            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} lg={6}>
                    <PlayLotteryCardShortTerm availableRbx={availableRbx} getEvents={getEvents} />
                </GridItem>
                <GridItem xs={12} lg={6}>
                    <Card className={classes.banner} />
                </GridItem>
                <GridItem xs={12}>
                    <LatestWinnerCard
                        // @ts-ignore
                        //   className={classes.leftSideCard}
                        // @ts-ignore
                        winingNumbers={winingNumbers}
                        countdownTimer={
                            lotteryInfo?.deadLine ? (
                                <Countdown date={new Date(lotteryInfo?.deadLine * 1000)} intervalDelay={1000} />
                            ) : (
                                '00:00:00:00'
                            )
                        }
                    />
                </GridItem>
                {/* <GridItem xs={12} lg={6}>
                    <Card className={classes.leftSideCard}>
                        <div>
                            <Typography variant="h6" className={classes.leftSideText}>
                                <span>UNCLAIMED PRIZES:</span>
                                {userBalance ? web3.utils.fromWei((+userBalance?._RBX).toString()) + ' RBX' : ''} |{' '}
                                {userBalance ? web3.utils.fromWei((+userBalance?.BNB).toString()) + ' BNB' : ''}
                            </Typography>
                        </div>
                        <div>
                            <CustomButton size="large" bold color="black" onClick={claimHandler}>
                                CLAIM
                            </CustomButton>
                        </div>
                    </Card>
                </GridItem> */}
            </GridContainer>
            <GridContainer className={classes.historyArea}>
                <GridItem xs={12}>
                    {eventsLoading == true && (
                        <Typography className={classes.HistoryLoader}>
                            👾 Syncing {loop_ * 4999} blocks... <strong> (~ {loop_ * 3.4} seconds)</strong>
                        </Typography>
                    )}
                    {events?.length == 0 && eventsLoading == false && (
                        <Typography className={classes.HistoryLoader}>No tickets found😥</Typography>
                    )}
                </GridItem>
            </GridContainer>
            {events?.length > 0 && (
                <GridContainer className={classes.historyArea}>
                    <GridItem xs={12}>
                        {/* <TabContext value={value}>  
                <div className={classes.tablistWrapper}>
                            <div>Filter:</div>
                            <TabList onChange={handleChange}>
                                <Tab
                                    classes={{ selected: classes.selectedTabButton }}
                                    className={classes.tabButton}
                                    label="Short term"
                                    value="shortTerm"
                                />
                                <Tab
                                    classes={{ selected: classes.selectedTabButton }}
                                    className={classes.tabButton}
                                    label="Mid term"
                                    value="midTerm"
                                />
                                <Tab
                                    classes={{ selected: classes.selectedTabButton }}
                                    className={classes.tabButton}
                                    label="Long term"
                                    value="longTerm"
                                />
                                <Tab
                                    classes={{ selected: classes.selectedTabButton }}
                                    className={classes.tabButton}
                                    label="S. long term"
                                    value="S.LongTerm"
                                />
                            </TabList>
                        </div> */}

                        {/* <TabPanel className={classes.tabPanel} value="shortTerm"> */}

                        <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                            Your tickets
                        </Typography>
                        {events && <CustomTable data={events} columns={columns} />}
                        {events?.length < 0 && <Typography>No transitions yet</Typography>}
                        {eventsLoading && <Typography>Loading events data</Typography>}
                        {/* </TabPanel>  
                      <TabPanel className={classes.tabPanel} value="midTerm">
                            <LatestWinnerCard className={classes.latestWinnerCard} value1="0 RBX" value2="0 BNB" />
                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                             <CustomTable data={tableData} columns={columns} />  
                            <Typography>No transitions yet</Typography>
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value="longTerm">
                            <LatestWinnerCard className={classes.latestWinnerCard} value1="0 RBX" value2="0 BNB" />

                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                             <CustomTable data={tableData} columns={columns} />  
                            <Typography>No transitions yet</Typography>
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value="S.LongTerm">
                            <LatestWinnerCard className={classes.latestWinnerCard} value1="0 RBX" value2="0 BNB" />
                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                            <CustomTable data={tableData} columns={columns} />  
                            <Typography>No transitions yet</Typography>
                        </TabPanel>  
                   </TabContext> */}
                    </GridItem>
                </GridContainer>
            )}
        </PaddingSectionWrapper>
    );
};

export default PlayLotterySection;

const useStyles = makeStyles((theme) => ({
    sectionBg: {
        background: '#fff',
        borderRadius: '20px',
    },
    titleColor: {
        color: '#000',
    },
    textLottery: {
        marginBottom: '15px',
        color: '#000',
    },
    banner: {
        height: '440px',
        marginBottom: '20px',
        background: `url(${bannerBg}) no-repeat center center`,
        border: '1px solid #000',
        backgroundSize: 'cover',
    },
    // bannerText: {
    //     fontWeight: 700,
    //     fontSize: theme.typography.pxToRem(40),
    //     lineHeight: 1,
    //     textAlign: 'center',
    //     color: 'white',
    //     display: 'inline',
    //     background: '#000',
    //     '& div p': {
    //         [theme.breakpoints.down('xs')]: {
    //             fontSize: theme.typography.pxToRem(14),
    //         },
    //     },
    // },
    leftSideCard: {
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        // padding: '10px 20px',
        marginTop: '5px',
        minHeight: '100%',
        '& div p': {
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(14),
            },
        },
    },
    leftSideText: { textAlign: 'left', fontWeight: 300, '& span': { fontSize: '50%', display: 'block' } },
    // rightSideText: { textAlign: 'right', fontWeight: 300, '& span': { fontSize: '50%', display: 'block' } },
    info: { marginBottom: '20px' },
    infoLink: { marginBottom: '20px', background: '#070707 !important' },
    historyArea: {
        marginTop: '50px',
    },

    HistoryLoader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '3px',
        background: '#6c63ac',
        color: '#fff',
        padding: '10px 10px',
        marginTop: '5px',
        minHeight: '100%',
        fontSize: theme.typography.pxToRem(16),
        fontWeight: 100,
        fontFamily: 't26-carbon, monospace',
    },
    guideText: {
        padding: '13px',
    },
    tablistWrapper: {
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(20),
        fontFamily: 'roc-grotesk, sans-serif',
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(14),
        },
        '& >div': { marginRight: '10px' },
        '& .MuiTabs-root': { minHeight: 'auto' },
        '& .MuiTabs-indicator': { display: 'none' },
        '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
            margin: '-3px',
            [theme.breakpoints.up('sm')]: { margin: '-5px' },
        },
    },

    tabButton: {
        textTransform: 'capitalize',
        background: theme.palette.primary.main,
        color: '#fff',
        minHeight: 'auto',
        minWidth: 'auto',
        padding: '4px 8px',
        margin: '3px',
        borderRadius: '7px',
        opacity: 1,
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(8),
        [theme.breakpoints.up('sm')]: { padding: '4px 15px', margin: '5px', fontSize: theme.typography.pxToRem(10) },
    },
    selectedTabButton: { background: '#5329a7' },
    tabPanel: { padding: 0 },
    latestWinnerCard: { marginBottom: '20px' },
    tableTitle: { fontWeight: 700, [theme.breakpoints.up('lg')]: { fontSize: theme.typography.pxToRem(29) } },
}));
