import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridProps } from '@material-ui/core/Grid';
import cx from 'classnames';

const GridItem: React.FC<GridProps> = ({ className, children, ...restProps }) => {
    const classes = useStyles();
    return (
        <Grid item {...restProps} className={cx(classes.gridItem, { [className]: className })}>
            {children}
        </Grid>
    );
};

export default GridItem;

const useStyles = makeStyles({ gridItem: {} });
