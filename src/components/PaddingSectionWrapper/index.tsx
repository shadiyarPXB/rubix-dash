import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Element } from 'react-scroll';
interface PaddingSectionWrapperProps {
    id?: string;
    className?: string;
}
const PaddingSectionWrapper: React.FC<PaddingSectionWrapperProps> = ({ id, children, className }) => {
    const classes = useStyles();
    return (
        <Element id={id} name={id} className={classes.PaddingSectionWrapper + ' ' + className}>
            {children}
        </Element>
    );
};

export default PaddingSectionWrapper;

const useStyles = makeStyles((theme) => ({
    PaddingSectionWrapper: {
        padding: '40px 20px',
        [theme.breakpoints.up('sm')]: {
            padding: '40px 0',
        },
        [theme.breakpoints.up('md')]: {
            padding: '80px 0',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '90px 0',
        },
    },
}));
