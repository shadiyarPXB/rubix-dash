import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#fff' },
        secondary: { main: '#fff' },
        info: { main: '#fff5f3' },
        success: { main: '#00ffd5' },
        text: { primary: '#010101', secondary: '#4924ff' },
    },

    typography: {
        h1: { fontWeight: 600 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 400 },
        body2: { fontFamily: 'roc-grotesk, sans-serif', fontWeight: 200 },
        fontFamily: ['roc-grotesk, sans-serif'].join(','),
        button: { fontFamily: 'roc-grotesk, sans-serif' },
    },
    // overrides:{dis}
});

export default responsiveFontSizes(theme);
