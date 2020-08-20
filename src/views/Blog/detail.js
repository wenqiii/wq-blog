import React from "react";
import MarkdownIt from "markdown-it";
import BlogList from "../../mock/blogs.json";
import "react-markdown-editor-lite/lib/index.css";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import "./detail.scss";
import store from "../../store";
import { observer } from "mobx-react";

import { Anchor } from "antd";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const text = {
  __html: window.localStorage.blog
    ? mdParser.render(JSON.parse(window.localStorage.blog).text)
    : "",
};

@observer // 使class变成响应式
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
    };
    this.myDetail = React.createRef();
  }

  componentWillMount() {
    this.setState({
      blog: BlogList.list.filter(
        (blog) => blog.blog_id == this.props.match.params.id
      )[0],
    });
  }

  render() {
    return (
      <div className="blog-detail" ref={this.myDetail}>
        <div className="article">
          <h1>{this.state.blog.title.slice(0, -3)}</h1>
          <div
            className="custom-html-style content"
            dangerouslySetInnerHTML={text}
          ></div>
        </div>
        <div className={store.top < -100 ? "catalog is-fixed" : "catalog"}>
          <div className="content">
            <div className="markNav-title">文章目录</div>
            <MarkNav
              className="article-menu"
              source={JSON.parse(window.localStorage.blog).text}
              headingTopOffset={-20}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
