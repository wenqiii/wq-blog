import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ss from './index.less';

interface IPoetry {
  content?: string;
  author?: string;
  dynasty?: string;
}

const OnePoetry: React.FC = () => {
  const [poetry, setPoetry] = useState<IPoetry>({});

  useEffect(() => {
    axios
      .get('https://v2.jinrishici.com/one.json')
      .then((res) => {
        console.log(res, 'response');
        setPoetry({
          ...res.data.data.origin,
          content: res.data.data.content,
        });
      })
      .catch((err) => {
        setPoetry({});
      });
  }, []);

  return (
    <div className={ss.poetryContainer}>
      <p className={ss.poetry}>{poetry.content}</p>
      <div className={ss.author}>{`-- ${poetry.dynasty}⋅${poetry.author}`}</div>
    </div>
  );
};
export default React.memo(OnePoetry);
