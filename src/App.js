import Nav from "./Components/nav/Nav";
import style from "./App.module.css";
import Burger from "react-css-burger";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from "./Components/logo/Logo";

import Project from "./Components/project/Project";
import Medium from "./Components/medium/Medium";
import axios from "axios";

// import DigitalInstallations from "./Components/digitalInstallations/DigitalInstallations";

import { Transition, animated } from "react-spring/renderprops";
import { CssTransition, TransitionGroup } from "react-transition-group";

import React, { Component } from "react";
import Axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/project`)
      .then((res) => {
        res.data.map((project) => {
          this.state.projects.push(project);
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className={style.container}>
          <div className={style.logoContainer}>
            <Logo />
          </div>

          <div className={style.navBar}>
            {/* <Nav projects={this.state.projects} /> */}
          </div>

          <Switch>
            {/* <Route path="/projects" exact component={Projects} /> */}
            <Route exact path="/:slug" component={Medium} />
            <Route exact path="/project/:slug" component={Project} />
            {/* <Route path="/:slug" component={Medium} /> */}
          </Switch>

          <div className={style.contentContainer}></div>
        </div>
      </Router>
    );
  }
}
