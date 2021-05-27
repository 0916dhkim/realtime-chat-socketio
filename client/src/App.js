import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Routes from "./routes";
import store from "./store";
import { theme } from "./themes/theme";

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
