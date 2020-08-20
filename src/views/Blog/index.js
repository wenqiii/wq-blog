import React from "react";
import BlogList from "../../mock/blogs.json";
import "./index.scss";

const BlogTypes = [
  { id: 1, name: "最新" },
  { id: 2, name: "js" },
  { id: 3, name: "vue" },
  { id: 4, name: "react" },
];

function Nav(props) {
  return (
    <div className="nav">
      <ul>
        {props.types.map((item) => {
          return (
            <li
              className={props.sedItem === item.id ? "active type" : "type"}
              key={item.id}
              onClick={() => props.onClick(item.id)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Main(props) {
  return (
    <div className="main">
      {props.list.map((blog) => {
        return (
          <div
            className="blog-item"
            key={blog.blog_id}
            onClick={() => props.onClick(blog.blog_id)}
          >
            <h2>{blog.title.slice(0, -3)}</h2>
            <p>{blog.text.slice(0, 100)}</p>
            <div className="info">
              <span>{blog.create_time.slice(0, 10)}</span>
              <div className="tag">{blog.tag}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sedItem: 1,
      list: [],
    };
  }
  componentWillMount() {
    this.loadBlog(1);
  }

  handleClick(id) {
    this.loadBlog(id);
    this.setState({
      sedItem: id,
    });
  }

  handleToDetail(id) {
    this.props.history.push("/blog-detail/" + id);
  }

  loadBlog(id) {
    this.state.list = BlogList.list
      .filter((blog) => blog.type == id)
      .sort((blog1, blog2) => {
        return new Date(blog2.create_time) - new Date(blog1.create_time);
      });
  }

  render() {
    return (
      <div className="blog">
        <Nav
          onClick={(id) => this.handleClick(id)}
          types={BlogTypes}
          sedItem={this.state.sedItem}
        />
        <Main
          list={this.state.list}
          onClick={(id) => this.handleToDetail(id)}
        />
      </div>
    );
  }
}
