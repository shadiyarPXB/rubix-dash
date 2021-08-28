/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Card from 'components/Card';
import Loader from 'components/Loader';

const MarketDataTable: React.FC = () => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMarketData: () => void = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h',
            );
            const { image, current_price, price_change_percentage_24h, symbol } = data[0];
            setMarketData([
                {
                    name: { logo: image, title: symbol, subTitle: 'Rubix' },
                    price: current_price,
                    apy: 'N/A',
                    change: price_change_percentage_24h,
                },
                {
                    name: { logo: '/rubix_logo.svg', title: 'RBX', subTitle: 'Rubix' },
                    price: 0.15,
                    apy: '>15%',
                    change: 0.0,
                },
            ]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // toast('Some error occurred. Please try again later...', 'error');
        }
    };

    useEffect(() => {
        fetchMarketData();
    }, []);
    const classes = useStyles();
    return (
        <Card className={classes.tableHead}>
            <div style={{ overflowX: 'auto', position: 'relative', minHeight: '100px' }}>
                {/* <Typography className={classes.title} variant="h5" gutterBottom>
                    Market Data
                </Typography> */}
                <Loader loading={loading} />
                {!loading && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={cx(classes.tableHeadCell, classes.tableCell)}>
                                    Asset name
                                </TableCell>
                                <TableCell className={cx(classes.tableHeadCell, classes.tableCell)}>Price</TableCell>
                                <TableCell className={cx(classes.tableHeadCell, classes.tableCell)}>APY</TableCell>
                                <TableCell className={cx(classes.tableHeadCell, classes.tableCell)}>
                                    Change (24H)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {marketData.map(({ name, price, apy, change }) => (
                                <TableRow key={name.title}>
                                    <TableCell className={classes.tableCell}>
                                        <Box display="flex" alignItems="center">
                                            <Box display="flex" alignItems="center" mr={2}>
                                                <img src={name.logo} alt={name.title} height="50px" width="auto" />
                                            </Box>
                                            <Box display="flex" alignItems="center" flexDirection="column">
                                                <Typography
                                                    className={classes.nameTitle}
                                                    variant="h6"
                                                    style={{ textTransform: 'uppercase' }}
                                                >
                                                    {name.title}
                                                </Typography>
                                                <Typography
                                                    className={classes.nameSubTitle}
                                                    variant="subtitle2"
                                                    component="small"
                                                >
                                                    {name.subTitle}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>$ {price}</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {typeof apy === 'string' ? apy : apy + '%'}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        <strong
                                            className={cx(classes.changeBlock, {
                                                [classes.positiveBlock]: change >= 0,
                                                [classes.negativeBlock]: change < 0,
                                            })}
                                        >
                                            {change.toFixed(2)}%
                                        </strong>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </Card>
    );
};

export default MarketDataTable;

const useStyles = makeStyles((theme) => ({
    title: { fontWeight: 700 },
    tableCell: {
        color: '#fff',
        border: 'none',
        fontWeight: 700,
        '&:last-child': { textAlign: 'center' },
    },

    tableHead: {
        background: 'linear-gradient(90deg, hsla(205, 46%, 30%, 1) 0%, hsla(260, 29%, 36%, 1) 100%)',
        borderRadius: '20px',
        border: '1 px solid',
        borderColor: '#fff',
        //boxShadow: ' 6px 6px 12px #0a0a0a, -6px -6px 12px #121212',
    },

    tableHeadCell: {
        color: '#fff',
        fontSize: theme.typography.pxToRem(15),
        fontFamily: 'roc-grotesk, sans-serif',
    },
    nameTitle: { fontWeight: 700, lineHeight: 1, color: '#fff' },
    nameSubTitle: { fontWeight: 300, color: '#fff' },
    changeBlock: {
        display: 'inline-block',
        padding: '3px 20px',
    },
    positiveBlock: { backgroundColor: '#12ee9633', color: '#12ff7d' },
    negativeBlock: { backgroundColor: '#fd003715', color: '#ff1250' },
}));
