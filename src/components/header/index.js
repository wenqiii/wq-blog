import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import avatar from "../../assets/imgs/1.jpg";
import "./index.scss";

const menu = [
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
];

function User() {
  return (
    <div className="user">
      <img src={avatar} className="avatar" />
      <div>
        <h1>wenqi</h1>
        <p>唯一的限制是你的想象力</p>
      </div>
    </div>
  );
}

// function Menu(props) {
//   return (
//     <Menu className="menu">
//       {props.menu.map((item) => {
//         return (
//           <Menu.Item key={item.name}>
//             <Link to={item.link}>{item.name}</Link>
//           </Menu.Item>
//         );
//       })}
//     </Menu>
//   );
// }

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, "pppp");
    this.state = {
      currentTab: props.currentTab
        ? props.currentTab[0].toUpperCase() + props.currentTab.slice(1)
        : "Blog",
    };
  }

  handleClick(tab) {
    this.setState({
      currentTab: tab.key,
    });
  }

  render() {
    const toggleHead = {
      transform: this.props.isHidden ? "translateY(-80px)" : "translateY(0px)",
      transition: "transform .5s",
    };

    return (
      <div className="header" style={toggleHead}>
        <div className="container">
          <User />
          {/* <Menu menu={menu} /> */}
          <Menu
            className="menu"
            mode="horizontal"
            selectedKeys={this.state.currentTab}
            onClick={(e) => this.handleClick(e)}
          >
            {menu.map((item) => {
              return (
                <Menu.Item key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      </div>
    );
  }
}

export default Header;
