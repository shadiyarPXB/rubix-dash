import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridContainer, GridItem } from 'components/Gird';
import SectionWrapper from 'components/SectionWrapper';
import SectionHeader from 'components/SectionHeader';
import Card from 'components/Card';
import CoinCard from 'views/dashboard/AirdropsSection/CoinCard';
import bannerBg from './bg1.jpg';

interface AirdropsSectionProps {
    id?: string;
}
const AirdropsSection: React.FC<AirdropsSectionProps> = ({ id }) => {
    const classes = useStyles();
    return (
        <SectionWrapper id={id}>
            <SectionHeader title="Earn crypto and NFTs" />
            <GridContainer>
                <GridItem xs={12}>
                    <Card className={classes.banner} />
                </GridItem>
            </GridContainer>
            <GridContainer spacing={5}>
                <GridItem xs={12} md={4}>
                    <CoinCard title="RUBIX(Closed)" value="$12" difficultyLevel={1} reward="80 RBX" />
                </GridItem>
            </GridContainer>
        </SectionWrapper>
    );
};

export default AirdropsSection;

const useStyles = makeStyles((theme) => ({
    banner: {
        height: '100px',
        marginBottom: '20px',
        background: `url(${bannerBg}) no-repeat center center`,
        backgroundSize: 'cover',
        [theme.breakpoints.up('sm')]: { height: '120px' },
        [theme.breakpoints.up('md')]: { height: '150px' },
        [theme.breakpoints.up('lg')]: { height: '180px' },
    },
}));
