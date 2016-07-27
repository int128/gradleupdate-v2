import React from "react";
import {Link} from "react-router";
import OAuthSession from "../repository/OAuthSession.jsx";
import GitHub from "../repository/GitHub.jsx";
import GradleUpdate from "../repository/GradleUpdate.jsx";
import ErrorHeader from "./ErrorHeader.jsx";
import Footer from "./Footer.jsx";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.github = new GitHub(OAuthSession.getToken());
    this.gradleUpdate = new GradleUpdate(OAuthSession.getToken());
  }

  componentDidMount() {
    const params = this.props.params;
    this.github.findRepository(`${params.user}/${params.repo}`)
      .then((xhr, repository) => this.setState({ghRepository: repository}))
      .catch((e) => this.setState({error: e}));
  }

  render() {
    const params = this.props.params;
    return (
      <div className="container">
        <ErrorHeader kind="API Error" message={this.state.error}/>

        <section className="text-center">
          <Header/>
        </section>

        <section className="text-center">
          <Repository repository={this.state.ghRepository}/>
          <Badge repository={this.state.ghRepository}/>
          <GradleStatus repository={this.state.ghRepository}/>
        </section>

        <Footer/>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Gradle Update</h1>
          <p>keeps the latest Gradle wrapper on your GitHub repositories</p>
        </div>
        {OAuthSession.isAuthorized() ? (
          <Link to="/" className="btn btn-default">View My Repositories</Link>
        ) : (
          <Link to="/signin" className="btn btn-default">Sign in with GitHub Account</Link>
        )}
      </div>
    );
  }
}

class Repository extends React.Component {
  render() {
    return this.props.repository ? (
      <div>
        <img src={this.props.repository.owner.avatar_url} className="img-circle" width="128" height="128"/>
        <h2>{this.props.repository.full_name}</h2>
        <p>{this.props.repository.description}</p>
      </div>
    ) : null;
  }
}

class Badge extends React.Component {
  render() {
    if (this.props.repository) {
      const svgUrl = `${location.origin}/${this.props.repository.full_name}/status.svg`;
      const linkUrl = `${location.origin}/${this.props.repository.full_name}/status`;
      return (
        <div>
          <p>
            <a href={linkUrl}><img src={svgUrl}/></a>
          </p>
          <dl>
            <dt>Markdown</dt>
            <dd><code>[![Gradle Status]({svgUrl})]({linkUrl})</code></dd>
          </dl>
          <dl>
            <dt>HTML</dt>
            <dd><code>{`<a href="${linkUrl}"><img src="${svgUrl}"/></a>`}</code></dd>
          </dl>
        </div>
      );
    } else {
      return null;
    }
  }
}

class GradleStatus extends React.Component {
  render() {
    return (
      <div>
        <h3>Status</h3>
        <h3>Pull Requests</h3>
      </div>
    );
  }
}
