import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import About from "./views/About";
import CreateBlog from "./views/CreateBlog";
import Blog from "./views/Blog";
import Detail from "./views/Blog/detail";
import Images from "./utils/getImage";
import axios from "axios";

import "./index.scss";
import "antd/dist/antd.css";

import store from "./store";
import { observer } from "mobx-react";

@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.prevTop = "";
    this.myApp = React.createRef();
    this.bgImg = Images[Math.floor(Math.random() * 5)];
  }

  handleScroll(e) {
    const node = this.myApp.current;
    let nodeInfo = node.getBoundingClientRect();
    if (!this.prevTop) {
      this.prevTop = nodeInfo.top;
      store.changeTop(nodeInfo.top);
    } else {
      let status = nodeInfo.top - this.prevTop < 0 ? true : false;
      store.changeHeaderStatus(status);
      store.changeTop(nodeInfo.top);
      this.prevTop = "";
    }
  }
  componentDidMount() {
    this.props.history.push("/blog");
    axios
      .get("https://v2.jinrishici.com/one.json")
      .then((res) => {
        console.log(res, "response");
        store.changePoetry({
          ...res.data.data.origin,
          content: res.data.data.content,
        });
      })
      .catch((err) => {
        store.changePoetry({});
      });

    window.addEventListener("scroll", (e) => this.handleScroll(e));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", (e) => this.handleScroll(e));
  }

  render() {
    console.log(this.props, "this.props");
    return (
      <div className="app" ref={this.myApp}>
        <div
          className="cover-bg"
          style={{ backgroundImage: `url(${this.bgImg})` }}
        ></div>
        <Header
          isHidden={store.isHidden}
          currentTab={this.props.location.pathname.slice(1)}
        />
        <div className="fixedH"></div>
        <Switch>
          <Route path="/blog" component={Blog} />
          <Route path="/blog-detail/:id" component={Detail} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/create" component={CreateBlog} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
