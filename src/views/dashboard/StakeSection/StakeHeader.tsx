import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionHeader from 'components/SectionHeader';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// import CustomButton from 'components/CustomButton';
// import Countdown from 'react-countdown';

const WelcomeHeader: React.FC = () => {
    const classes = useStyles();
    return (
        <SectionHeader
            title="Locked Staking"
            subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora fugiat excepturi neque non officia dolores a laudantium libero, sint atque numquam, debitis sed esse explicabo architecto, fuga id velit consequuntur."
        >
            {/* <CustomButton
                className={classes.button}
                size="large"
                color="black"
                endIcon={<img className={classes.buttonIcon} src="/rbx-plus-bnb.svg" alt="rubix" />}
            >
                CLAIM
            </CustomButton> */}
        </SectionHeader>
    );
};

export default WelcomeHeader;

const useStyles = makeStyles((theme) => ({
    info: { marginBottom: '20px' },
    //     button: {
    //         fontSize: theme.typography.pxToRem(25),
    //         fontWeight: 300,
    //         [theme.breakpoints.down('xs')]: {
    //             width: '100%',
    //         },
    //     },
    //     buttonIcon: {
    //         height: '40px',
    //         width: '40px',
    //     },
}));
