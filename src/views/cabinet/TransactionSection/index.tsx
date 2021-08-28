import React, { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import SectionWrapper from 'components/SectionWrapper';
import SectionHeader from 'components/SectionHeader';
import { GridContainer, GridItem } from 'components/Gird';
import LatestWinnerCard from 'views/dashboard/PlayLotterySection/LatestWinnerCard';
import CustomTable from 'components/CustomTable';

interface TransactionSectionProps {
    id?: string;
}

const TransactionSection: React.FC<TransactionSectionProps> = ({ id }) => {
    const [value, setValue] = React.useState('shortTerm');

    const handleChange: (e: MouseEvent, value: string) => void = (event, newValue) => {
        setValue(newValue);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'User',
                accessor: 'user',
            },
            {
                Header: 'Pool',
                accessor: 'pool',
            },
            {
                Header: 'Payout (BNB)',
                accessor: 'payoutBnb',
            },
            {
                Header: 'Payout (RBX)',
                accessor: 'payoutRbx',
            },
            {
                Header: 'Block number',
                accessor: 'blockNumber',
            },
        ],
        [],
    );
    const classes = useStyles();
    return (
        <SectionWrapper id={id}>
            <SectionHeader title="Your transaction history" />

            <GridContainer className={classes.historyArea}>
                <GridItem xs={12}>
                    <TabContext value={value}>
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
                        </div>

                        <TabPanel className={classes.tabPanel} value="shortTerm">
                            <LatestWinnerCard
                                className={classes.latestWinnerCard}
                                value1="0($0) RBX"
                                value2="0($0) BNB"
                            />
                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                            <CustomTable data={tableData} columns={columns} />
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value="midTerm">
                            <LatestWinnerCard
                                className={classes.latestWinnerCard}
                                value1="0($0) RBX"
                                value2="0($0) BNB"
                            />
                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                            <CustomTable data={tableData} columns={columns} />
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value="longTerm">
                            <LatestWinnerCard
                                className={classes.latestWinnerCard}
                                value1="0($0) RBX"
                                value2="0($0) BNB"
                            />

                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                            <CustomTable data={tableData} columns={columns} />
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value="S.LongTerm">
                            <LatestWinnerCard
                                className={classes.latestWinnerCard}
                                value1="0($0) RBX"
                                value2="0($0) BNB"
                            />
                            <Typography className={classes.tableTitle} variant="h4" gutterBottom>
                                Latest winners history
                            </Typography>
                            <CustomTable data={tableData} columns={columns} />
                        </TabPanel>
                    </TabContext>
                </GridItem>
            </GridContainer>
        </SectionWrapper>
    );
};

export default TransactionSection;

const useStyles = makeStyles((theme) => ({
    infos: {},
    historyArea: {
        marginTop: '50px',
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
    latestWinnerCard: { marginBottom: '30px' },
    tableTitle: { fontWeight: 500, [theme.breakpoints.up('lg')]: { fontSize: theme.typography.pxToRem(39) } },
}));

const tableData: { user: string; pool: string; payoutBnb: string; payoutRbx: string; blockNumber: string }[] = [
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
    {
        user: '0x1F397AB04ADAe82954fe363792cA09036F24F092',
        pool: '987',
        payoutBnb: '101.45 BNB',
        payoutRbx: '1,000 RBX',
        blockNumber: '11561564',
    },
];
