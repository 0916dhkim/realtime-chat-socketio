import { BadgeAvatar, ChatContent } from "../Sidebar";
import React, { Component } from "react";

import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { setActiveChat } from "../../store/activeConversation";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadCounter: {
    borderRadius: 10,
    height: 20,
    padding: "0 0.5em",
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    textAlign: "center",
  }
});

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  calculateUnreadCount() {
    const { messages, lastReadMessageId } = this.props.conversation;
    if (lastReadMessageId) {
      return messages.length - messages.findIndex((message) => message.id === lastReadMessageId) - 1;
    }
    return messages.length;
  }

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const unreadCount = this.calculateUnreadCount();

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {
          unreadCount !== 0 &&
          <Box className={classes.unreadCounter}>
            {unreadCount}
          </Box>
        }
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
