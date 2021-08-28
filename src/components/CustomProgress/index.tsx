import React from 'react';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

interface CustomProgressProps extends LinearProgressProps {
    bgColor?: string;
    fgColor?: string;
}

const CustomProgress: React.FC<CustomProgressProps> = ({ bgColor = '#fec5bb', fgColor = '#26FFD5', ...rest }) => {
    const classes = useStyles({ bgColor, fgColor });
    return <LinearProgress classes={{ root: classes.root, bar: classes.bar }} variant="determinate" {...rest} />;
};

export default CustomProgress;

const useStyles = makeStyles({
    // @ts-ignore
    root: { backgroundColor: (props) => props.bgColor, height: '30px', borderRadius: '30px' },
    // @ts-ignore
    bar: { backgroundColor: (props) => props.fgColor },
});
