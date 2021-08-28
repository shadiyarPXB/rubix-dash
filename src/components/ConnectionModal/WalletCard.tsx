import React from 'react';
import { Box, Text } from 'rimble-ui';

import CustomButton from 'components/CustomButton';

interface WalletCardProps {
    logo: string;
    title: string;
    onClick: (e: React.MouseEvent) => void;
}
const WalletCard: React.FC<WalletCardProps> = ({ logo, title, onClick }) => {
    return (
        <Box
            border="0px solid #ffb4a2"
            boxShadow="8px 8px 34px #cfc6c5, -8px -8px 34px #ffffff"
            p="3"
            width={['calc(100% - 20px)', 'calc(100% - 20px)', 'calc(50% - 20px)']}
            borderRadius="16px"
            textAlign="center"
            m="10px"
            bg="#fff5f3"
        >
            <Box
                height="70px"
                width="70px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                border="0px solid #ffcdb2"
                borderRadius="50%"
                mb="10px"
            >
                <Box as="img" src={logo} alt="walletLink" maxHeight="60%" maxWidth="60%" />
            </Box>
            <Text.p m="0" mb="10px" fontWeight="600">
                {title}
            </Text.p>
            <CustomButton size="large" bold color="blue" onClick={onClick}>
                Connect
            </CustomButton>
        </Box>
    );
};

export default WalletCard;
