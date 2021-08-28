import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GridContainer, GridItem } from 'components/Gird';

interface GridContainerProps {
    title: string;
    subTitle?: string | React.ReactNode;
    className?: string;
}

const SectionHeader: React.FC<GridContainerProps> = ({ title, children, subTitle, className }) => {
    const classes = useStyles();
    return (
        <header className={cx(classes.sectionHeader, { [className]: className })}>
            <GridContainer justify="space-between" spacing={2}>
                <GridItem xs={12} sm={children ? 7 : 12} container alignItems="center">
                    <Typography className={classes.sectionTitle} variant="h4" component="h2">
                        {title}
                    </Typography>
                </GridItem>
                {children && (
                    <GridItem xs={12} sm={5} style={{ textAlign: 'right' }}>
                        {children}
                    </GridItem>
                )}
            </GridContainer>
            {subTitle && (
                <GridContainer justify="space-between">
                    <GridItem xs={12} style={{ marginBottom: '15px' }}>
                        {typeof subTitle === 'string' ? (
                            <Typography variant="body1" className={classes.subTitle} style={{ fontWeight: 400 }}>
                                {subTitle}
                            </Typography>
                        ) : (
                            subTitle
                        )}
                    </GridItem>
                </GridContainer>
            )}
        </header>
    );
};

export default SectionHeader;

const useStyles = makeStyles((theme) => ({
    subTitle: {
        color: '#fff',
    },
    sectionHeader: {
        marginBottom: '15px',
        [theme.breakpoints.up('sm')]: {
            marginBottom: '25px',
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: '60px',
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: '5px',
        },
    },
    sectionTitle: {
        color: theme.palette.common.white,
        //fontFamily: 'bilo, sans-serif',
        fontSize: theme.typography.pxToRem(35),
        fontWeight: 600,
        marginBottom: '0',
        [theme.breakpoints.down('sm')]: { fontSize: theme.typography.pxToRem(40) },
        [theme.breakpoints.down('xs')]: { fontSize: theme.typography.pxToRem(20) },
    },
}));
