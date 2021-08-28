import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Blockie } from 'rimble-ui';
import Typography from '@material-ui/core/Typography';
import { GridItem } from 'components/Gird';
import CustomButton from 'components/CustomButton';
import ConnectionModal from 'components/ConnectionModal';
import stringShortener from 'utils/stringShortener';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import useWeb3React from 'hooks/useWeb3React';

const Header: React.FC = () => {
    const { active, error, account, deactivate, blockNumber } = useWeb3React();
    const [isOpen, setIsOpen] = useState(false);
    // @ts-ignore
    const isSmDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const classes = useStyles();

    let connectionContent = null;

    if (error) {
        connectionContent = (
            <CustomButton
                // title={
                //     wallet.error instanceof ConnectionRejectedError
                //         ? 'Connection error: the user rejected the activation'
                //         : wallet.error.name
                // }
                size="large"
                color="red"
                onClick={() => deactivate()}
            >
                Wrong network detected!
            </CustomButton>
        );
    } else if (active) {
        connectionContent = (
            <div className={classes.userInfo}>
                <div className={classes.userInfoContents}>
                    <Typography gutterBottom variant="h6">
                        {!!account && stringShortener(account)}
                    </Typography>

                    <Typography
                        className={classes.logoutBtn}
                        variant="h6"
                        onClick={(e) => {
                            e.preventDefault();
                            deactivate();
                        }}
                    >
                        Log out
                    </Typography>
                    <Hidden xsDown>
                        <Typography
                            color="inherit"
                            component="a"
                            href={`http://bscscan.com/address/${account}`}
                            variant="h6"
                        >
                            View on BSCScan
                        </Typography>
                    </Hidden>
                </div>
                <div className={classes.blockie}>
                    <Blockie
                        opts={{
                            seed: account,
                            color: '#4408ff',
                            bgcolor: '#ff4343',
                            // size: 30,
                            // scale: 3,
                            spotcolor: '#fff',
                        }}
                    />
                </div>
            </div>
        );
    } else {
        connectionContent = (
            <CustomButton size="large" bold color="blue" onClick={() => setIsOpen(true)}>
                Connect wallet
            </CustomButton>
        );
    }

    return (
        <header className={classes.dashboardHeader}>
            <Grid container spacing={2} alignItems="center" justify="space-between">
                <GridItem>
                    <div className={classes.logoWrapper}>
                        <div className={classes.logo}>
                            <Link href="/">
                                <a>
                                    <img className={classes.logoImg} src="/rubix_logo.svg" alt="rubix" />
                                </a>
                            </Link>
                        </div>
                        <Hidden xsDown>
                            <Typography
                                className={classes.logoText}
                                variant="body2"
                                component="a"
                                href={`https://bscscan.com/block/${blockNumber}`}
                            >
                                {blockNumber}
                                <span className={classes.onlineIcon}></span>
                            </Typography>
                        </Hidden>
                    </div>
                </GridItem>
                <GridItem>
                    <Grid
                        className={classes.rightSideMenuContainer}
                        container
                        alignItems="center"
                        justify="flex-end"
                        spacing={isSmDown ? 1 : 4}
                    >
                        <Hidden mdDown>
                            <Grid item>
                                <Link href="/">
                                    <Typography className={classes.textMenu} component="a" href="/" variant="h6">
                                        <HomeIcon />
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Typography
                                    className={classes.textMenu}
                                    component="a"
                                    href="https://docs.rubix.onl"
                                    variant="h6"
                                >
                                    Docs
                                </Typography>
                            </Grid>
                            <Grid item>
                                <a href="https://t.me/rubix0x" className={classes.discordLogo}>
                                    <img className={classes.discordLogoImg} src="/telegramLogo.svg" alt="" />
                                </a>
                            </Grid>
                        </Hidden>
                        <Grid item>{connectionContent}</Grid>
                    </Grid>
                </GridItem>
            </Grid>
            <ConnectionModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
};

export default Header;

const useStyles = makeStyles((theme) => ({
    dashboardHeader: {
        padding: '20px 20px 30px 20px',
        [theme.breakpoints.up('md')]: {
            padding: '20px 4% 30px 4%',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '30px 4% 50px 4%',
        },
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',

        justifyContent: 'flex-start',
    },
    logo: {
        marginRight: '10px !important',
        [theme.breakpoints.up('md')]: {
            marginRight: '30px !important',
        },
    },
    logoImg: {
        height: '50px',
        width: '50px',
        [theme.breakpoints.up('md')]: {
            height: '80px',
            width: '80px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '60px',
            width: '60px',
        },
        [theme.breakpoints.up('xl')]: {
            height: '100px',
            width: '100px',
        },
    },
    logoText: {
        fontSize: theme.typography.pxToRem(14),
        color: '#fff',
        fontFamily: 't26-carbon, monospace',
        textDecoration: 'none',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(20),
        },

        '& span': { color: theme.palette.text.secondary },
    },
    onlineIcon: {
        height: '10px',
        width: '10px',
        backgroundColor: theme.palette.success.main,
        display: 'inline-block',
        marginLeft: 10,
        borderRadius: '50%',
    },
    rightSideMenuContainer: {
        justifyContent: 'flex-end',
    },

    textMenu: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.common.white,
        textDecoration: 'none',
        transition: theme.transitions.create(['color'], { duration: theme.transitions.duration.standard }),
        '&:hover': { color: theme.palette.text.secondary },
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(16),
        },
    },
    discordLogo: {
        height: '50px',
        width: '50px',
        backgroundColor: '#140630',
        borderRadius: '50%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            height: '50px',
            width: '50px',
        },
    },
    discordLogoImg: {
        width: 'auto',
        height: '90%',
        [theme.breakpoints.up('md')]: {
            height: '80%',
        },
        [theme.breakpoints.up('lg')]: {
            height: '70%',
        },
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
        textAlign: 'right',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
        },
    },
    userInfoContents: {
        marginRight: '10px',
        padding: '10px 0',
        '& h6,& a': {
            // fontSize: theme.typography.pxToRem(19),
            fontSize: theme.typography.pxToRem(13),
            lineHeight: 1,
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(14),
                lineHeight: 1.6,
            },
        },
        [theme.breakpoints.up('md')]: {
            marginRight: '20px',
        },
    },
    logoutBtn: {
        color: '#fff',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': { color: theme.palette.text.secondary },
    },

    blockie: {
        '& canvas': {
            borderRadius: '5px',
            height: '50px',
            width: '50px',
            [theme.breakpoints.up('md')]: {
                height: '60px',
                width: '60px',
            },
            [theme.breakpoints.up('lg')]: {
                height: '80px',
                width: '80px',
            },
        },
    },
}));
