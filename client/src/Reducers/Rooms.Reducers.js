import defaultRoom from "../static/defaultRoom.png";
import lobbyPic from "../static/lobby.png";
import bitCoinPic from "../static/bitcoin.png";
import ethereumPic from "../static/ethereum.png";
import dogecoinPic from "../static/dogecoin.png";

const initState = {
  rooms: [
    { roomName: "Lobby", roomImage: lobbyPic, usersNumber: 0 },
    { roomName: "BitCoin", roomImage: bitCoinPic, usersNumber: 0 },
    { roomName: "Ethereum", roomImage: ethereumPic, usersNumber: 0 },
    { roomName: "Dogecoin", roomImage: dogecoinPic, usersNumber: 0 },
    { roomName: "Room1", roomImage: defaultRoom, usersNumber: 0 },
    { roomName: "Room2", roomImage: defaultRoom, usersNumber: 0 },
  ],
  selectedRoom: 0,
};

const RoomsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ROOM":
      return {
        ...state,
        localRooms: [action.payload, ...this.localRooms],
      };

    case "SELECT_ROOM":
      return {
        ...state,
        selectedRoom: action.payload,
      };

    default:
      return state;
  }
};

export default RoomsReducer;
