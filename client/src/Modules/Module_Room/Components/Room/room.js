import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./room.css";
import MassageForm from "../MassageForm/MassageForm";
import Messages from "../Messages/Messages";
import UserList from "../../../Module_User/Components/User_List/User.List";

import ScrollToBottom from "react-scroll-to-bottom";
import ROOMUSERS from "../../../../data/RoomUsers.Data";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//=============REDUCER-CONNECTION================
function mapStateToProps(state) {
  return {
    storeuUsers: state.users.users,
    rooms: state.rooms.rooms,
    selectedRoom: state.rooms.selectedRoom,
    userName: state.me.userName,
    userImage: state.me.userImage,
  };
}

let socket;

const Room = ({ selectedRoom, rooms, storeuUsers, userName, userImage }) => {
  //=============STATES================
  const [name, setName] = useState(userName);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState(storeuUsers);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState(rooms[0].roomName);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const ENDPOINT = "localhost:8000";
  const history = useHistory();
  
  // Listener for authentication
  useEffect(() => {
    if (userName === "user" || userName === undefined) {
      goto401page();
    }
  }, [userName]);

  // Listener for socket connection
  useEffect(() => {
    socketConnection();
    emitToRoom();
    return () => {
      socketDisconnection();
    };
  }, [ENDPOINT]);

  // Listener for changing rooms
  useEffect(() => {
    setRoomName(rooms[selectedRoom].roomName);
    usersPerRooms();
    setRoom(rooms[selectedRoom].roomName);
  }, [selectedRoom]);

  //Listener for update messages array whenever a message is sent by admin or user
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  //=============SOCKET-HANDLERS================
  /**
   * Create socket connection
   * @param {string} URL Endpoint to route.
   * @return {boolean} status
   */
  const socketConnection = () => {
    socket = io(ENDPOINT);
  };

  /**
   * Distructor to socket connection
   */
  const socketDisconnection = () => {
    socket.emit("disconnect");
    socket.off();
  };

  /**
   * sending messages bu\y Socet
   * @param {event} e Endpoint to route.
   * @return {void}
   */

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // need middleware of validation if user exist and if room exist!!
  /**
 * Socket emit to room with room and user param
 *
 * @param {string} UserName User name.
 * @param {string} roomName Room name.

 * @return {boolean} status
 */
  const emitToRoom = () => {
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };

  //=============EVENT-HANDLERS================
  const usersPerRooms = () => {
    const filteredUsers = ROOMUSERS.filter((raw) => raw.roomName === roomName);
    if (filteredUsers) {
      innerJoin(filteredUsers);
    }
  };

  function goto401page() {
    history.push("/401");
  }

  /**
   * join between room's users and users
   * @param {Array[objects]} filteredUsers
   * @return {void}
   */
  const innerJoin = (filteredUsers) => {
    let usersImages = new Array([]);
    let result = new Array([]);
    // eslint-disable-next-line array-callback-return
    usersImages = users.filter((user) => {
      if (
        filteredUsers.find(
          (filterUser) => filterUser.userName === user.userName
        )
      ) {
        return user;
      }
    });
    for (let index = 0; index < usersImages.length; index++) {
      result.push({
        userName: filteredUsers[index].userName,
        userImage: usersImages[index].userImage,
        roomName: filteredUsers[index].roomName,
      });
    }
    result.splice(0, 1);
    setFilteredUsers([ {userName, userImage}, ...result]);
  };

  return (
    <div>
      <div className="outer">
        <div className="chat-container">
          <div className="search-container" style={{ background: "#2dd54a" }}>
            <h1 style={{ marginLeft: -22 }}>Users</h1>
          </div>

          <div className="conversation-list" style={{ background: "#2dd54a" }}>
            <UserList users={filteredUsers} />
          </div>

          <div
            className="new-message-container"
            style={{ background: "#2dd54a" }}
          ></div>

          <div className="chat-title">
            <h1 style={{ fontSize: 24, color: "black" }}>
              Room -{" "}
              <span style={{ fontSize: 24, color: "#2dd54a" }}>{roomName}</span>
            </h1>
          </div>

          <ScrollToBottom className="chat-message-list">
            <Messages messages={messages} name={name} />
          </ScrollToBottom>

          <div className="chat-form">
            <MassageForm
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Room);
