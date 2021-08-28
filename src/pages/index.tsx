import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import FlightLandIcon from '@material-ui/icons/FlightLand';
import DashboardLayout from 'layouts/DashboardLayout';
import { WelcomeSection, StakeSection, PlayLotterySection, AirdropsSection, NewsSection } from 'views/dashboard';
import Head from 'next/head';

const menuItems = [
    { href: 'home', icon: <HomeIcon /> },
    { href: 'stake', icon: '/Staking.svg' },
    { href: 'play', icon: '/Lottery.svg' },
    { href: 'air', icon: '/Earn.svg' },
];

const HomePage: React.FC = () => {
    return (
        <DashboardLayout menuItems={menuItems}>
            <div>
                <Head>
                    <title>Rubix token - Home</title>
                    <meta property="og:title" content="Welcome to Rubix!" key="title" />
                </Head>
            </div>
            <WelcomeSection id="home" />
            <StakeSection id="stake" />
            {/* <PlayLotterySection id="play" /> */}
            <AirdropsSection id="air" />
            <NewsSection id="news" />
        </DashboardLayout>
    );
};

export default HomePage;
