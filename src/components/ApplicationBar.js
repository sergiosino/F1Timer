import * as React from 'react';
import Countdown from "react-countdown";
import {
    AppBar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, useTheme,
    Brightness4Icon, Brightness7Icon, InboxIcon, MailIcon, MenuIcon
} from '../utils/muiImports';
import { ColorModeContext } from '../contexts/ToggleColorMode';

export default function ApplicationBar(props) {
    const { nextRace } = props;

    const [state, setState] = React.useState(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <List>
                {['Race1', 'Race2', 'Race3', 'Race4'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Drivers1', 'Drivers2', 'Drivers3'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const toggleDrawer = (open) => () => {
        setState(open);
    }

    const nextRaceDate = () => {
        const raceDate = new Date(`${nextRace.date}T${nextRace.time}`);
        const diff = raceDate.getTime() - new Date().getTime();
        if (diff < 0) {
            return "Next: Now!";
        } else {
            return (
                <>
                    Next: <Countdown date={raceDate} />
                </>
            );
        }
    }

    return (
        <>
            <AppBar color="primary">
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        F1 Timer
                    </Typography>
                    <Typography variant="h6" component="div">
                        {nextRace && nextRaceDate()}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={colorMode.toggleColorMode}
                        edge="end"
                        sx={{ ml: 2 }}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor={"left"}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}>
                {list()}
            </SwipeableDrawer>
            <Box style={{ height: 70 }} />
        </>
    );
}