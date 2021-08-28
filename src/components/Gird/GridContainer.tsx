import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridProps } from '@material-ui/core/Grid';
import cx from 'classnames';

const GridContainer: React.FC<GridProps> = ({ className, children, ...restProps }) => {
    const classes = useStyles();
    return (
        <div className={cx(classes.gridContainer, { [className]: className })}>
            <Grid container spacing={3} {...restProps}>
                {children}
            </Grid>
        </div>
    );
};

export default GridContainer;

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '0 auto',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '90%',
        },
        [theme.breakpoints.up('xl')]: {
            width: '80%',
        },
    },
}));
