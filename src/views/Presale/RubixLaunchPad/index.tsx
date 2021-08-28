/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SectionHeader from 'components/SectionHeader';
import SectionWrapper from 'components/SectionWrapper';
import CustomProgress from 'components/CustomProgress';
import MultiProgressBar from 'components/CustomProgress/MultiProgressBar';
import { GridContainer, GridItem } from 'components/Gird';
import Card from 'components/Card';
import Countdown from 'react-countdown';
import useContract from 'hooks/useContract';
import toast from 'utils/toast';

interface RubixLaunchPadProps {
    id?: string;
}

const RubixLaunchPad: React.FC<RubixLaunchPadProps> = ({ id }) => {
    const { web3, web3React, contract: presaleLotteryContract } = useContract('presaleLottery');
    const [ticketsSold, setTicketsSold] = useState(0);
    const [marketData, setMarketData] = useState(0);

    const getTicketSold: () => void = async () => {
        try {
            const res = await presaleLotteryContract.methods.getLotteryData().call();
            setTicketsSold(res.TicketsSold);
        } catch (error) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    const fetchMarketData: () => void = async () => {
        try {
            const { data } = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h',
            );
            setMarketData(data[0].current_price);
        } catch (err) {
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    useEffect(() => {
        fetchMarketData();
    }, []);

    useEffect(() => {
        if (web3React.active && web3) {
            getTicketSold();
        }
    }, [web3React.account]);

    const classes = useStyles();
    return (
        <SectionWrapper id={id}>
            {/* <SectionHeader title="Refundable Lottery Coin Offering" /> */}
            <GridContainer spacing={6} justify="space-between">
                {/* Left side */}
                <GridItem xs={12} lg={8}>
                    <Typography className={classes.title} variant="h6">
                        Refundable RBX token Offering
                    </Typography>

                    <Typography className={classes.title} variant="h3">
                        Welcome to RBX <strong style={{ display: 'block' }}>Launchpad!</strong>
                    </Typography>
                    <Typography className={classes.subtitle}>
                        <span>
                            <Countdown date={new Date('2021-08-27T00:00:00.000+06:00')} />
                        </span>{' '}
                        til refundable lottery ends.
                    </Typography>
                    <div className={classes.note}>
                        <InfoOutlinedIcon className={classes.noteIcon} />
                        <Typography>
                            <strong>Note:</strong> Whitelisted RBX offering will begin when more then 2,500 tickets are
                            sold. I.e when lottery target is reached. {/* <a href="">Read more</a> */}
                        </Typography>
                    </div>
                </GridItem>
                <GridItem xs={12} lg={4}>
                    <Card>
                        <Typography className={classes.presaleTitle} variant="h5">
                            {(ticketsSold * 0.032).toFixed(2)} BNB
                        </Typography>
                        <Typography variant="subtitle2">
                            {(marketData * ticketsSold * 0.032).toFixed(2)}$ Committed
                        </Typography>
                        <Typography variant="subtitle2">
                            {(ticketsSold * 0.032).toFixed(4)} BNB | {480 - ticketsSold * 0.032} BNB ({' '}
                            {((ticketsSold / 15000) * 100).toFixed(4)}% )
                        </Typography>
                        <MultiProgressBar
                            progresses={[
                                { color: '#f72585', value: (ticketsSold / 15000) * 100, title: 'Tickets sold' },
                                { color: '#3d405b', value: 25, title: 'Soft Goal' },
                            ]}
                            borderRadius="8px"
                            bg="#fec5bb"
                            height="30px"
                        />
                        <Typography className={classes.presaleInfo} variant="subtitle2">
                            Initially allocated for lottery:<strong> 1,005,000 RBX</strong>
                        </Typography>
                        <Typography className={classes.presaleSell} variant="h5">
                            {ticketsSold * 67} RBX <span>SOLD</span>
                        </Typography>
                    </Card>
                </GridItem>
                <GridItem xs={12}>
                    <Card>
                        <Typography variant="h4" style={{ fontWeight: 300 }}>
                            Total Committed
                            <strong style={{ display: 'block', marginBottom: '5px' }}>{ticketsSold * 67} RBX</strong>
                        </Typography>
                        <CustomProgress className={classes.circulatingProgress} value={1} variant="determinate" />
                    </Card>
                </GridItem>
            </GridContainer>
        </SectionWrapper>
    );
};

export default RubixLaunchPad;

const useStyles = makeStyles((theme) => ({
    title: { fontWeight: 300, lineHeight: 1.1, color: '#fff', '& strong': { fontWeight: 700 } },
    subtitle: {
        fontWeight: 300,
        lineHeight: 1.1,
        color: '#fff',
        '& span': { fontWeight: 100, fontFamily: 't26-carbon, monospace' },
    },
    note: {
        backgroundColor: theme.palette.info.main,
        border: '1px solid #FED3C8',
        padding: '10px',
        paddingLeft: '5px',
        display: 'flex',
        borderRadius: '5px',
        alignItems: 'center',
        marginTop: '20px',
        [theme.breakpoints.up('md')]: {
            padding: '10px',
            paddingLeft: '10px',
        },
        '& a': {
            display: 'inline-block',
            color: '#6301FF',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
        },
    },
    noteIcon: { marginRight: '5px' },
    presaleTitle: { fontWeight: 400 },
    presaleInfo: {
        fontSize: '12px',
        marginTop: '3px',
    },
    presaleSell: {
        color: '#606060',
        // textAlign: 'right',
        marginTop: '20px',
        '& span': { display: 'block', fontWeight: 300, fontSize: '60%' },
    },
    circulatingProgress: { height: '50px' },
}));
