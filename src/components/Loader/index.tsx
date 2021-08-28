import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import cx from 'classnames';

interface LoaderProps {
    loading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
    const classes = useStyles();
    return (
        <div className={cx(classes.loadingWrapper, { [classes.loadingActive]: loading })}>
            <CircularProgress />
        </div>
    );
};

export default Loader;

const useStyles = makeStyles({
    loadingWrapper: {
        backgroundColor: '#dddddd44',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: 'hidden',
        zIndex: -1,
        transition: '0.3s',
    },
    loadingActive: {
        opacity: 1,
        visibility: 'visible',
        zIndex: 9999,
    },
});
