import { Box, styled } from "@material-ui/core";
import { OtherUserBubble, SenderBubble } from "../ActiveChat";
import React, { useEffect, useRef } from "react";

import moment from "moment";

const InvisibleEndMarker = styled("div")({
  height: 0,
});

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const messageEndRef = useRef();
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

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
      <InvisibleEndMarker id="message-end-marker" ref={messageEndRef} />
    </Box>
  );
};

export default Messages;
