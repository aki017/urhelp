import React from "react"
import ImageDiff from "@fritz-c/react-image-diff"
import { FormControl } from "react-bootstrap"

class DumpView extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      type: "difference",
      rate: 0.5
    };

  }

  render() {
    return <div>
      <h2>{this.props.path}</h2>
      <FormControl componentClass="select" onChange={(e)=>this.setState({type:e.target.value})} value={this.state.type}>
        {["difference", "fade", "swipe"].map((t)=> <option key={t} value={t}>{t}</option>)}
      </FormControl>
      <ImageDiff
        before={this.props.before}
        after={this.props.after}
        type={this.state.type}
        value={this.state.rate}
        width={600}
      />
      <FormControl componentClass="input"
        type="range"
        value={this.state.rate}
        onChange={(e)=> this.setState({rate: e.target.value-0})}
        step={0.001}
        min={0} max={1} />
    </div>
  }
}
export default DumpView;
