import React from "react";
import { Link } from "react-router-dom";
import Editor from "../../components/Editor/index";
import avatar from "../../assets/imgs/1.jpg";
import "./index.scss";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/zenburn.css";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);

function EditorHeader(props) {
  return (
    <div className="editor-header">
      <div className="h-left">
        <input
          type="text"
          onInput={(e) => props.onInput(e)}
          placeholder="请输入标题"
        />
      </div>
      <div className="h-right">
        <button
          className={props.isActive ? "active publish" : "publish"}
          onClick={(e) => props.onPublish(e)}
        >
          发布
        </button>
        <Link to="/about">
          <img src={props.user.avatar} className="avatar" alt="avatar" />
        </Link>
      </div>
    </div>
  );
}

class CreateBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { avatar: avatar },
      blog: {
        title: "",
        content: "",
      },
    };
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

  handleInput(e) {
    // 处理标题输入
    this.setState({
      title: e.target.value,
    });
  }

  handleChange(content) {
    console.log(content);
    this.setState({
      content: content, // content: {html, text}
    });
  }

  handlePublish() {
    // 发布
    if (!this.state.title) return;
    window.localStorage.setItem(
      "blog",
      JSON.stringify({
        text: this.state.content.text,
        title: this.state.title,
        html: this.state.content.html,
      })
    );
  }

  render() {
    return (
      <div className="create-blog">
        <EditorHeader
          user={this.state.user}
          isActive={this.state.title}
          onInput={(e) => this.handleInput(e)}
          onPublish={(e) => this.handlePublish(e)}
        />
        <Editor onChange={(con) => this.handleChange(con)} />
      </div>
    );
  }
}

export default CreateBlog;
