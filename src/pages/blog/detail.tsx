import { useEffect } from 'react';
import { Spin } from 'antd';
import cx from 'classnames';
import { useDispatch, useSelector, useParams } from 'umi';

import MarkdownIt from 'markdown-it';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/vs2015.css';

import { useLoading } from '@/hooks';

import ss from './detail.less';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const BlogDetail = () => {
  const params = useParams();

  const blogDetail = useSelector((store) => store.blog.blogDetail);
  const top = useSelector((store) => store.global.top);
  const loading = useLoading('blog/fetchBlogDetail');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'blog/fetchBlogDetail',
      payload: { id: params.id },
    });
  }, []);

  return (
    <div>
      <Spin spinning={loading}>
        <div className={cx(ss.blog, ss.blogDetail)}>
          <div className={ss.article}>
            <h1>{blogDetail.title}</h1>
            <div
              className={cx(ss.markdownStyle, ss.content)}
              dangerouslySetInnerHTML={{
                __html: blogDetail.body ? mdParser.render(blogDetail.body) : '',
              }}
            ></div>
          </div>
          <div className={cx(ss.catalog, top < -100 ? ss.isFixed : '')}>
            <div className={ss.content}>
              <div className={ss.markNavTitle}>文章目录</div>
              <MarkNav
                className={ss.articleMenu}
                source={blogDetail.body}
                headingTopOffset={-20}
              />
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};
export default BlogDetail;
