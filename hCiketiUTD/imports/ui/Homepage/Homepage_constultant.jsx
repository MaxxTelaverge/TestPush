import React from 'react';
import { ExampleRoute } from '../ExampleRoute.jsx'
import { useTracker } from 'meteor/react-meteor-data';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { RemoteScheduledSessions } from '/imports/ui/Scheduled_Sessions_Remote';
import { LobbySettingsCollection } from '/imports/api/lobbysettings.js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Homepage_Constultant = () => {
    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();
    const classes = useStyles();

    return (
            <div>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h4" className={classes.title}>
                                <Link to="/">Home</Link>
                            </Typography>
                            <Typography variant="h4" className={classes.title}>
                                <Link to="/scheduledsessions">Scheduled Sessions</Link>
                            </Typography>
                            <Button onClick={logout} color="inherit">Logout</Button>
                        </Toolbar>
                    </AppBar>
                    
                    <Switch>
                        <Route path="/scheduledsessions">
                            <RemoteScheduledSessions />
                        </Route>
                    </Switch>
                </Router>
                <RemoteScheduledSessions />
            </div>
    )
};
