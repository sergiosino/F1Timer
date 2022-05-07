import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ColorModeContext } from '../contexts/ToggleColorMode';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Countdown from "react-countdown";

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
                {['Race', 'Race', 'Race', 'Race'].map((text, index) => (
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
                {['Drivers', 'Drivers', 'Drivers'].map((text, index) => (
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
        const hoursDiff = Math.abs(raceDate.getTime() - new Date().getTime()) / 3600000;

        if (hoursDiff < 0) {
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
                        {/* <Moment
                                id={"nextRaceTimer"}
                                onChange={handleTimerChange}
                                interval={1000}
                                date={`${nextRace.date}T${nextRace.time}`}
                                format="HH:mm:ss"
                                durationFromNow />} */}
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
            <div sx={{ height: 70 }} />
        </>
    );
}