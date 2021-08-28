import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GridContainer, GridItem } from 'components/Gird';
import SectionWrapper from 'components/SectionWrapper';
import Card from 'components/Card';
import CustomButton from 'components/CustomButton';

const helpLinks: { title: string; href: string }[] = [
    { title: 'Ask community', href: '/' },
    { title: 'Read the docs', href: '/' },
];

interface HomeSectionProps {
    id?: string;
}
const HomeSection: React.FC<HomeSectionProps> = ({ id }) => {
    const classes = useStyles();
    return (
        <SectionWrapper id={id}>
            <GridContainer>
                <GridItem xs={12} md={6}>
                    <Card className={classes.cards}>
                        <Typography variant="h4">Hello again, welcome to Rubix!</Typography>
                        <Typography variant="subtitle1">Start by staking your RBX or play lottery.</Typography>
                        <div>
                            <CustomButton className={classes.button} color="grey">
                                Button 1
                            </CustomButton>
                            <CustomButton className={classes.button} color="black">
                                Button 2
                            </CustomButton>
                        </div>
                    </Card>
                </GridItem>
                <GridItem xs={12} md={6}>
                    <Card className={classes.cards}>
                        <Typography className={classes.underlineTitle} variant="h4" gutterBottom>
                            Need help?
                        </Typography>
                        <div className={classes.helpLink}>
                            {helpLinks.map((link) => (
                                <Typography
                                    component="a"
                                    variant="body1"
                                    className={classes.helpLinkItem}
                                    key={link.title}
                                    href={link.href}
                                >
                                    {link.title}
                                </Typography>
                            ))}
                        </div>
                    </Card>
                </GridItem>
                <GridItem xs={12} md={6}>
                    <Card className={classes.cards}>
                        <Typography className={classes.underlineTitle} variant="h4" gutterBottom>
                            Account
                        </Typography>
                        <Typography variant="subtitle2">Connected as:</Typography>
                        <Typography variant="h4" gutterBottom>
                            0xde2....2e68
                        </Typography>
                        <Typography variant="subtitle2">Available Balance:</Typography>
                        <div className={classes.currencyWrapper}>
                            <Typography variant="h4">583,49 RBX</Typography>
                            <CustomButton className={classes.currencySwitchButton} color="black" size="small">
                                RBX
                            </CustomButton>
                            <CustomButton className={classes.currencySwitchButton} color="grey" size="small">
                                CT
                            </CustomButton>
                        </div>
                        <Typography variant="subtitle2">849,49 $</Typography>
                    </Card>
                </GridItem>
                <GridItem xs={12} md={6}>
                    <Card className={classes.cards}>
                        <div className={classes.listBox}>
                            <div className={classes.box}></div>

                            <div>
                                <Typography variant="h6" style={{ wordBreak: 'break-all' }}>
                                    Rubix Smart-contract address
                                </Typography>
                                <Typography variant="subtitle2" style={{ wordBreak: 'break-all' }}>
                                    0xB53e08B97724126Bda6d237B94F766c0b81C90fE
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.listBox}>
                            <div className={classes.box}></div>

                            <div>
                                <Typography variant="h6" style={{ wordBreak: 'break-all' }}>
                                    Connect Smart-contract address
                                </Typography>
                                <Typography variant="subtitle2" style={{ wordBreak: 'break-all' }}>
                                    0xB53e08B97724126Bda6d237B94F766c0b81C90fE
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
        </SectionWrapper>
    );
};

export default HomeSection;

const useStyles = makeStyles((theme) => ({
    cards: {
        [theme.breakpoints.up('md')]: { height: '100%' },
    },
    button: {
        marginTop: '20px',
        '&:not(:last-child)': {
            marginRight: '8px',
        },
    },
    underlineTitle: {
        position: 'relative',
        display: 'inline-block',
        // paddingBottom: '5px',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '0',
            height: '3px',
            width: '70%',
            backgroundColor: theme.palette.common.black,
        },
    },
    helpLink: {},
    helpLinkItem: {
        display: 'block',
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        fontSize: theme.typography.pxToRem(16),
        transition: '0.3s',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(20),
        },
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    currencyWrapper: { display: 'flex', alignItems: 'center' },
    currencySwitchButton: {
        fontSize: theme.typography.pxToRem(12),
        lineHeight: 1,
        marginLeft: '10px',
        marginTop: '-5px',
        fontWeight: 700,
    },
    listBox: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '&:not(:last-child)': { marginBottom: '15px' },
        '& div:first-child': { marginRight: '15px' },
        '& div:last-child': {
            marginLeft: 'auto',
            width: 'calc(100% - 95px)',
        },
    },
    box: {
        height: '80px',
        width: '80px',
        borderRadius: '5px',
        backgroundColor: theme.palette.grey[700],
    },
}));
