import React from "react";

import "./MassageForm.css";

const MassageForm = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type message ..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      Send
      <img
        className="send-icon"
        src="https://image.flaticon.com/icons/png/512/2948/2948170.png"
        alt="send"
      />
    </button>
  </form>
);

export default MassageForm;
