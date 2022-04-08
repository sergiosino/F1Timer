import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function MenuAppBar() {

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        F1Timer
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ height: 85 }} />
        </>
    );
}