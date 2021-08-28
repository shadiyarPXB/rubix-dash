import React from 'react';
import cx from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Card from 'components/Card';
import CustomButton, { CustomButtonProps } from 'components/CustomButton';

interface PeriodButton {
    selected?: boolean;
    title: string;
    value: string | number;
    className?: string;
}

interface StakingCardProps {
    heading: string;
    bordered?: boolean;
    title: string;
    titleSpan: string;
    availableRbx: string | number;
    // earnLogo: string;
    submitButtonTitle?: string;
    submitButtonProps?: CustomButtonProps;
    maxButtonProps?: CustomButtonProps;
    periodButtons: PeriodButton[];
    periodButtonsProps?: CustomButtonProps;
    poolSize: string;
    earnPercentage: number | string;
    earnButtonProps?: CustomButtonProps;
    TextFieldProps?: TextFieldProps;
}

const StakingCard: React.FC<StakingCardProps> = ({
    bordered,
    title,
    titleSpan,
    availableRbx,
    // earnLogo,
    submitButtonProps = {},
    maxButtonProps = {},
    submitButtonTitle = 'Approve',
    periodButtons,
    periodButtonsProps = {},
    earnPercentage,
    // earnButtonProps = {},
    poolSize,
    TextFieldProps = {},
}) => {
    const classes = useStyles();
    return (
        <>
            <Card className={cx(classes.stakingCard, { [classes.bordered]: bordered })}>
                <Typography className={classes.title} variant="h4">
                    {title}
                    <span>{titleSpan}</span>
                </Typography>
                <Typography className={classes.subtitle} variant="subtitle2" gutterBottom>
                    Balance: <span>{availableRbx}</span>
                </Typography>
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
                <div className={classes.periodButtonWrapper}>
                    {periodButtons.map((singleButton) => (
                        <CustomButton
                            key={singleButton.title}
                            {...periodButtonsProps}
                            square
                            color="info"
                            size="small"
                            className={cx(classes.periodButton, {
                                [periodButtonsProps.className]: periodButtonsProps.className,
                                [classes.periodButtonGreen]: singleButton.selected,
                            })}
                            value={singleButton.value}
                        >
                            {singleButton.title}
                        </CustomButton>
                    ))}
                </div>
                <div className={classes.earnPercentageWrapper}>
                    <Typography className={classes.earnPercentageText}>{earnPercentage}% APY</Typography>
                    {/* <CustomButton
                        rounded
                        color="primary"
                        size="small"
                        {...earnButtonProps}
                        className={cx(classes.earnPercentageButton, {
                            [earnButtonProps.className]: earnButtonProps.className,
                        })}
                        endIcon={<img className={classes.buttonIcon} src={earnLogo} alt={title} />}
                        disabled
                    >
                        Earn
                    </CustomButton> */}
                </div>

                <Typography className={classes.poolSizeText}>
                    <span>POOL SIZE:</span> {poolSize}
                </Typography>
            </Card>
        </>
    );
};

export default StakingCard;

const useStyles = makeStyles((theme) => ({
    stakingCard: {
        background: 'transparent',
        border: '0.2px solid #6c64ac',
        minHeight: '100%',
        // boxShadow: '8px 8px 16px #030108, -8px -8px 16px #0b031a',
        padding: '30px 20px',
        [theme.breakpoints.up('lg')]: { padding: '35px 30px' },
    },
    bordered: {
        borderColor: theme.palette.info.main,
    },
    title: {
        fontSize: theme.typography.pxToRem(23),
        fontFamily: 't26-carbon, monospace',
        color: 'white',
        fontWeight: 900,
        lineHeight: 1,
        textAlign: 'left',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(23),
        },
        '& span': {
            color: 'white',
            fontWeight: 100,
            fontSize: theme.typography.pxToRem(23),
            fontFamily: 't26-carbon, monospace',
        },
    },
    subtitle: {
        fontWeight: 300,
        marginTop: '10px',
        fontFamily: 't26-carbon, monospace',
        color: theme.palette.common.white,
        '& span': {
            color: theme.palette.common.white,
            fontWeight: 100,
            fontSize: theme.typography.pxToRem(15),
            fontFamily: 't26-carbon, monospace',
        },
    },
    form: {
        // paddingRight: '10%',
        display: 'flex',
        alignItems: 'flex-start',
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
    periodButtonWrapper: { marginBottom: '40px' },
    periodButton: {
        textTransform: 'capitalize',
        fontSize: theme.typography.pxToRem(10),
        fontWeight: 400,
        boxShadow: 'none',
        '&:not(last-child)': {
            marginRight: '10px',
        },
        '&:hover': {
            boxShadow: 'none',
        },

        [theme.breakpoints.down('md')]: { fontSize: theme.typography.pxToRem(10) },
    },
    periodButtonGreen: { backgroundColor: '#00ffd5' },
    earnPercentageWrapper: { display: 'flex', alignItems: 'flex-end' },
    earnPercentageText: {
        color: 'white',
        fontWeight: 100,
        fontSize: theme.typography.pxToRem(30),
        fontFamily: 't26-carbon, monospace',
        lineHeight: 0.75,
        marginRight: '20px',
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(30),
        },
    },
    earnPercentageButton: { fontWeight: 300, textTransform: 'capitalize' },
    buttonIcon: {
        height: '12px',
        width: 'auto',
    },
    poolSizeText: {
        // backgroundColor: theme.palette.common.black,
        fontFamily: 't26-carbon, monospace',
        color: '#7c77d8',
        // borderRadius: '5px',
        // border: '1px dashed #fff',
        fontWeight: 300,
        display: 'inline-block',
        // padding: '10px 10px',
        marginTop: '30px',
        fontSize: theme.typography.pxToRem(18),
        [theme.breakpoints.down('md')]: { fontSize: theme.typography.pxToRem(12) },
        '& span': {
            color: 'white',
            fontWeight: 100,
            fontFamily: 't26-carbon, monospace',
        },
    },
}));
