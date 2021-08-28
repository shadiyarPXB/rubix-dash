import React from 'react';
import cx from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Input, { InputProps } from '@material-ui/core/Input';
import Card from 'components/Card';
import CustomButton, { CustomButtonProps } from 'components/CustomButton';

interface BalanceInfo {
    logo: string;
    type: string;
    value: string | number;
}

interface ContributeCardProps {
    bordered?: boolean;
    title: string | React.ReactNode;
    infoTooltip?: string;
    submitButtonTitle?: string;
    submitButtonProps?: CustomButtonProps;
    maxButtonProps?: CustomButtonProps;
    inputProps?: InputProps;
    infoText: string;
    due: string | number;
    balance?: BalanceInfo[];
    reward?: number | string;
}

const ContributeCard: React.FC<ContributeCardProps> = ({
    bordered,
    title,
    submitButtonProps = {},
    maxButtonProps = {},
    submitButtonTitle = 'Contribute',
    infoText,
    inputProps = {},
    balance,
    due,
    infoTooltip,
    reward,
}) => {
    const classes = useStyles();
    return (
        <Card className={cx(classes.contribute, { [classes.bordered]: bordered })}>
            {infoTooltip && (
                <div className={classes.infoIcon}>
                    <Tooltip title={infoTooltip} placement="right-start">
                        <InfoIcon />
                    </Tooltip>
                </div>
            )}
            <Typography className={classes.title} variant="h4">
                {title}
            </Typography>

            <form className={classes.form}>
                <div className={classes.inputWrapper}>
                    <Input
                        {...inputProps}
                        className={cx(classes.input, { [inputProps.className]: inputProps.className })}
                    />
                    <CustomButton
                        color="info"
                        size="small"
                        rounded
                        {...maxButtonProps}
                        className={cx(classes.maxButton, { [maxButtonProps.className]: maxButtonProps.className })}
                    >
                        Max
                    </CustomButton>
                </div>

                <CustomButton
                    size="large"
                    color="primary"
                    rounded
                    {...submitButtonProps}
                    className={cx(classes.submitBtn, {
                        [submitButtonProps.className]: submitButtonProps.className,
                    })}
                >
                    {submitButtonTitle}
                </CustomButton>
            </form>
            <Typography variant="subtitle2">Total due: {due} BNB</Typography>
            <Typography className={classes.infoText}>{infoText}</Typography>
            {balance && (
                <>
                    <Typography>Your Balance:</Typography>
                    {balance.map((singleBalance) => (
                        <div className={classes.balanceItem} key={singleBalance.type}>
                            <img src={singleBalance.logo} alt={singleBalance.type} />
                            <Typography className={classes.balanceItemText}>
                                {singleBalance.value} {singleBalance.type}
                            </Typography>
                        </div>
                    ))}
                </>
            )}

            <Typography className={classes.rewardText} variant="h3">
                <span>You will get:</span> {reward} RBX <span>Price per Ticket 0.032 BNB</span>
            </Typography>
        </Card>
    );
};

export default ContributeCard;

const useStyles = makeStyles((theme) => ({
    contribute: {
        color: '#fefffa',
        boxShadow: '9px 9px 8px #eaebe6, -9px -9px 8px #e3e4dd',
        padding: '30px 20px 10px',
        [theme.breakpoints.up('lg')]: { padding: '50px 30px 20px' },
        minHeight: '100%',
        position: 'relative',
    },
    infoIcon: { position: 'absolute', right: '15px', top: '15px', cursor: 'pointer' },
    bordered: {
        borderColor: theme.palette.primary.main,
    },
    title: {
        fontWeight: 300,
        fontSize: theme.typography.pxToRem(25),
        lineHeight: 1.2,
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(30),
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(40),
        },
    },

    form: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: '15px',
        marginTop: '20px',
        [theme.breakpoints.up('md')]: { marginTop: '20px' },
    },
    inputWrapper: { flexGrow: 1, position: 'relative', marginRight: '20px' },
    input: { width: '100%', padding: '12px 0', paddingBottom: '0' },
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
    submitBtn: {
        fontWeight: 900,
        textTransform: 'capitalize',
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.up('md')]: { fontSize: theme.typography.pxToRem(20) },
    },

    infoText: {
        backgroundColor: theme.palette.info.main,
        fontWeight: 300,
        display: 'inline-block',
        padding: '10px 20px',
        marginTop: '10px',
        marginBottom: '10px',
        [theme.breakpoints.down('md')]: { fontSize: theme.typography.pxToRem(12) },
    },
    balanceItem: {
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        '& img': { height: '35px', width: '35px', marginRight: '15px' },
    },
    balanceItemText: { fontSize: theme.typography.pxToRem(18) },
    rewardText: {
        textAlign: 'right',
        fontWeight: 300,
        '& span': { display: 'block', fontSize: '30%', color: theme.palette.grey[600] },
    },
}));
