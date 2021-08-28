import React from 'react';
import cx from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Card from 'components/Card';
import CustomButton, { CustomButtonProps } from 'components/CustomButton';
// import Divider from '@material-ui/core/Divider';

interface PeriodButton {
    color?: string;
    title: string;
    value: string | number;
    className?: string;
}

interface PlayLotteryCardProps {
    bordered?: boolean;
    secondTitle: string;
    title: string;
    availableRbx: string | number;
    submitButtonTitle?: string;
    ticketSold: string | number;
    earnPercentage: number | string;
    time?: string | React.ReactNode;
    jackpot: string;
    activePool: string;
    // winLogo: string;
    totalDue?: string;
    submitButtonProps?: CustomButtonProps;
    maxButtonProps?: CustomButtonProps;
    // periodButtons: PeriodButton[];
    // periodButtonsProps?: CustomButtonProps;
    earnButtonProps?: CustomButtonProps;
    TextFieldProps?: TextFieldProps;
    RadioGroupProps?: RadioGroupProps;
}

const PlayLotteryCard: React.FC<PlayLotteryCardProps> = ({
    bordered,
    secondTitle,
    title,
    // availableRbx,
    submitButtonProps = {},
    // periodButtons,
    ticketSold,
    time,
    jackpot,
    activePool,
    totalDue,
    // winLogo,
    submitButtonTitle = 'Buy',
    maxButtonProps = {},
    // periodButtonsProps = {},
    TextFieldProps = {},
    RadioGroupProps = {},
}) => {
    const classes = useStyles();
    return (
        <>
            {/* <Typography className={classes.ticketSold}>TICKETS: {ticketSold}</Typography> */}
            <Card className={cx(classes.playLotteryCard, { [classes.bordered]: bordered })}>
                {/* <div className={classes.rightBox}>
                    Win <img className={classes.winLogo} src={winLogo} alt="win" />
                </div> */}
                <Typography className={classes.title} variant="h4">
                    {title}
                </Typography>
                <Typography className={classes.subtitle2} variant="body1">
                    {secondTitle}
                </Typography>
                {/* <Typography className={classes.subtitle} variant="subtitle2" gutterBottom>
                    Balance: <span>{availableRbx}</span>
                </Typography> */}
                <div>
                    {/* <Typography className={classes.titleBox} variant="subtitle1" component="span">
                        
                    </Typography> */}
                </div>
                <form className={classes.form}>
                    <div className={classes.inputWrapper}>
                        <TextField
                            {...TextFieldProps}
                            className={cx(classes.input, { [TextFieldProps.className]: TextFieldProps.className })}
                        />
                        <CustomButton
                            color="info"
                            size="small"
                            rounded
                            {...maxButtonProps}
                            className={cx(classes.maxButton, {
                                [maxButtonProps.className]: maxButtonProps.className,
                                [classes.helperTextFixBtn]: TextFieldProps.helperText,
                            })}
                        >
                            Max
                        </CustomButton>
                    </div>

                    <CustomButton
                        size="medium"
                        color="black"
                        rounded
                        {...submitButtonProps}
                        className={cx(classes.submitBtn, {
                            [submitButtonProps.className]: submitButtonProps.className,
                        })}
                    >
                        {submitButtonTitle}
                    </CustomButton>
                </form>
                <Typography variant="body2" className={classes.paymentText}>
                    PAYMENT METHODS:
                </Typography>
                <RadioGroup
                    className={classes.paymentMethods}
                    row
                    aria-label="position"
                    name="position"
                    {...RadioGroupProps}
                >
                    <FormControlLabel value="RBX" control={<Radio color="primary" />} label="RBX" />
                    <FormControlLabel value="BNB" control={<Radio color="primary" />} label="BNB" />
                </RadioGroup>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        {time}
                        {/* <div>
                            {periodButtons.map((singleButton) => (
                                <CustomButton
                                    size="small"
                                    key={singleButton.title}
                                    {...periodButtonsProps}
                                    square
                                    color="info"
                                    // size="small"
                                    className={cx(classes.periodButton, {
                                        [periodButtonsProps.className]: periodButtonsProps.className,
                                        [classes.periodButtonGreen]: singleButton.color === 'green',
                                    })}
                                    value={singleButton.value}
                                >
                                    {singleButton.title}
                                </CustomButton>
                            ))}
                        </div> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={cx(classes.titleBox)} variant="subtitle1" component="span">
                            <span>ROUND: </span>#{activePool}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={cx(classes.titleBox)} variant="subtitle1" component="span">
                            <span>PRIZE POOL: </span>
                            {jackpot}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" style={{ marginTop: '20px' }}>
                    <Grid item>
                        <Typography className={classes.price}>
                            Due:
                            <strong>{totalDue}</strong>
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <Typography className={classes.winText}>
                            Total Due:
                            <span>{totalDue}</span>
                        </Typography>
                    </Grid> */}
                </Grid>
            </Card>
        </>
    );
};

export default PlayLotteryCard;

const useStyles = makeStyles((theme) => ({
    playLotteryCard: {
        // background: 'transparent',
        border: '1px solid #000',
        // boxShadow: '8px 8px 16px #030108, -8px -8px 16px #0b031a',
        padding: '30px 20px',
        [theme.breakpoints.up('lg')]: { padding: '35px 30px' },
    },
    bordered: {
        borderColor: theme.palette.common.black,
    },
    heading: { paddingLeft: '10px' },
    rightBox: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3px 5px',
        backgroundColor: theme.palette.primary.main,
        //  color: theme.palette.common.white,
        borderRadius: '30px',
        fontSize: theme.typography.pxToRem(12),
        minWidth: '100px',
        textAlign: 'center',
        position: 'absolute',
        right: '20px',
        top: '20px',
        fontWeight: 300,
        fontFamily: 'roc-grotesk, sans-serif',

        [theme.breakpoints.up('md')]: {
            padding: '5px 10px',
            fontSize: theme.typography.pxToRem(14),
            right: '20px',
            top: '20px',
        },
    },
    winLogo: {
        height: '15px',
        width: 'auto',
        display: 'inline-block',
        marginLeft: '5px',
    },
    title: {
        fontSize: theme.typography.pxToRem(23),
        fontFamily: 't26-carbon, monospace',
        // color: 'white',
        fontWeight: 900,
        lineHeight: 1,
        textAlign: 'left',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(23),
        },
        '& span': {
            // color: 'white',
            fontWeight: 100,
            fontSize: theme.typography.pxToRem(23),
            fontFamily: 't26-carbon, monospace',
        },
    },
    subtitle: {
        fontWeight: 100,
        marginTop: '15px',
        fontFamily: 't26-carbon, monospace',
        // color: theme.palette.common.white,
        '& span': {
            //  color: theme.palette.common.white,
            fontWeight: 100,
            fontSize: theme.typography.pxToRem(15),
            fontFamily: 't26-carbon, monospace',
        },
    },
    subtitle2: {
        fontWeight: 100,
        marginTop: '10px',
        fontSize: theme.typography.pxToRem(13),
        // color: theme.palette.common.white,
        '& span': {
            //  color: theme.palette.common.white,
            fontWeight: 100,
        },
    },
    titleBox: {
        // backgroundColor: theme.palette.common.black,
        fontFamily: 't26-carbon, monospace',
        // color: '#fff',
        // borderRadius: '5px',
        // border: '1px dashed #fff',
        fontWeight: 300,
        display: 'inline-block',
        // padding: '10px 10px',
        marginTop: theme.spacing(1.5),
        fontSize: theme.typography.pxToRem(18),
        [theme.breakpoints.down('md')]: { fontSize: theme.typography.pxToRem(12) },
        '& span': {
            //   color: 'white',
            fontWeight: 100,
            fontFamily: 't26-carbon, monospace',
        },
    },
    titleBoxBordered: {
        color: '#000',
        backgroundColor: 'transparent',
    },
    form: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: '15px',
        marginTop: '20px',
        [theme.breakpoints.up('md')]: { marginTop: '20px' },
    },
    inputWrapper: { flexGrow: 1, position: 'relative', marginRight: '20px' },
    input: {
        width: '100%',
        padding: '12px 0',
        paddingBottom: '0',
        '& input': {
            paddingRight: '65px',
            color: '#00ffd5',
            // fontSize: theme.typography.pxToRem(20),
            fontFamily: 't26-carbon, monospace',
        },
    },
    maxButton: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        textTransform: 'capitalize',
        fontWeight: 200,
        padding: '0px 5px',
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
    },
    helperTextFixBtn: { marginTop: '-7px' },
    submitBtn: {
        background: '#6c64ac',
        color: '#fff',
        fontWeight: 100,
        borderRadius: '8px',
        fontFamily: 't26-carbon, monospace',
        textTransform: 'capitalize',

        [theme.breakpoints.up('md')]: { fontSize: theme.typography.pxToRem(20) },
    },

    paymentText: {
        // color: '#fff',
        fontFamily: 't26-carbon, monospace',
    },
    paymentMethods: {
        color: 'black',
    },

    periodButton: {
        textTransform: 'capitalize',
        fontWeight: 400,
        boxShadow: 'none',

        '&:not(last-child)': {
            marginRight: '10px',
        },
        '&:hover': {
            boxShadow: 'none',
        },
        fontSize: theme.typography.pxToRem(10),
        // [theme.breakpoints.only('lg')]: {
        //     '&:not(last-child)': {
        //         marginRight: '5px',
        //     },
        // },
    },
    periodButtonGreen: { backgroundColor: '#00ffd5' },

    ticketSold: {
        backgroundColor: 'transparent',
        border: '1px dashed ' + theme.palette.primary.main,
        position: 'relative',
        borderRadius: '10px',
        fontWeight: 400,
        display: 'inline-block',
        padding: '5px 25px',
        marginTop: '10px',
        marginBottom: '10px',
        color: theme.palette.common.black,
    },
    price: {
        marginTop: '25px',
        fontWeight: 300,
        fontSize: theme.typography.pxToRem(16),
        //   color: '#fff',
        lineHeight: 1,

        '& strong': { display: 'block', marginTop: '10px' },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(20),
        },
    },
    winText: {
        fontWeight: 300,
        textAlign: 'right',
        lineHeight: 1,
        // paddingRight: '20px',
        // position: 'relative',
        // [theme.breakpoints.up('md')]: {
        //     paddingRight: '25px',
        // },
        // '&::after': {
        //     content: '"+"',
        //     fontFamily: 'roc-grotesk, sans-serif',
        //     fontWeight: 600,
        //     fontSize: theme.typography.pxToRem(22),
        //     position: 'absolute',
        //     right: 0,
        //     top: '50%',
        //     transform: 'translateY(-50%)',

        //     [theme.breakpoints.up('md')]: {
        //         fontSize: theme.typography.pxToRem(28),
        //     },
        // },
        '& span': {
            display: 'block',
            fontWeight: 600,
            color: theme.palette.common.black,
        },
        '& span:first-child': {
            fontSize: theme.typography.pxToRem(12),
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(28),
            },
        },
        '& span:last-child': {
            fontSize: theme.typography.pxToRem(16),
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(18),
            },
        },
    },
}));
