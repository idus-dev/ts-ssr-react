import { Route, Switch } from "react-router-dom";
import React from "react";

import Navigation from "./components/Navigation";
import NoMatch from "./pages/NoMatch";
import routes from "./routes";
import { NormalizeStyle } from "./components/GlobalStyles";

const App = () => (
  <main>
    <NormalizeStyle />
    <Navigation />
    <Switch>
      {routes.map(({ path, exact, component: C, ...rest }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={props => <C {...props} {...rest} />}
        />
      ))}
      <Route render={props => <NoMatch {...props} />} />
    </Switch>
  </main>
);

export default App;
