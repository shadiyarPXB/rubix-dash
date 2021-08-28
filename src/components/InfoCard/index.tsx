import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

interface InfoCardProps {
    text: string;
    logo: string;
    className?: string;
}
const InfoCard: React.FC<InfoCardProps> = ({ text, logo, children, className }) => {
    const classes = useStyles();
    return (
        <div className={cx(classes.infoCard, { [className]: className })}>
            <img className={classes.logo} src={logo} alt="text" />
            <div>
                <Typography className={classes.text} style={{ wordBreak: 'break-all' }}>
                    {text}
                </Typography>
                {children}
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    infoCard: {
        background: 'linear-gradient(90deg, hsla(205, 46%, 30%, 1) 0%, hsla(260, 29%, 36%, 1) 100%)',
        padding: '10px',
        display: 'flex',
        borderRadius: '15px',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            padding: '10px 10px',
        },
    },
    logo: {
        height: '40px',
        width: '40px',
        marginRight: '10px',
        [theme.breakpoints.up('md')]: {
            height: '40px',
            width: '40px',
            marginRight: '15px',
        },
    },
    text: {
        fontSize: theme.typography.pxToRem(15),
        textAlign: 'left',
        color: '#fff',
        fontFamily: 't26-carbon, monospace',
    },
}));

export default InfoCard;
