import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import Button from "@material-ui/core/Button";
import logo from "../static/chatApp.png";
import { styled } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import defaultRoomPic from "../static/defaultRoom.png";

import { connect } from "react-redux";
import {
  selectRoom,
  addRoom,
} from "../Modules/Module_Room/Actions/room.action";

/*REDUCER-CONNECTION*/
function mapStateToProps(state) {
  return {
    rooms: state.rooms.rooms,
    selectedRoom: state.rooms.selectedRoom,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setterRoom: (roomName, roomPic) => dispatch(addRoom(roomName, roomPic)),
    setterSelectRoom: (roomIndex) => dispatch(selectRoom(roomIndex)),
  };
}

function AppDrawer(props) {
  //===============STATE===============
  const [localRooms, setLocalRooms] = React.useState([...props.rooms]);

  const [errorMsg, setErrorMsg] = React.useState("you forget room name");
  const [errorFlag, setErrorFlag] = React.useState(false);
  const [createdFlag, setCreatedFlag] = React.useState(false);

  const [newRoomName, setNewRoomName] = React.useState("type room name..");
  const [newRoomPic, setNewRoomPic] = React.useState("");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  //===============EVENTS-HANDLER===============
  const handleNewRoomName = (event) => {
    setCreatedFlag(false);
    setNewRoomName(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelect = (room, index) => {
    console.log(room.roomName);
    props.setterSelectRoom(index);
  };

  const memoizedHandleClick = React.useCallback((e) => {
    console.log(e.target.files[0]);
    setNewRoomPic(URL.createObjectURL(e.target.files[0]));
  }, []);

  const validForm = () => {
    if (newRoomName === "type room name.." || newRoomName === "") {
      setErrorMsg("you forget room name");
      setErrorFlag(true);
      return false;
    } else if (localRooms.find((room) => room.roomName === newRoomName)) {
      setErrorMsg("Room Name Excist");
      setErrorFlag(true);
      return false;
    }
    setErrorFlag(false);
    setCreatedFlag(true);
    return true;
  };

  const addNewRoom = (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }
    if (newRoomPic === "") {
      setLocalRooms([
        { roomName: newRoomName, roomImage: defaultRoomPic, usersNumber: 0 },
        ...localRooms,
      ]);
      return;
    }
    setLocalRooms([
      { roomName: newRoomName, roomImage: newRoomPic, usersNumber: 0 },
      ...localRooms,
    ]);
    setNewRoomName("");
  };

  const drawer = (
    <div style={{ background: "white" }}>
      <div style={{ height: 70 }}>
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ width: 150, height: 65, marginLeft: 30 }}
        />
      </div>
      <Divider />
      <div
        style={{
          width: "90%",
          marginLeft: "5%",
          height: 200,
          marginTop: -15,
        }}
      >
        <h3 style={{ marginLeft: 10, color: "#3f51b5", fontFamily: "Georgia" }}>
          Create New Room
        </h3>
        {errorFlag && (
          <h5 style={{ color: "red", marginLeft: 10 }}>{errorMsg}</h5>
        )}
        {createdFlag && (
          <h5 style={{ color: "green", marginLeft: 10 }}>
            {newRoomName} room created!
          </h5>
        )}

        <form autoComplete="off" onSubmit={addNewRoom}>
          <TextField
            id="Room-Name"
            label="Room Name"
            placeholder="type room name.."
            multiline
            value={newRoomName}
            onChange={handleNewRoomName}
            style={{
              display: "inline-block",
              width: 150,
              marginLeft: 10,
              marginBottom: 15,
            }}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={memoizedHandleClick}
            />
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              style={{ marginTop: 10 }}
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              width: 200,
              marginLeft: 10,
              display: "block",
              marginBottom: 20,
            }}
          >
            Add New Room
          </Button>
        </form>
      </div>

      <Divider />

      <h3 style={{ marginLeft: 10, fontFamily: "Verdana" }}>Rooms</h3>
      <GridList
        style={{
          height: 400,
          display: "block",
          padding: 0,
          width: "90%",
          marginLeft: "5%",
        }}
      >
        {localRooms.map((room, index) => (
          <ListItem
            button
            key={room.roomName}
            style={{ height: 50, width: "100%" }}
            onClick={() => {
              handleSelect(room, index);
            }}
          >
            <img
              src={room.roomImage}
              alt={room.roomImage}
              style={{ height: 40, width: 40, marginRight: 40 }}
            />
            <ListItemText primary={room.roomName} />
          </ListItem>
        ))}
      </GridList>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

AppDrawer.propTypes = {
  window: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);

const drawerWidth = 300;

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    //    width: 350,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
