import React, { useState } from 'react';
import { animateScroll, Link } from 'react-scroll';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cx from 'classnames';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Header from 'widgets/Header';
import Footer from 'widgets/Footer';
import CustomButton from 'components/CustomButton';

interface MenuItem {
    icon: React.ReactNode | string;
    href: string;
}
interface DashboardLayoutProps {
    menuItems?: MenuItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ menuItems, children }) => {
    const [isActive, setIsActive] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false);

    useScrollPosition(
        ({ currPos }) => {
            if (currPos.y < -500) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        },
        [isActive],
    );

    const handleScrollToTopBtnClick = () => {
        animateScroll.scrollToTop();
    };
    const handleMenuClick = () => {
        setIsMenuActive(!isMenuActive);
    };
    const classes = useStyles();
    return (
        <div className={classes.dashboardWrapper}>
            <Hidden smDown>
                {menuItems?.length > 0 && (
                    <div className={cx(classes.menu, { [classes.menuActive]: isMenuActive })}>
                        <CustomButton className={classes.hamburgerButton} onClick={handleMenuClick}>
                            <MenuIcon className={classes.hamburgerButtonIcon} />
                        </CustomButton>
                        <div className={classes.menuInner}>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    className={classes.menuItem}
                                    to={item.href}
                                    smooth
                                    activeClass="active"
                                    spy
                                    duration={500}
                                    offset={-300}
                                >
                                    {typeof item.icon === 'string' ? (
                                        <img className={classes.iconImage} src={item.icon} alt={item.href} />
                                    ) : (
                                        // @ts-ignore
                                        React.cloneElement(item.icon, { className: classes.menuIcon })
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Hidden>
            {/* <div>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>XS</Hidden>
                <Hidden only={['xs', 'md', 'lg', 'xl']}>SM</Hidden>
                <Hidden only={['xs', 'sm', 'lg', 'xl']}>MD</Hidden>
                <Hidden only={['xs', 'sm', 'md', 'xl']}>LG</Hidden>
                <Hidden only={['xs', 'sm', 'md', 'lg']}>XL</Hidden>
            </div> */}
            <Header />
            <div className={classes.dashboardContent}>{children}</div>
            <Footer />
            <CustomButton
                className={cx(classes.scrollToTop, { [classes.scrollToTopActive]: isActive })}
                onClick={handleScrollToTopBtnClick}
                color="primary"
            >
                <ArrowUpwardIcon className={classes.scrollIcon} />
            </CustomButton>
        </div>
    );
};

export default DashboardLayout;

const useStyles = makeStyles((theme) => ({
    menu: {
        position: 'fixed',
        top: '30%',
        left: 0,
        zIndex: 1299,
        transform: 'translateX(-100%)',
        transition: '0.3s',
        [theme.breakpoints.up('md')]: {
            top: '60%',
            transform: 'translateY(-50%)',
        },
        [theme.breakpoints.up('lg')]: {
            left: 'calc(50% - 730px)',
        },
        [theme.breakpoints.up('xl')]: {
            left: 'calc(50% - 837px)',
        },
    },
    menuActive: {
        [theme.breakpoints.down('md')]: {
            transform: 'translateX(0)',
        },
    },
    menuInner: {
        overflowY: 'auto',
        maxHeight: '100vh',
        backgroundColor: 'transparent',
        borderRadius: '0 0 5px 0',
        padding: '0 10px',
        // boxShadow: '5px 5px 10px #f0f1f5, -5px -5px 10px #fafbff',
        [theme.breakpoints.up('md')]: { borderRadius: '10px' },
    },
    hamburgerButton: {
        height: 60,
        width: 60,
        position: 'absolute',
        right: 0,
        minWidth: 'auto',
        top: 0,
        transform: 'translateX(100%)',
        background: '#fff',
        color: '#000',

        // boxShadow:
        //     '-1px 2px 1px -2px rgb(0 0 0 / 20%), 1px 0px 0px 0px rgb(0 0 0 / 14%), 3px 0px 5px 0px rgb(0 0 0 / 12%)',
        borderRadius: '0 5px 5px 0',
        cursor: 'pointer',
        transition: '0.3s',

        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            boxShadow: 'none',
        },
        [theme.breakpoints.up('md')]: { display: 'none' },
    },
    hamburgerButtonIcon: {
        fontSize: '40px',
    },
    menuItem: {
        display: 'flex',
        height: 60,
        width: 60,
        background: 'linear-gradient(90deg, hsla(197, 41%, 7%, 1) 0%, hsla(252, 64%, 8%, 1) 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
        borderRadius: 5,
        color: '#fff',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': { background: theme.palette.secondary.main, color: theme.palette.common.white },
        '&.active': {
            background: theme.palette.primary.main,
            color: '#6c64ac',
        },
    },
    menuIcon: {
        fontSize: '30px',
    },
    iconImage: {
        maxHeight: '70%',
        maxWidth: '70%',
    },
    dashboardWrapper: {
        background: 'linear-gradient(90deg, hsla(197, 41%, 7%, 1) 0%, hsla(290, 50%, 2%, 1) 100%)',
        margin: '0 auto',
        width: '100%',

        overflow: 'hidden',
        [theme.breakpoints.up('md')]: {
            width: 'auto',
            padding: '0 20px',
        },
        [theme.breakpoints.up('lg')]: {
            width: 'auto',
        },
        [theme.breakpoints.up('xl')]: {
            width: 'auto',
        },
    },
    dashboardContent: {
        background: 'linear-gradient(90deg, hsla(200, 43%, 3%, 1) 0%, hsla(255, 40%, 4%, 1) 100%)',
        borderRadius: '30px',
        padding: '0 15px',

        [theme.breakpoints.up('md')]: {
            padding: '0 20px',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 45px',
        },
        [theme.breakpoints.up('xl')]: {
            padding: '0 90px',
        },
    },
    scrollToTop: {
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        height: '40px',
        width: '40px',
        minWidth: 'auto',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s, visibility 0.3s',
        [theme.breakpoints.up('md')]: {
            right: '30px',
            bottom: '30px',
            height: '40px',
            width: '40px',
        },
    },
    scrollToTopActive: { opacity: 1, visibility: 'visible' },
    scrollIcon: { fontSize: '30px', [theme.breakpoints.up('md')]: { fontSize: '50px' } },
}));
