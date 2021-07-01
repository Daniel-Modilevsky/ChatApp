import DaniPic from "../static/Dani.png";
import motyPic from "../static/morty.png";
import milaPic from "../static/mila.jpg";
import yossiPic from "../static/yossi.jpg";

const initState = {
  users: [
    { userName: "Yossi", userImage: yossiPic },
    { userName: "Mila", userImage: milaPic },
    { userName: "Dani", userImage: DaniPic },
    { userName: "Moty", userImage: motyPic },
  ],
};

const UsersReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    default:
      return state;
  }
};

export default UsersReducer;
