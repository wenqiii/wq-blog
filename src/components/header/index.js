import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/imgs/1.jpg";
import "./index.scss";

function User() {
  return (
    <div className="user">
      <img src={avatar} className="avatar" />
      <div>
        <h1>Wenqi</h1>
        <p>唯一的限制是你的想象力</p>
      </div>
    </div>
  );
}

function Menu(props) {
  return (
    <ul className="menu">
      {props.menu.map((item) => {
        return (
          <li key={item.name}>
            <Link to={item.link}>{item.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

class Header extends React.Component {
  render() {
    let menu = [
      { name: "Blog", link: "/blog" },
      { name: "About me", link: "/about" },
    ];

    const toggleHead = {
      transform: this.props.isHidden ? "translateY(-80px)" : "translateY(0px)",
      transition: "transform .5s",
    };

    return (
      <div className="header" style={toggleHead}>
        <div className="container">
          <User />
          <Menu menu={menu} />
        </div>
      </div>
    );
  }
}

export default Header;
