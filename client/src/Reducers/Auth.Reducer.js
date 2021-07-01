import defultUserPic from "../static/user.png";

const initState = {
  userName: "user",
  userImage: defultUserPic,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        userName: action.payload.userName,
        userImage: action.payload.userImage,
      };

    default:
      return state;
  }
};

export default AuthReducer;
