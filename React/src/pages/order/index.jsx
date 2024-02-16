import React, { Component } from "react";
import "./index.scss";
import { connect } from "react-redux";

@connect(
  ({ count }) => ({
    count,
  }),
  ({ count: { handleCount } }) => ({
    handleCount: (value) => handleCount(value),
  })
)
class Index extends Component {
  render() {
    return (
      <div className="index">
        <p onClick={() => this.props.handleCount(1)}>异步action</p>
        <p>{this.props.count.num}</p>
        <p>当前页面：订单</p>
      </div>
    );
  }
}

export default Index;
