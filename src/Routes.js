import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Dashboard from "./user/Dashboard";
import PublicStories from "./stories/PublicStories";
import AddStory from "./stories/AddStory";
import GetStory from "./stories/GetStory";
import ManageStory from "./stories/ManageStory";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth/signin" exact component={Signin} />
        <Route path="/auth/signup" exact component={Signup} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/public/stories" exact component={PublicStories} />
        <PrivateRoute path="/stories/add" exact component={AddStory} />
        <PrivateRoute path="/story/:storyId" exact component={GetStory} />
        <PrivateRoute
          path="/story/edit/:storyId"
          exact
          component={ManageStory}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
