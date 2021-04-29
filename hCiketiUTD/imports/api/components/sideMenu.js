import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";
import Controls from '../controls/Controls'
import { spacing } from '@material-ui/system';

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        spacing: 'padding-top',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    }
}

const SideMenu = (props) => {
    const { classes } = props;
    return (
        <div className={classes.sideMenu} style={{spacing:'padding-top'}}>
            {/* <Controls.Button title='Menu Option 1'></Controls.Button>
            <Controls.Button title='Menu Option 2'></Controls.Button>
            <Controls.Button title='Menu Option 3'></Controls.Button>
            <Controls.Button title='Menu Option 4'></Controls.Button> */}
        </div>
    )
}

export default withStyles(style)(SideMenu);