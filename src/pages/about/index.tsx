import Github from '@/assets/imgs/github.png';
import Boy from '@/assets/imgs/forest.png';

import ss from './index.less';

const About = () => {
  return (
    <div className={ss.about}>
      <div className={ss.aboutBg}>
        <img src={Boy} alt="剪影" />
        <div className={ss.filter}></div>
      </div>
      <div className={ss.info}>
        <h3>关于我</h3>
        <p>
          一位平平无奇的CV工程师，在成为前端大佬的路上缓步前行。爱好看书、打游戏。
        </p>
      </div>
      <div className={ss.contact}>
        <h3>联系方式</h3>
        <p>邮箱：1355174654@qq.com</p>
      </div>
      <div className={ss.link}>
        <h3>友情链接</h3>
        <div className={ss.github}>
          <img
            src={Github}
            onClick={() =>
              (window.location.href = 'https://github.com/wenqiii')
            }
            alt="github"
          />
        </div>
        <div className={ss.juejin}>
          <img
            src="https://b-gold-cdn.xitu.io/favicons/v2/apple-touch-icon.png"
            onClick={() =>
              (window.location.href = 'https://juejin.im/user/1204720474010701')
            }
            alt="juejin"
          />
        </div>
      </div>
    </div>
  );
};
export default About;
