import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Element } from 'react-scroll';
interface SectionWrapperProps {
    id?: string;
    className?: string;
}
const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => {
    const classes = useStyles();
    return (
        <Element id={id} name={id} className={classes.sectionWrapper + ' ' + className}>
            {children}
        </Element>
    );
};

export default SectionWrapper;

const useStyles = makeStyles((theme) => ({
    sectionWrapper: {
        padding: '20px 0',
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
