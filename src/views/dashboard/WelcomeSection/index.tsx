/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import cx from 'classnames';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import SectionWrapper from 'components/SectionWrapper';
import CustomButton from 'components/CustomButton';
import { GridContainer, GridItem } from 'components/Gird';
import WelcomeHeader from 'views/dashboard/WelcomeSection/WelcomeHeader';
import SectionHeader from 'components/SectionHeader';
// import WhiteListCard from 'views/dashboard/WelcomeSection/WhiteListCard';
import bannerBg from './bg2.jpg';
import MarketDataTable from 'views/dashboard/WelcomeSection/MarketDataTable';
// import InfoCard from 'views/dashboard/WelcomeSection/InfoCard';
import Card from 'components/Card';
import useContract from 'hooks/useContract';
import toast from 'utils/toast';

const quickLink: { title: string; href: string }[] = [
    { title: 'Docs', href: 'https://docs.rubix.onl' },
    { title: 'Launchpad', href: '/presale' },
    { title: 'Telegram', href: 'https://t.me/rubix0x' },
    { title: 'RBX BSCscan', href: 'https://bscscan.com/token/0x3de1b7a29d28653a658d0bcf3befe981eeb8d1ba' },
];

interface WelcomeSectionProps {
    id?: string;
}
const WelcomeSection: React.FC<WelcomeSectionProps> = ({ id }) => {
    // @ts-ignore
    const isMdScreen = useMediaQuery((theme) => theme.breakpoints.only('md'));
    const { web3, web3React, contract: lotteryContract } = useContract('lottery');

    const [bnbPrice, setBnbPrice] = useState(0);
    const [lotteryInfo, setLotteryInfo] = useState<any>(null);
    const [lotteryInfoLoading, setLotteryInfoLoading] = useState(true);
    const [lotteryPoolLoading, setLotteryPoolLoading] = useState(true);
    const [lotteryPool, setLotteryPool] = useState<any>(null);
    const getLotteryInfo: () => Promise<void> = async () => {
        try {
            const res = await lotteryContract.methods.getlotteryInfo(0).call();

            setLotteryInfo(res);
        } catch (error) {}
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

    useEffect(() => {
        if (web3React.active) {
            getLotteryInfo();
            getLotteryPool();
        } else {
            setLotteryInfo(null);
            setLotteryPool(null);
        }
    }, [web3React.active, web3React.account]);

    const fetchMarketData: () => void = async () => {
        try {
            const { data } = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h',
            );
            setBnbPrice(data[0].current_price);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    useEffect(() => {
        fetchMarketData();
    }, []);
    const classes = useStyles();

    const jackpot = lotteryPoolLoading
        ? 'loading'
        : lotteryPool
        ? (((+lotteryPool?.BNB.toString() / 1e18) * bnbPrice + (lotteryPool?._RBX).toString()) / 1e18) * 0.15 + '$'
        : '0$';
    return (
        <SectionWrapper id={id}>
            <WelcomeHeader />
            <GridContainer spacing={6} justify="space-between">
                <GridItem xs={12} lg={8}>
                    <CustomButton className={classes.headingButtons}>Buy $RBX</CustomButton>
                    <CustomButton className={classes.headingButtons}>Play lottery</CustomButton>
                    <CustomButton className={classes.headingButtons}>Stake RBX</CustomButton>
                </GridItem>
            </GridContainer>

            <GridContainer spacing={6} justify="space-between">
                {/* Left side */}
                <Hidden smDown>
                    <GridItem xs={12} lg={8}>
                        {/* <WhiteListCard /> */}
                        <MarketDataTable />
                    </GridItem>
                </Hidden>
                {/* Right side */}
                <GridItem xs={12} lg={4} container spacing={isMdScreen ? 2 : 0}>
                    <Grid item xs={12} md={6} lg={12}>
                        <Card className={cx(classes.rubixCard, classes.mb10)}>
                            <Typography className={classes.rubixMetricsTitle} variant="h4" gutterBottom>
                                RBX Offering:
                            </Typography>
                            <Box display="flex" mb={1}>
                                <Box width="60%">
                                    <Typography className={classes.rubixText} variant="body1">
                                        RBX offered for sale:
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        className={cx(classes.rubixText, classes.rubixTextRight)}
                                        variant="body1"
                                    >
                                        10M RBX
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box width="60%">
                                    <Typography className={classes.rubixText} variant="body1">
                                        Total RBX sold:
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        className={cx(classes.rubixText, classes.rubixTextRight)}
                                        variant="body1"
                                    >
                                        0 RBX
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    {/* <Grid item xs={12} md={6} lg={12}>
                        <CustomButton
                            className={cx(classes.mb10, classes.downloadButton)}
                            startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
                            classes={{ startIcon: classes.downloadButtonIcon }}
                            fullWidth
                        >
                            Download Pitch Deck
                        </CustomButton>  
                    </Grid> */}
                    <Grid item xs={12} md={6} lg={12}>
                        <Box className={classes.mb10}>
                            <Typography className={classes.quickLinkTitle} variant="body1">
                                Quick navigation:
                            </Typography>
                            <Box mx="-5px">
                                {quickLink.map((link) => (
                                    <CustomButton
                                        className={classes.quickLink}
                                        href={link.href}
                                        key={link.title}
                                        color="white"
                                        square
                                        size="small"
                                    >
                                        {link.title}
                                    </CustomButton>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} className={classes.spacing}>
                    <Typography variant="h4" className={classes.presaleHeader}>
                        RBX Fundrising
                    </Typography>
                    <Typography variant="body1" className={classes.subtitle}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, aut dicta. Sunt quidem
                        reiciendis quas illo hic possimus nesciunt laboriosam expedita nobis, illum aut nostrum vero,
                        labore atque quibusdam nisi!
                    </Typography>
                    {/* <Typography variant="body1" className={classes.presaleText}>
                        ABOUT RBX PRESALE:
                    </Typography> */}
                    <Typography variant="body1" className={classes.subtitle}>
                        {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam possimus cum assumenda!
                        Praesentium voluptas adipisci excepturi eaque corrupti sequi, voluptates sed cupiditate
                        similique in perferendis! Ad adipisci rem alias blanditiis?
                        <br />
                        <br /> */}
                        <span>LIVE STATISTICS:</span>
                        <br />
                        RBX Sold: <span> 3829 RBX </span>
                        <br />
                        PancakeSwap Liquidity alloc.: <span> 10.01 BNB </span>
                    </Typography>

                    <Card className={classes.banner} />
                    <CustomButton size="large" bold color="blue">
                        Visit Launchpad
                    </CustomButton>
                </GridItem>
            </GridContainer>
        </SectionWrapper>
    );
};

export default WelcomeSection;

const useStyles = makeStyles((theme) => ({
    welcomeHeader: { marginBottom: '10px', color: theme.palette.common.white, fontFamily: 'lust-didone, serif' },
    spacing: {
        marginTop: theme.spacing(8),
    },
    headingButtons: {
        fontFamily: 't26-carbon, monospace',
        fontWeight: 100,
        background: 'linear-gradient(135deg, hsla(337, 100%, 96%, 1) 0%, hsla(336, 100%, 90%, 1) 100%)',
        borderRadius: '5px',
        marginRight: '10px',
    },
    presaleHeader: {
        marginTop: theme.spacing[5],
        color: '#fff',
        fontWeight: 600,
    },
    presaleText: {
        marginTop: theme.spacing[5],
        color: '#03ffec',
        fontFamily: 't26-carbon, monospace',
        fontSize: theme.typography.pxToRem(15),
    },
    subtitle: {
        marginBottom: '10px',
        color: '#fff',
        //fontFamily: 't26-carbon, monospace',
        lineHeight: 1.5,
        '& span': { fontFamily: 't26-carbon, monospace', fontSize: theme.typography.pxToRem(15), color: '#03ffec' },
    },
    banner: {
        height: '100px',
        marginBottom: '20px',
        background: `url(${bannerBg}) no-repeat center center`,
        backgroundSize: 'cover',
        [theme.breakpoints.up('sm')]: { height: '120px' },
        [theme.breakpoints.up('md')]: { height: '120px' },
        [theme.breakpoints.up('lg')]: { height: '180px' },
    },
    innerCard: {
        fontWeight: 400,
        color: theme.palette.common.white,
        marginTop: '180px',
        [theme.breakpoints.down('sm')]: { fontSize: theme.typography.pxToRem(20) },
        '& span': { color: theme.palette.secondary.main },
    },
    img: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        objectPosition: 'center',
        // borderRadius: 10,
    },
    infoCardsContainer: { marginTop: '20px' },
    rubixCard: { backgroundColor: theme.palette.info.main, borderRadius: '5px' },
    rubixMetricsTitle: {
        fontFamily: 't26-carbon, monospace',
        fontSize: theme.typography.pxToRem(20),
    },
    rubixText: {
        fontFamily: 't26-carbon, monospace',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.typography.pxToRem(14),
        },
    },
    rubixTextRight: { fontWeight: 700, fontFamily: 't26-carbon, monospace' },
    mb10: { marginBottom: '10px' },
    downloadButton: {
        fontSize: theme.typography.pxToRem(20),
        fontFamily: 't26-carbon, monospace',
        textTransform: 'capitalize',
        textAlign: 'left',
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        boxShadow: 'none',
        borderRadius: '10px',
        fontWeight: 400,
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(22),
        },
        '&:hover': { backgroundColor: theme.palette.common.white, color: theme.palette.secondary.main },
    },
    downloadButtonIcon: {
        color: theme.palette.secondary.main,
        '& svg': {
            fontSize: theme.typography.pxToRem(30) + ' !important',
        },
    },
    quickLinkTitle: { fontSize: theme.typography.pxToRem(20), marginTop: '15px', color: 'white' },
    quickLink: {
        margin: '5px',
        textTransform: 'capitalize',
        fontSize: theme.typography.pxToRem(20),
        fontFamily: 'lust-didone, serif',
        color: '#000',
        padding: '5px 10px',
        lineHeight: 1,
    },
}));
