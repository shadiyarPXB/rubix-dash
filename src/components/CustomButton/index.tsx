import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import cx from 'classnames';

export interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
    color?: 'black' | 'yellow' | 'white' | 'primary' | 'info' | 'grey' | 'blue' | 'red';
    rounded?: boolean;
    square?: boolean;
    bold?: boolean;
    loading?: boolean;
    CircularProgressProps?: CircularProgressProps;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    className,
    color,
    rounded,
    square,
    children,
    bold,
    loading = false,
    CircularProgressProps,
    ...rest
}) => {
    const classes = useStyles();
    const buttonClasses = cx(classes.customButton, {
        [className]: className,
        [classes[color]]: color,
        [classes.rounded]: rounded,
        [classes.square]: square,
        [classes.bold]: bold,
    });

    return (
        <Button
            className={buttonClasses}
            color={color === 'primary' ? 'primary' : 'secondary'}
            variant="contained"
            {...rest}
        >
            {loading ? <CircularProgress size={30} {...CircularProgressProps} /> : children}
        </Button>
    );
};

export default CustomButton;

const useStyles = makeStyles((theme) => ({
    customButton: {},
    black: { backgroundColor: theme.palette.common.black },
    white: { backgroundColor: theme.palette.common.white },
    grey: { backgroundColor: theme.palette.grey[500] },
    red: { backgroundColor: theme.palette.error.light },
    info: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.common.black,
        '&:hover': { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    },
    yellow: { backgroundColor: '#e9ce0d' },
    rounded: { borderRadius: '200px' },
    square: { borderRadius: '0px' },
    bold: { fontWeight: 700 },
}));
