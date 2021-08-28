import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import SectionHeader from 'components/SectionHeader';
import SectionWrapper from 'components/SectionWrapper';
import { GridContainer, GridItem } from 'components/Gird';
import Card from 'components/Card';
import TextField from '@material-ui/core/TextField';
import CustomButton from 'components/CustomButton';

interface ReferralBonusProps {
    id?: string;
}

const ReferralBonus: React.FC<ReferralBonusProps> = ({ id }) => {
    // @ts-ignore
    const isLgUpScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const classes = useStyles();
    return (
        <SectionWrapper id={id} className={classes.referralSection}>
            <SectionHeader title="Referral bonus" subTitle="Earn bonuses for referring friends." />

            <GridContainer spacing={isLgUpScreen ? 6 : 2}>
                <GridItem xs={12} lg={6}>
                    <Card>
                        <Typography variant="h5">Create referral</Typography>
                        <Typography variant="body1">
                            Rubix referral program lets whitelisted contributors invite up to 3 users and instantly earn
                            5% from their contribution. To invite to the whitelist, you need to provide a wallet address
                            that your referee will use for the contribution. Referral bonus will be credited instantly
                            after the referee&apos;s contribution.
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                className={classes.fromTextfield}
                                placeholder="wallet address"
                                variant="outlined"
                            />
                            <CustomButton size="large" color="primary" type="submit" disabled={true}>
                                Submit
                            </CustomButton>
                        </form>
                    </Card>
                </GridItem>
                <GridItem xs={12} lg={6}>
                    <Card>
                        <Typography variant="h5">Bonus earned</Typography>
                        <div className={classes.bonusContentWrapper}>
                            <div>
                                <Typography className={classes.bonusEarnedText} variant="h5">
                                    <span>Total referrals used:</span> 0 <span>Bonus Earned:</span>{' '}
                                </Typography>
                                <Typography variant="h5" color="secondary" style={{ fontWeight: 400 }}>
                                    0 RBX
                                </Typography>
                            </div>
                            <div
                                style={{
                                    marginRight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    flexGrow: 1,
                                }}
                            >
                                <img src="/rubix_logo(Dark).svg" alt="Rubix" />
                            </div>
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
        </SectionWrapper>
    );
};

export default ReferralBonus;

const useStyles = makeStyles((theme) => ({
    referralSection: {
        [theme.breakpoints.up('md')]: {
            paddingTop: 0,
        },
    },
    form: { display: 'flex', marginTop: '10px' },
    fromTextfield: { flexGrow: 1, marginRight: '15px' },
    bonusContentWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        '& div:first-child': {
            marginRight: '50px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        '& img': { width: '180px', height: 'auto' },
    },
    bonusEarnedText: {
        lineHeight: 1.7,
        fontWeight: 400,
        '& span': { display: 'block', fontSize: '60%', color: theme.palette.grey[600] },
    },
}));
