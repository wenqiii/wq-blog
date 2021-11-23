import React, { useState, useEffect, useMemo } from 'react';
import { useScroll } from 'ahooks';
import { useDispatch, useLocation, useSelector } from 'umi';

import Images from '@/utils/getImage';

import Header from '@/components/Header';

import ss from './index.less';

export default function BlogLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const [bgImg, setBgImg] = useState();
  const { top: prevTop } = useSelector((store) => store.global);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const windowScrollInfo = useScroll(document);

  useEffect(() => {
    setBgImg(Images[Math.floor(Math.random() * 5)]);
  }, []);

  useEffect(() => {
    const { top } = windowScrollInfo;
    if (prevTop === 0) {
      dispatch({
        type: 'global/changeTop',
        payload: top,
      });
    } else {
      const status = top - prevTop < 0 ? false : true; // <0代表上滑，需展示
      dispatch({
        type: 'global/changeTop',
        payload: top,
      });
      dispatch({
        type: 'global/changeHeaderStatus',
        payload: status,
      });
    }
  }, [windowScrollInfo]);

  const isBlogPage = useMemo(() => {
    return pathname.includes('/blog');
  }, [pathname]);

  return (
    <div className={ss.blogLayout}>
      <Header />
      <div className={ss.content}>{children}</div>
      {isBlogPage && (
        <div
          className={ss.coverBg}
          style={{ backgroundImage: `url(${bgImg})` }}
        />
      )}
    </div>
  );
}
