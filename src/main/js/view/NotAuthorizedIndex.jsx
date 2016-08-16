import React from "react";
import {Link} from "react-router";
import GitHub from "../repository/GitHub.jsx";
import ErrorHeader from "./ErrorHeader.jsx";
import Footer from "./Footer.jsx";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.github = new GitHub();
  }

  componentDidMount() {
    this.github.findEvents('gradleupdate')
      .then((xhr, events) => this.setState({events: events}))
      .catch((e) => this.setState({error: e}));
  }

  render() {
    return (
      <div className="container">
        <ErrorHeader kind="API Error" message={this.state.error}/>

        <section className="text-center">
          <div className="page-header">
            <h1>Gradle Update</h1>
            <p>keeps the latest Gradle wrapper on your GitHub repositories</p>
          </div>

          <Link to="/signin" className="btn btn-primary">
            Sign in with GitHub Account
          </Link>
        </section>

        <section className="text-center">
          <h2>Timeline</h2>
          <GUEvents events={this.state.events}/>
        </section>

        <Footer/>
      </div>
    );
  }
}

class GUEvents extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.events ? this.props.events
          .filter((event) => event.type == 'PullRequestEvent')
          .map((event) => (
            <li className="list-group-item">
              <strong>
                {event.payload.pull_request.title}
              </strong>
              &nbsp;
              into
              &nbsp;
              <Link to={`/${event.repo.name}/status`}>{event.repo.name}</Link>

              <small className="pull-right">
                {this.timestamp(event.payload.pull_request.updated_at)}
              </small>
              <div className="clearfix"></div>
            </li>
          )) : null}
      </ul>
    );
  }
  timestamp(dateString) {
    return new Date(dateString).toLocaleString();
  }
}
