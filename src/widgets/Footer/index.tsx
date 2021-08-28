import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import { GridItem } from 'components/Gird';

const footerLinks: { title: string; href: string }[] = [
    { title: 'Coingecko(Coming soon)', href: '/' },
    { title: 'Read the Docs', href: 'https://docs.rubix.onl' },
];
const socialLinks: { icon: React.ReactNode; href: string }[] = [
    { icon: <GitHubIcon />, href: 'https://github.com/Rubix-Project' },
    { icon: <TelegramIcon />, href: 'https://t.me/rubix0x' },
    { icon: <TwitterIcon />, href: 'https://twitter.com/rubix0x' },
];

const Footer: React.FC = () => {
    const classes = useStyles();
    return (
        <footer>
            <Grid className={classes.footerTop} container spacing={2} alignItems="center">
                <GridItem xs={12} md={6}>
                    <div className={classes.footerMenu}>
                        {footerLinks.map((link) => (
                            <a key={link.title} className={classes.footerMenuItem} href={link.href}>
                                {link.title}
                            </a>
                        ))}
                    </div>
                </GridItem>
                <GridItem xs={12} md={6}>
                    <div className={classes.socialLinks}>
                        {socialLinks.map((link) => (
                            <a key={link.href} className={classes.footerMenuItem} href={link.href}>
                                {/* @ts-ignore*/}
                                {React.cloneElement(link.icon, { className: classes.socialIcon })}
                            </a>
                        ))}
                    </div>
                </GridItem>
            </Grid>

            <div className={classes.footerBottom}>
                <Typography variant="subtitle1">&copy; {new Date().getFullYear()} Rubix</Typography>
            </div>
        </footer>
    );
};

export default Footer;

const useStyles = makeStyles((theme) => ({
    footerTop: { padding: '30px 0px' },
    footerMenu: {
        margin: '0 -10px',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    },
    footerMenuItem: {
        color: theme.palette.common.white,
        display: 'inline-block',
        transition: 'all 0.3s ease 0s',
        fontSize: theme.typography.pxToRem(12),
        margin: '0px 10px',
        textDecoration: 'none',

        '&:hover': { color: theme.palette.secondary.main },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(22),
        },
    },
    socialLinks: {
        margin: '0 -10px',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        },
    },
    socialLinkItem: {},
    socialIcon: {},
    footerBottom: {
        fontSize: theme.typography.pxToRem(12),
        borderTop: `1px solid ${theme.palette.grey[400]}`,
        padding: '7px 0px',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    },
}));
