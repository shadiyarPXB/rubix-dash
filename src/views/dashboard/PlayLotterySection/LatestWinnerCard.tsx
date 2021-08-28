import React from 'react';
import cx from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from 'components/Card';

interface LatestWinnerCardProps {
    winingNumbers?: string;
    countdownTimer?: string | React.ReactNode;
    className?: string;
}

const LatestWinnerCard: React.FC<LatestWinnerCardProps> = ({ className, winingNumbers, countdownTimer }) => {
    const classes = useStyles();
    return (
        <Card className={cx(classes.latestWinnerCard, { [className]: className })}>
            <Grid container spacing={5} justify="space-between" alignItems="center">
                <Grid item xs={8}>
                    <Typography className={classes.winnersTitle} variant="h3" gutterBottom>
                        Previous round Winning numbers:
                    </Typography>
                    <Typography className={classes.subtitle} variant="h3" gutterBottom>
                        Next round in: {countdownTimer}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.rightText}>
                    <Typography className={classes.title} variant="body1" gutterBottom>
                        {winingNumbers}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default LatestWinnerCard;

const useStyles = makeStyles((theme) => ({
    latestWinnerCard: {
        background: 'transparent',
        alignItems: 'center',
        border: '1px solid #000',
        borderRadius: '15px',
        // padding: '10px',
        //  [theme.breakpoints.up('lg')]: { padding: '15px 15px' },
    },
    winnersTitle: {
        fontSize: theme.typography.pxToRem(25),
        fontFamily: 't26-carbon, monospace',
        color: 'black',
        fontWeight: 500,
        [theme.breakpoints.up('xs')]: {
            fontSize: theme.typography.pxToRem(15),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(15),
        },
    },
    title: {
        fontSize: theme.typography.pxToRem(25),
        fontFamily: 't26-carbon, monospace',
        color: '#000',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(35),
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(35),
        },
    },
    subtitle: {
        fontSize: theme.typography.pxToRem(15),
        fontFamily: 't26-carbon, monospace',
        color: '#000',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(15),
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(15),
        },
    },
    rightText: { textAlign: 'right' },
    id: {
        color: theme.palette.grey[700],
        fontWeight: 200,
        fontSize: theme.typography.pxToRem(25),
        wordBreak: 'break-all',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(25),
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(25),
        },
    },
    mainText: {
        [theme.breakpoints.down('lg')]: {
            fontSize: theme.typography.pxToRem(30),
        },
        [theme.breakpoints.down('md')]: {
            fontSize: theme.typography.pxToRem(16),
        },
    },
}));
