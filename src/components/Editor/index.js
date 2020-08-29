import * as React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./index.scss";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const editorConfig = {
  canView: {
    // 可以展示的项目
    fullScreen: false,
    menu: true,
    md: true,
    html: true,
    hideMenu: true,
  },
  view: {
    // 默认展示的项目
    menu: true,
    md: true,
    html: true,
  },
};

export default (props) => {
  return (
    <div className="my-editor">
      <MdEditor
        style={{ height: "100%" }}
        markdownClass="md"
        renderHTML={(text) => mdParser.render(text)}
        config={editorConfig}
        placeholder="请开始你的表演"
        onChange={(con) => props.onChange(con)}
      />
    </div>
  );
};
