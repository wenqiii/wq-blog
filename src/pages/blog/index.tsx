import { useCallback, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import cx from 'classnames';
import { history, useDispatch, useSelector } from 'umi';

import OnePoetry from '@/components/OnePoetry';
import { navList, BlogType } from '@/constant';
import { useLoading } from '@/hooks';

import ss from './index.less';

const Blog = () => {
  const [sedItem, setSedItem] = useState<number>(BlogType.Latest);

  const { blogList, statisticData } = useSelector((store) => store.blog);
  const loading = useLoading('blog/fetchBlogList');
  const dispatch = useDispatch();

  useEffect(() => {
    loadBlog(sedItem);
  }, []);

  const loadBlog = useCallback((id: number) => {
    dispatch({
      type: 'blog/fetchBlogList',
      payload: { id },
    });
  }, []);

  const handleClick = useCallback((id: number) => {
    loadBlog(id);
    setSedItem(id);
  }, []);

  const nav = useMemo(() => {
    return (
      <div className={ss.nav}>
        <ul>
          {navList.map((item) => {
            return (
              <li
                className={cx(ss.type, sedItem === item.id ? ss.active : '')}
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [sedItem]);

  const main = useMemo(() => {
    return (
      <div className={ss.main}>
        {blogList.map((blog) => {
          return (
            <div
              className={ss.blogItem}
              key={blog.number}
              onClick={() => history.push('/blog-detail/' + blog.number)}
            >
              <h2>{blog.title}</h2>
              <p>{blog.body.slice(0, 100)}</p>
              <div className={ss.info}>
                <div className={ss.tags}>
                  {blog.labels.map((label) => {
                    return (
                      <div
                        className={cx(ss.tag, ss[label.description])}
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
        {!blogList.length && <div className={ss.noData}>暂无更多数据</div>}
      </div>
    );
  }, [blogList]);

  return (
    <div className={ss.blog}>
      <div className={ss.content}>
        {nav}
        <Spin spinning={loading}>{main}</Spin>
      </div>
      <div className={ss.sidebar}>
        <div className={ss.poetry}>
          <h2 className={ss.cardTitle}>每日一诗</h2>
          {/* <OnePoetry /> */}
        </div>
        <div className={ss.static}>
          <h2 className={ss.cardTitle}>分类</h2>
          {statisticData.map((item) => (
            <div
              className={ss.tag}
              key={item.name}
              onClick={() => handleClick(item.id)}
            >{`${item.name}(${item.count})`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
