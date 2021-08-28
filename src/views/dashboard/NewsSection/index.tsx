import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from 'views/dashboard/WelcomeSection/InfoCard';
import { GridContainer, GridItem } from 'components/Gird';
import PaddingSectionWrapper from 'components/PaddingSectionWrapper';
import SectionHeader from 'components/SectionHeader';

interface NewsSectionProps {
    id?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ id }) => {
    const classes = useStyles();
    return (
        <PaddingSectionWrapper className={classes.sectionBg} id={id}>
            <SectionHeader title="Latest from our blog" className={classes.sectionHeader} />
            <GridContainer spacing={3} alignItems="stretch" className={classes.infoCardsContainer}>
                <GridItem xs={12} md={4}>
                    <InfoCard
                        text={`Lottery: A total of <span>0</span> of prizes in RBX and BNB!`}
                        img="./bg1.jpg"
                        buttonLink="/"
                        buttonText="visit"
                    />
                </GridItem>

                <GridItem xs={12} md={4}>
                    <InfoCard
                        text="Get passive income with <span>high </span>APY from staking RBX!"
                        img="./bg2.jpg"
                        buttonLink="/"
                        buttonText="visit"
                    />
                </GridItem>
                <GridItem xs={12} md={4}>
                    <InfoCard
                        text="Contribute to a <span>refundable</span> Lottery presale from RBX Launchpad."
                        img="./bg1.jpg"
                        buttonLink="/"
                        buttonText="visit"
                    />
                </GridItem>
            </GridContainer>
        </PaddingSectionWrapper>
    );
};
export default NewsSection;

const useStyles = makeStyles((theme) => ({
    infoCardsContainer: { marginTop: '20px' },
    sectionHeader: {
        color: '#000',
        fontWeight: 700,
    },
    sectionBg: {
        background: 'linear-gradient(90deg, hsla(263, 42%, 65%, 1) 0%, hsla(319, 77%, 86%, 1) 100%)',
        borderRadius: '20px',
        BackgroundOpacity: '10%',
    },
}));
