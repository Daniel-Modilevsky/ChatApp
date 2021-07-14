import React from "react";
import { connect } from "react-redux";
import { register } from "../Modules/Module_User/Actions/auth.action";
import { addUser } from "../Modules/Module_User/Actions/users.action";

//UI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import defUserPic from "../static/user.png";
import logo from "../static/chatApp.png";
import { useHistory } from "react-router-dom";

/*REDUCER-CONNECTION*/
function mapStateToProps(state) {
  return {
    userss: state.users.users,
    userName: state.me.userName,
    userImage: state.me.userImage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setterMe: (userName, userPic) => dispatch(register(userName, userPic)),
    setterUsers: (userName, userPic) => dispatch(addUser(userName, userPic)),
  };
}

const Auth = ({ userss, userName, userImage, setterMe, setterUsers }) => {
  const [newUserPic, setNewUserPic] = React.useState(userImage);
  const [newUserName, setNewUserName] = React.useState("");

  const [users, setUsers] = React.useState(userss);

  const [errorMsg, setErrorMsg] = React.useState("you forget user name");
  const [errorFlag, setErrorFlag] = React.useState(false);

  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    if(userName!=='user' && userName!==undefined){
      gotoHomepage();
    }
  }, [userName]);


  //EVENT-HANDLERS
  const handleNewUserName = (event) => {
    setNewUserName(event.target.value);
  };

  function gotoHomepage() {
    history.push("/homepage");
  }

  const memoizedHandleClick = React.useCallback((e) => {
    setNewUserPic(URL.createObjectURL(e.target.files[0]));
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }
    if (newUserPic === "") {
      setUsers([{ userName: newUserName, userImage: defUserPic }, ...users]);
      setNewUserPic(defUserPic);
    }

    setterMe(newUserName, newUserPic);
    setterUsers(newUserName, newUserPic);
    const me = {
      userName:newUserName,
      userImage: newUserPic
    };
  };

  const validForm = () => {
    if (newUserName === "User Name..." || newUserName === "") {
      setErrorMsg("you forget User name");
      setErrorFlag(true);
      return false;
    } else if (users.find((user) => user.userName === newUserName)) {
      setErrorMsg("User Name Excist");
      setErrorFlag(true);
      return false;
    }
    setErrorFlag(false);
    return true;
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <img
        src={
          "https://www.animatedimages.org/data/media/523/animated-hello-image-0067.gif"
        }
        alt={"hey"}
        style={{ position: "absolute", marginTop: "15%", marginLeft: "22%" }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} alt={"logo"} style={{ width: 160, height: 80 }} />
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: "#3f51b5",
              fontSize: 22,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Sign in
          </Typography>
          {errorFlag && (
            <h5 style={{ color: "red", marginLeft: 10 }}>{errorMsg}</h5>
          )}
          <form className={classes.form} noValidate onSubmit={signUp}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={newUserName}
              onChange={handleNewUserName}
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
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{ marginTop: 10, marginLeft: "45%" }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://techweez.com/wp-content/uploads/2020/01/Telegram-chat-background.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
