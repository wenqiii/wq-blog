import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import About from "./views/About";
import CreateBlog from "./views/CreateBlog";
import Blog from "./views/Blog";
import Detail from "./views/Blog/detail";
import "./index.scss";

import store from "./store";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.prevScrollTop = "";
    this.state = {
      isHidden: false,
    };
    this.myApp = React.createRef();
  }

  handleScroll(e) {
    if (!this.prevScrollTop) {
      this.prevScrollTop = e.target.scrollTop;
    } else {
      this.setState({
        isHidden: e.target.scrollTop - this.prevScrollTop > 0 ? true : false,
      });
      this.prevScrollTop = "";
    }
  }
  componentDidMount() {
    console.log(store, store.isHidden);
    const node = this.myApp.current;
    node.addEventListener("scroll", (e) => this.handleScroll(e));
  }

  componentWillUnmount() {
    const node = this.myApp.current;
    node.removeEventListener("scroll", (e) => this.handleScroll(e));
  }

  render() {
    return (
      <div className="app" ref={this.myApp}>
        <Header isHidden={this.state.isHidden} />
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
