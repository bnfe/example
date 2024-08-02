import React, { Component, useState, useEffect } from "react";
import "./index.scss";
import { connect, useStore, useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function TestRedux(props) {
  const store = useStore();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  console.log(store.getState(), count);
  const handleDispatch = () => {
    dispatch({ type: "count/handleCount", payload: 1 });
  };
  return <p onClick={handleDispatch}>{props.name}</p>;
}

function TestReact(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p onClick={() => setCount(count + 1)}>{props.name}</p>
      <p>{count}</p>
    </div>
  );
}

function TestRouter(props) {
  const history = useHistory();
  const handlePath = () => {
    history.push("/order");
  };
  return <p onClick={handlePath}>{props.name}</p>;
}

@connect(
  ({ count }) => ({
    count,
  }),
  ({ count: { handleCount } }) => ({
    handleCount: (value) => handleCount(value),
  })
)
class Index extends Component {
  handlePath(path) {
    this.props.history.push(path);
  }
  render() {
    return (
      <div className="index">
        <p onClick={() => this.props.handleCount(1)}>测试 rematch：异步action</p>
        <p>{this.props.count.num}</p>
        <TestRedux name="测试redux hooks" />
        <TestReact name="测试react hooks" />
        <TestRouter name="测试router hooks：跳转订单" />
        <div className="path">
          {/* <Link to="/order">订单</Link>
          <Link to="/user">我的</Link>
          <Link to="/detail">详情</Link> */}
          <p onClick={this.handlePath.bind(this, "/order")}>订单</p>
          <p onClick={this.handlePath.bind(this, "/user")}>我的</p>
          <p onClick={this.handlePath.bind(this, "/detail")}>详情</p>
        </div>
      </div>
    );
  }
}

export default Index;
