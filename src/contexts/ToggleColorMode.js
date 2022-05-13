import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getDesignTheme from '../theme/Theme';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ToggleColorMode(props) {
    const { children } = props;

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTheme(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}