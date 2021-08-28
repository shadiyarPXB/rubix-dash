import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

interface CardProps {
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    const classes = useStyles();
    return <div className={cx(classes.cardWrapper, { [className]: className })}>{children}</div>;
};

export default Card;

const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        // minHeight: '100%',
        padding: '20px 15px',
        borderRadius: '15px',
        backgroundColor: theme.palette.common.white,
        //  border: '1px solid #000',
        //  borderColor: '#000',
        [theme.breakpoints.up('md')]: { padding: '25px 20px' },
        [theme.breakpoints.up('lg')]: { padding: '15px 10px' },
    },
}));
