import { Button, CssBaseline, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { fetchConversations, logout } from "../store/utils/thunkCreators";

import { ActiveChat } from "./ActiveChat";
import { Redirect } from "react-router-dom";
import { SidebarContainer } from "./Sidebar";
import { clearOnLogout } from "../store/index";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "97vh",
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  componentDidMount() {
    this.props.fetchConversations();
  }

  handleLogout = async () => {
    await this.props.logout(this.props.user.id);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user.id) {
      // If we were previously logged in, redirect to login instead of register
      if (this.state.isLoggedIn) return <Redirect to="/login" />;
      return <Redirect to="/register" />;
    }
    return (
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        <Button className={classes.logout} onClick={this.handleLogout}>
          Logout
        </Button>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <SidebarContainer />
          <ActiveChat />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
