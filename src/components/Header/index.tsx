import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'umi';
import { Menu } from 'antd';

import avatar from '@/assets/imgs/1.jpg';
import { menu } from '@/layouts/constant';

import ss from './index.less';

interface IProps {
  isHidden?: boolean;
  tab?: string;
}

const User = (props: { name?: string; desc?: string }) => {
  const { name = 'wenqi', desc = '唯一的限制是你的想象力' } = props;
  return (
    <div className={ss.user}>
      <img src={avatar} className={ss.avatar} alt="avatar" />
      <div>
        <h1>{name}</h1>
        <p>{desc}</p>
      </div>
    </div>
  );
};

const Header: React.FC<IProps> = (props) => {
  const { tab, isHidden } = props;

  const [currentTab, setCurrentTab] = useState<string>('Blog');

  useEffect(() => {
    if (tab) {
      setCurrentTab(tab[0].toUpperCase() + tab.slice(1));
    }
  }, [tab]);

  const handleClick = useCallback((tab) => {
    setCurrentTab(tab.key);
  }, []);

  const headerStyle = useMemo(() => {
    return {
      transform: isHidden ? 'translateY(-80px)' : 'translateY(0px)',
      transition: 'transform .5s',
    };
  }, [isHidden]);

  return (
    <div className={ss.header} style={headerStyle}>
      <div className={ss.container}>
        <User />
        <Menu
          className={ss.menu}
          mode="horizontal"
          selectedKeys={[currentTab]}
          onClick={(e) => handleClick(e)}
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
};

export default Header;
