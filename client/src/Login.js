import {
  Button,
  FormControl,
  TextField,
  styled,
} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";

import React from "react";
import bannerImage from './assets/images/bg-img.png';
import bubbleVector from './assets/images/bubble.svg';
import { connect } from "react-redux";
import { login } from "./store/utils/thunkCreators";
import { theme } from "./themes/theme";

const Root = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '4fr 6fr',
  }
}));

const SideBanner = styled('div')(({ theme }) => ({
  background: `top center / cover no-repeat url(${bannerImage})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  minHeight: '100vh',
  position: 'relative',

  '&::before': {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8532,
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },

  '& *': {
    zIndex: 1,
  },

  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}));

const BannerText = styled('span')(({ theme }) => ({
  fontSize: '26pt',
  lineHeight: '40px',
  textAlign: 'center',
  marginTop: 39,
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const Container = styled('div')({
  padding: '30px 42px',
  display: 'flex',
  gap: 86,
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
});

const Heading = styled('div')({
  display: 'flex',
  gap: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const HeadingText = styled('span')(({ theme }) => ({
  fontSize: '14pt',
  color: theme.palette.secondary.main,
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontSize: '14pt',
  fontWeight: 600,
  padding: '16px 33px',
}));

const LoginInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.secondary.main,
    fontSize: '14pt',
  },

  '& .MuiInputLabel-formControl': {
    transform: 'translate(0, 40px)',
  },

  '& .MuiInputLabel-shrink': {
    transform: 'translate(0, 1.5px)',
  },

  '& label + .MuiInput-formControl': {
    marginTop: 40,
  },
}));

const FormBase = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const FormContent = styled('form')({
  flex: '0 1 380px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

const FormTitle = styled('span')(({ theme }) => ({
  fontSize: '26pt',
  fontWeight: 600,
  lineHeight: '40px',
}));

const LoginButton = styled(Button)(({ theme }) => ({
  alignSelf: 'center',
  fontSize: '16pt',
  fontWeight: 'bold',
  lineHeight: '20px',
  padding: '18px 60px',
}));

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Root>
      <SideBanner>
        <img src={bubbleVector} alt="" />
        <BannerText >Converse with anyone<br />with any language</BannerText>
      </SideBanner>
      <Container>
        <Heading>
          <HeadingText>Don't have an account?</HeadingText>
          <CreateAccountButton onClick={() => history.push("/register")} variant="contained">
            Create account
          </CreateAccountButton>
        </Heading>
        <FormBase>
          <FormContent onSubmit={handleLogin}>
            <FormTitle>Welcome back!</FormTitle>
            <FormControl margin="normal" required>
              <LoginInput
                aria-label="E-mail address"
                label="E-mail address"
                name="username"
                type="text"
                style={{ marginTop: 33 }}
              />
            </FormControl>
            <FormControl margin="normal" required>
              <LoginInput
                label="Password"
                aria-label="Password"
                type="password"
                name="password"
                style={{ marginTop: 38, marginBottom: 60 }}
              />
            </FormControl>
            <LoginButton type="submit" variant="contained" color="primary" disableElevation>
              Login
          </LoginButton>
          </FormContent>
        </FormBase>
      </Container>
    </Root>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
