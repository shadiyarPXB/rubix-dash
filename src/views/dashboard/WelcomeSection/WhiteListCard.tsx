import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Card from 'components/Card';
import CustomButton from 'components/CustomButton';
import bg from './bg1.jpg';

const WhiteListCard: React.FC = () => {
    const classes = useStyles();
    return (
        <Card className={classes.whiteListCard}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={12} xl={6}>
                    <Typography className={classes.title} variant="h6" gutterBottom>
                        Join RBX Whitelisted presale Round 1.
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Join our fast growing ecosystem!
                    </Typography>
                    <form action="" className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Input className={classes.cardInput} fullWidth placeholder="Enter your text" />
                            </Grid>
                            <Grid item>
                                <CustomButton className={classes.formSubmit}>Request</CustomButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Hidden only={['xs', 'sm', 'lg']}>
                    <Grid container spacing={2} item xs={12} md={6} lg={12} xl={6}>
                        <Grid item xs={6}>
                            <Card className={classes.cardBox} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={cx(classes.cardBox, classes.cardBoxBlue)} />
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Card>
    );
};

export default WhiteListCard;

const useStyles = makeStyles((theme) => ({
    whiteListCard: {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        color: theme.palette.common.white,
        marginBottom: '25px',
    },
    title: { fontWeight: 600 },
    cardBox: { height: '150px', width: '100%', background: theme.palette.common.white },
    cardBoxBlue: { background: theme.palette.secondary.main },
    form: {
        marginTop: '10px',
    },

    cardInput: {
        background: theme.palette.common.white,
        padding: '1px 15px',
        '&::before,&::after': { display: 'none' },
    },
    formSubmit: { textTransform: 'capitalize' },
}));
