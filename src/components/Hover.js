import React from 'react'

export default class Hover extends React.Component {
  state = {
    hover: false,
  }

  // move Enter trigger
  mouseEnter = () => {
    this.setState({
      hovering: true,
    })
  }

  // mouse Exit trigger
  mouseExit = () => {
    this.setState({
      hovering: false,
    })
  }

  render() {
    return (
      <div onMouseOver={this.mouseEnter} onMouseOut={this.mouseExit}>
        {this.props.children(this.state.hovering)}
      </div>
    )
  }
}
