import React from "react";
import { getBlogList } from "../../api/index";
import loadingIcon from "../../components/LoadingIcon";
import store from "../../store";
import { observer } from "mobx-react";
import { Spin } from "antd";
import "./index.scss";

const BlogTypes = [
  { id: 1, name: "最新" },
  { id: 2, name: "js" },
  { id: 3, name: "vue" },
  { id: 4, name: "react" },
  { id: 5, name: "css" },
  { id: 6, name: "html" },
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

function Title(props) {
  return <h2 className="card-title">{props.title}</h2>;
}

function Static(props) {
  return (
    <div className="static">
      <Title title="分类" />
      {props.staticData.map((item) => (
        <div
          className="tag"
          key={item.name}
          onClick={() => props.onClick(item.id)}
        >{`${item.name}(${item.count})`}</div>
      ))}
    </div>
  );
}

function Main(props) {
  return (
    <div className="main">
      {/* <React.Fragment> */}
      {props.list.map((blog) => {
        return (
          <div
            className="blog-item"
            key={blog.number}
            onClick={() => props.onClick(blog.number)}
          >
            <h2>{blog.title}</h2>
            <p>{blog.body.slice(0, 100)}</p>
            <div className="info">
              <div className="tags">
                {blog.labels.map((label) => {
                  return (
                    <div
                      className={"tag " + label.description}
                      key={label.name}
                    >
                      {label.name}
                    </div>
                  );
                })}
              </div>
              <span>{blog.created_at.slice(0, 10)}</span>
            </div>
          </div>
        );
      })}
      {/* </React.Fragment> */}
      {!props.list.length && <div className="no-data">暂无更多数据</div>}
    </div>
  );
}

@observer
class OnePoetry extends React.Component {
  render() {
    return (
      <div className="everyday">
        <Title title="每日一诗" />
        <p>{store.poetry.content}</p>
        <p className="author">{`-- ${store.poetry.dynasty}⋅${store.poetry.author}`}</p>
      </div>
    );
  }
}

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sedItem: 1,
      blogList: [],
      spinning: false,
      staticData: [],
    };
    this.list = [];
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
    this.setState({
      spinning: true,
    });
    getBlogList()
      .then((res) => {
        this.setState({
          spinning: false,
        });
        this.list = res;

        // 当前列表数据
        if (id === 1) {
          this.setState({ blogList: [...this.list] });
        } else {
          let type = BlogTypes.find((type) => type.id === id).name;
          let list = this.list.filter((blog) =>
            blog.labels.some((label) => label.name.toLowerCase() === type)
          );
          this.setState({ blogList: [...list] });
        }

        // 统计数据
        let sdata = BlogTypes.map((item) => {
          let count = this.list.filter((blog) =>
            blog.labels.some((label) => label.name.toLowerCase() === item.name)
          ).length;
          return { ...item, count };
        });
        sdata.shift();
        this.setState({
          staticData: sdata,
        });
      })
      .catch((err) => {
        this.setState({
          spinning: false,
        });
        this.list = [];
      });
  }

  render() {
    return (
      <div className="blog">
        <div className="left">
          <Nav
            onClick={(id) => this.handleClick(id)}
            types={BlogTypes}
            sedItem={this.state.sedItem}
          />
          <Spin spinning={this.state.spinning} indicator={loadingIcon}>
            <Main
              list={this.state.blogList}
              onClick={(id) => this.handleToDetail(id)}
            />
          </Spin>
        </div>
        <div className="sidebar">
          <OnePoetry />
          <Static
            staticData={this.state.staticData}
            onClick={(id) => this.handleClick(id)}
          />
        </div>
      </div>
    );
  }
}
