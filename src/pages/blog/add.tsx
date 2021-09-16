import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Link } from 'umi';
import Editor from '@/components/Editor/index';
import avatar from '@/assets/imgs/1.jpg';
import ss from './add.less';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/xcode.css';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

const EditorHeader = (props: {
  isActive: boolean;
  avatar: string;
  onInput: (e: any) => void;
  onPublish: () => void;
}) => {
  const { isActive, avatar, onInput, onPublish } = props;
  return (
    <div className={ss.editorHeader}>
      <div className={ss.hLeft}>
        <input type="text" onInput={onInput} placeholder="请输入标题" />
      </div>
      <div className={ss.hRight}>
        <button
          className={cx(ss.publish, isActive ? ss.active : '')}
          onClick={onPublish}
        >
          发布
        </button>
        <Link to="/about">
          <img src={avatar} className={ss.avatar} alt="avatar" />
        </Link>
      </div>
    </div>
  );
};

const CreateBlog = () => {
  const [blog, setBlog] = useState<{
    title?: string;
    html?: string;
    text?: string;
  }>({});
  useEffect(() => {
    updateCodeSyntaxHighlighting();
  }, []);

  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  const handleInput = (e: FormEvent) => {
    setBlog({ ...blog, title: e.target.value });
  };

  const handleChange = (content: { html: string; text: string }) => {
    setBlog({ ...blog, ...content });
  };

  const handlePublish = () => {
    // 发布
    if (!blog.title) return;
    window.localStorage.setItem('blog', JSON.stringify(blog));
  };

  return (
    <div className={ss.createBlog}>
      <EditorHeader
        avatar={avatar}
        isActive={Boolean(blog.title)}
        onInput={handleInput}
        onPublish={handlePublish}
      />
      <Editor onChange={handleChange} />
    </div>
  );
};

export default CreateBlog;
