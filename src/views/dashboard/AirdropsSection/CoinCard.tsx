import React from 'react';
import cx from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card';
import CustomButton from 'components/CustomButton';

interface CoinCardProps {
    title: string;
    value: string;
    difficultyLevel: number;
    reward: string;
}

const CoinCard: React.FC<CoinCardProps> = ({ title, value, difficultyLevel, reward }) => {
    const classes = useStyles();
    return (
        <Card className={classes.coinCard}>
            <span className={classes.cardValue}>{value}</span>
            <Typography className={classes.title} variant="h4" gutterBottom>
                {title}
            </Typography>
            <Typography className={classes.difficultyLevelText} gutterBottom variant="subtitle1">
                Difficulty Level
            </Typography>
            <div className={classes.difficultyLevelWrapper}>
                {[1, 2, 3].map((v) => (
                    <span
                        key={v}
                        className={cx(classes.difficultyLevel, { [classes.activeLevel]: v <= difficultyLevel })}
                    />
                ))}
            </div>

            <Typography className={classes.reward} variant="body1" gutterBottom>
                PRIZE: <br /> <span>{reward}</span>
            </Typography>

            <CustomButton className={classes.learnMoreBtn} size="large" disabled={true}>
                Learn More
            </CustomButton>
        </Card>
    );
};

export default CoinCard;

const useStyles = makeStyles((theme) => ({
    coinCard: {
        background: 'linear-gradient(135deg, hsla(265, 100%, 17%, 1) 0%, hsla(233, 96%, 20%, 1) 100%)',
        padding: '50px 15px',
        position: 'relative',
        [theme.breakpoints.up('lg')]: {
            padding: '50px 15px',
        },
    },
    cardValue: {
        padding: '2px 5px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.black,
        fontFamily: 't26-carbon, monospace',
        borderRadius: '5px',
        display: 'inline-block',
        textAlign: 'center',
        position: 'absolute',
        right: '15px',
        top: '15px',
        minWidth: '50px',
        fontSize: theme.typography.pxToRem(18),
        [theme.breakpoints.up('lg')]: {
            right: '30px',
            top: '30px',
            minWidth: '90px',
            fontSize: theme.typography.pxToRem(14),
        },
    },
    title: {
        marginBottom: '5px',
        color: theme.palette.common.white,
        fontFamily: 't26-carbon, monospace',
        fontSize: theme.typography.pxToRem(25),
        [theme.breakpoints.up('lg')]: {
            marginBottom: '20px',
            fontSize: theme.typography.pxToRem(29),
        },
    },
    difficultyLevelText: {
        fontWeight: 300,
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.common.white,
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(24),
        },
    },
    difficultyLevelWrapper: {},
    difficultyLevel: {
        height: '12px',
        width: '12px',
        marginRight: '7px',
        borderRadius: '50%',
        display: 'inline-block',
        backgroundColor: '#fff',
        [theme.breakpoints.up('lg')]: {
            height: '16px',
            width: '16px',
            marginRight: '10px',
        },
    },
    activeLevel: { backgroundColor: '#240b4c' },
    reward: {
        marginTop: '15px',
        fontWeight: 300,
        lineHeight: 1.2,
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.common.white,
        fontFamily: 't26-carbon, monospace',
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(12),
        },
        '& span': {
            fontWeight: 600,
            fontSize: theme.typography.pxToRem(30),
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(17),
            },
        },
    },
    learnMoreBtn: {
        fontWeight: 500,
        textTransform: 'capitalize',
        color: theme.palette.common.white,
        background: '#fff',
        borderRadius: '12px',
        marginTop: '15px',
        fontSize: theme.typography.pxToRem(16),
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(14),
        },
    },
}));
