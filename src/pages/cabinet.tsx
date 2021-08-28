import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DashboardLayout from 'layouts/DashboardLayout';
import { TransactionSection, Home } from 'views/cabinet';

const menuItems = [
    { href: 'home', icon: <HomeIcon /> },
    { href: 'transaction', icon: '/rubix_logo.svg' },
];

const CabinetPage: React.FC = () => {
    return (
        <DashboardLayout menuItems={menuItems}>
            <Home id="home" />
            <TransactionSection id="transaction" />
        </DashboardLayout>
    );
};

export default CabinetPage;
