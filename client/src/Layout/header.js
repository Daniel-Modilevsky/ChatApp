import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../static/chatApp.png";

import Drawer from "@material-ui/core/Drawer";
import AppDrawer from "./Drawer";

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

export default function Header(props) {
  //===============STATE===============
  const [title] = useState(props.title);
  const [toggleState, setToggleState] = React.useState({
    left: false,
  });
  const classes = useStyles();

  //===============EVENTS-HANDLER===============
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setToggleState({ ...toggleState, [anchor]: open });
  };

  /**
   * Clean the Auth reducer
   */
  const signOut = () => {
    window.location.replace("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={"hey"}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(anchor, true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor={anchor}
                  open={toggleState[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  <AppDrawer />
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ height: 65, width: 180 }}
          />
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button
            color="inherit"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              signOut();
            }}
          >
            SIGN OUT{" "}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
