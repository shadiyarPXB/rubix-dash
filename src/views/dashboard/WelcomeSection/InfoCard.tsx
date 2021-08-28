import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomButton from 'components/CustomButton';
import Card from 'components/Card';

interface InfoCardProps {
    text: string;
    img?: string;
    buttonText: string;
    buttonLink: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ text, img, buttonText, buttonLink }) => {
    const classes = useStyles();
    return (
        <Card className={classes.infoCard}>
            {img && <img className={classes.img} src={img} alt={text} />}
            <Typography
                className={classes.infoCardText}
                variant="body1"
                dangerouslySetInnerHTML={{ __html: text }}
                gutterBottom
            />
            <CustomButton href={buttonLink} className={classes.infoButton}>
                {buttonText}
            </CustomButton>
        </Card>
    );
};

export default InfoCard;

const useStyles = makeStyles((theme) => ({
    infoCard: {
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '15px',
        background: 'linear-gradient(90deg, hsla(197, 41%, 7%, 1) 0%, hsla(252, 64%, 8%, 1) 100%)', // 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
        //border: '1px solid',
    },
    infoButton: {
        marginTop: '10px',
    },
    infoCardText: {
        fontWeight: 500,
        color: theme.palette.common.white,
        fontFamily: 'lust-didone, serif',
        marginTop: '180px',
        fontSize: theme.typography.pxToRem(18),
        [theme.breakpoints.down('sm')]: { fontSize: theme.typography.pxToRem(15) },
        '& span': { color: theme.palette.common.white },
    },
    img: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        objectPosition: 'center',
        // borderRadius: 10,
    },
}));
