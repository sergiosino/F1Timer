import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         mode: 'light',
//     },
// });

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#711010',
        },
        secondary: {
            main: '#060606',
        },
        background: {
            default: '#FFFFFF',
            paper: '#fff8f8',
        },
    },
});

export default theme;
