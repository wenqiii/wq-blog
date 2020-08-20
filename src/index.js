import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import About from "./views/About";
import CreateBlog from "./views/CreateBlog";
import Blog from "./views/Blog";
import Detail from "./views/Blog/detail";
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
    window.addEventListener("scroll", (e) => this.handleScroll(e));
  }

  componentWillUnmount() {
    const node = this.myApp.current;
    window.removeEventListener("scroll", (e) => this.handleScroll(e));
  }

  render() {
    return (
      <div className="app" ref={this.myApp}>
        <Header isHidden={store.isHidden} />
        <div className="fixedH"></div>
        <Switch>
          <Route path="/blog" component={Blog} />
          <Route path="/blog-detail/:id" component={Detail} />
          <Route path="/about" component={About} />
        </Switch>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/create" component={CreateBlog} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
