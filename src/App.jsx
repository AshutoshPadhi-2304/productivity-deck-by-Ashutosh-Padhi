import { PageNotFound, Sidebar } from "components/commons";
import Favorite from "components/Favorite";
import Kanban from "components/Kanban";
import News from "components/News";
import Pomodero from "components/Pomodero";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <div className="App">
    <div className="flex flex-row items-center justify-items-start">
      <Sidebar />
      <Switch>
        <Route exact component={Kanban} path={routes.kanban} />
        <Route exact component={Pomodero} path={routes.pomodero} />
        <Route exact component={News} path={routes.news} />
        <Route exact component={Favorite} path={routes.favorite} />
        <Redirect exact from={routes.root} to={routes.kanban} />
        <Route exact component={PageNotFound} path="*" />
      </Switch>
    </div>
  </div>
);

export default App;
