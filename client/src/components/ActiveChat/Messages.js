import { OtherUserBubble, SenderBubble } from "../ActiveChat";
import React, { useEffect } from "react";

import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import { readMessage } from "../../store/utils/thunkCreators";

const Messages = (props) => {
  const { messages, otherUser, userId, readMessage } = props;

  useEffect(() => {
    readMessage(messages[messages.length - 1]);
  }, [messages, readMessage]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessage: (message) => {
      dispatch(readMessage(message));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(Messages);
