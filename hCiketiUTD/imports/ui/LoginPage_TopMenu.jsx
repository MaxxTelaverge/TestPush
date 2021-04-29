import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";


/*On hover */
const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#cc6450',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#ffffff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    '&:focus': {
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(.5),
  },
  TopMenu: {
    backgroundColor: '#304269',
  },
}));

const paperStyle={width:340,margin:"20px auto"}
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export default function LoginPageTopMenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.TopMenu}>
        <div align = 'center'>
          <img alt="app icon" width="60" src="https://i.ibb.co/PM9qNFC/Logo.png" />
        </div>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="Home" />
          <StyledTab label="About Us" />
          <StyledTab label="Help" />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
    </div>

  );
}