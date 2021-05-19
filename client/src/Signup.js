import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  styled,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import AuthPageLayout from "./components/AuthPageLayout";
import { connect } from "react-redux";
import { register } from "./store/utils/thunkCreators";

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

const SignupInput = styled(TextField)(({ theme }) => ({
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

const SignupButton = styled(Button)(({ theme }) => ({
  alignSelf: 'center',
  fontSize: '16pt',
  fontWeight: 'bold',
  lineHeight: '20px',
  padding: '18px 60px',
}));

const Signup = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthPageLayout>
      <Heading>
        <HeadingText>Already have an account?</HeadingText>
        <CreateAccountButton onClick={() => history.push("/login")} variant="contained">
          Login
          </CreateAccountButton>
      </Heading>
      <FormBase>
        <FormContent onSubmit={handleRegister}>
          <FormTitle>Create an account.</FormTitle>
          <FormControl>
            <SignupInput
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              required
              style={{ marginTop: 12 }}
            />
          </FormControl>
          <FormControl>
            <SignupInput
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
              style={{ marginTop: 40 }}
            />
          </FormControl>
          <FormControl error={!!formErrorMessage.confirmPassword}>
            <SignupInput
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              required
              style={{ marginTop: 40 }}
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!formErrorMessage.confirmPassword}>
            <SignupInput
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required
              style={{ marginTop: 40, marginBottom: 40 }}
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
          <SignupButton type="submit" variant="contained" color="primary" disableElevation>
            Create
            </SignupButton>
        </FormContent>
      </FormBase>
    </AuthPageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
