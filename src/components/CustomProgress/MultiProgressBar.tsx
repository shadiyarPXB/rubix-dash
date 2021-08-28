import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

interface ProgressesProps {
    value: number;
    color?: string;
    title?: string;
}

interface ProgressBarProps {
    progresses: ProgressesProps[];
    height?: string;
    bg?: string;
    borderRadius?: string;
}

const MultiProgressBar: React.FC<ProgressBarProps> = ({
    height = '8px',
    bg = '#A0AAA5',
    borderRadius = '50px',
    progresses,
}) => {
    const sortedProgresses = progresses.sort(function (a, b) {
        return b.value - a.value;
    });
    const classes = useStyles();
    return (
        <div className={classes.progressBarWrapper} style={{ height, backgroundColor: bg, borderRadius }}>
            {sortedProgresses.map((progress, index) => {
                const progressEl = (
                    <div
                        key={index}
                        className={classes.progressBar}
                        style={{
                            width: progress.value + '%',
                            zIndex: index + 1,
                            backgroundColor: progress.color || '#264E46',
                            borderRadius,
                        }}
                    ></div>
                );

                return progress.title ? (
                    <Tooltip key={index} title={`${progress.title} ${progress.value.toFixed(2)}%`} placement="top-end">
                        {progressEl}
                    </Tooltip>
                ) : (
                    progressEl
                );
            })}
        </div>
    );
};

export default MultiProgressBar;

const useStyles = makeStyles({
    progressBarWrapper: {
        position: 'relative',
        overflow: 'hidden',
    },
    progressBar: {
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        transition: '0.3s',
        cursor: 'pointer',
        textAlign: 'right',
    },
});
