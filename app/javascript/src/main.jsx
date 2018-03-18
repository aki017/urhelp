import React from 'react'
import DumpView from "../src/dump-view"
import { Col, Form, FormGroup, FormControl, Grid, Row } from "react-bootstrap"

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      builds: [],
      left_id: -1,
      right_id: -1,
      left: {
        artifacts: []
      },
      right: {
        artifacts: []
      }

    }

    let params = new URLSearchParams(location.search.slice(1));
    if(params.has("a")){
      this.state.right_id = params.get("a");
    }
    if(params.has("b")){
      this.state.left_id = params.get("b");
    }
    this.loadBuilds();
    this.loadArtifacts("left", this.state.left_id);
    this.loadArtifacts("right", this.state.right_id);
  }

  loadBuilds() {
    fetch("/builds", {credentials: "same-origin"})
      .then((r)=> r.json())
      .then((json)=> this.setState({builds: json}))
  }

  loadArtifacts(t, id) {
    fetch(`/builds/${id}`, {credentials: "same-origin"})
      .then((r)=> r.json())
      .then((json)=> this.setState({[t]: json}))
  }
  setBuild(t, id) {
    this.setState({[t +"_id"]: id});
    this.loadArtifacts(t,id);
  }

  listTargets() {
    let l = this.state.left.artifacts.map(a => a.path);
    let r = this.state.right.artifacts.map(a => a.path);
    let targetNames = [...new Set([...l, ...r])].filter(n => n.startsWith("screenshot"));
    return targetNames.map(n => ({
      path: n,
      before: (this.state.left.artifacts.find(a => a.path == n)||{}).url,
      after: (this.state.right.artifacts.find(a => a.path == n)||{}).url
    }));
  }


  renderBuildSelector(t) {
    return <FormControl
      componentClass="select"
      onChange={(e)=>this.setBuild(t, e.target.value)}
      value={this.state[t+"_id"]}>
      {this.state.builds
        .map((t)=> <option key={t.build_num} value={t.build_num}>
          {t.build_num}: |{t.branch}| {t.subject} [{t.vcs_revision.substr(0,6)}] @{t.committer_name}
        </option>)}
      <option value={-1}>-1</option>
    </FormControl>
  }
  render() {
    return <main role="main" className="container">
      <Form inline>
        <FormGroup>
          {this.renderBuildSelector("left")}
        </FormGroup>
        <FormGroup>
          {this.renderBuildSelector("right")}
        </FormGroup>
      </Form>
      {this.listTargets().map(t => <DumpView {...t} />)}
      <Grid>
        <Row>
          <Col md={6}>
            <ul>
              {this.state.left.artifacts.map(a => <li key={a.path}>
                {a.path}
              </li>)}
            </ul>
          </Col>
          <Col md={6}>
            <ul>
              {this.state.right.artifacts.map(a => <li>
                {a.path}
              </li>)}
            </ul>
          </Col>
        </Row>
      </Grid>
    </main>
  }
}

export default Main;
