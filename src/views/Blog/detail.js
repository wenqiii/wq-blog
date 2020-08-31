import React from "react";
import MarkdownIt from "markdown-it";
// import BlogList from "../../mock/blogs.json";
import { Spin } from "antd";
import loadingIcon from "../../components/LoadingIcon";
import { getBlogDetail } from "../../api/index";

import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import "./detail.scss";
import store from "../../store";
import { observer } from "mobx-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/vs2015.css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

@observer // 使class变成响应式
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      spinning: true,
    };
    this.myDetail = React.createRef();
  }

  componentWillMount() {
    getBlogDetail({ id: this.props.match.params.id }).then((res) => {
      this.setState({
        blog: res,
        spinning: false,
      });
    });
    // this.setState({
    //   blog: {
    //     body: window.localStorage.blog
    //       ? JSON.parse(window.localStorage.blog).text
    //       : "",
    //   },
    // });
  }

  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }
  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting() {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <Spin spinning={this.state.spinning} indicator={loadingIcon}>
        <div className="blog blog-detail" ref={this.myDetail}>
          <div className="article">
            <h1>{this.state.blog.title}</h1>
            <div
              className="markdown-style content"
              dangerouslySetInnerHTML={{
                __html: this.state.blog.body
                  ? mdParser.render(this.state.blog.body)
                  : "",
              }}
            ></div>
          </div>
          <div className={store.top < -100 ? "catalog is-fixed" : "catalog"}>
            <div className="content">
              <div className="markNav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={this.state.blog.body}
                headingTopOffset={-20}
              />
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Detail;
