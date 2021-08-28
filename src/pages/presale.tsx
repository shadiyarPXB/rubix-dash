import React from 'react';
import LaunchpadLayout from 'layouts/LaunchpadLayout';
import { RubixLaunchPad, Contribute, ReferralBonus } from 'views/Presale';
import Head from 'next/head';

const Presale: React.FC = () => {
    return (
        <LaunchpadLayout>
            <div>
                <Head>
                    <title>Initial refundable RBX token offering lottery(Stage 1)</title>
                    <meta property="og:title" content="Contribute to RBX presale." key="title" />
                </Head>
            </div>
            <RubixLaunchPad id="home" />
            <Contribute id="stake" />
            <ReferralBonus id="referral" />
        </LaunchpadLayout>
    );
};

export default Presale;
