import type { Model } from 'dva';
import { navList, BlogType } from '@/constant';
import { getBlogList, getBlogDetail } from '@/service';

const model: Model = {
  namespace: 'blog',
  state: {
    blogList: [],
    statisticData: [],
    blogDetail: {},
  },
  effects: {
    *fetchBlogList({ payload }, { call, put }) {
      try {
        const { id } = payload;
        const list = yield call(getBlogList);
        const { name: type } = navList.find((item) => item.id === id) || {};
        const currentList = list.filter((blog: any) =>
          blog.labels.some(
            (label: { name: string }) => label.name.toLowerCase() === type,
          ),
        );
        const statisticData = navList.map((item) => {
          let count = list.filter((blog) =>
            blog.labels.some(
              (label: { name: string }) =>
                label.name.toLowerCase() === item.name,
            ),
          ).length;
          return { ...item, count };
        });

        yield put({
          type: 'saveBlogList',
          payload: id === BlogType.Latest ? list : currentList,
        });
        yield put({
          type: 'saveStatisticData',
          payload: statisticData.slice(1),
        });
      } catch (err) {}
    },
    *fetchBlogDetail({ payload }, { call, put }) {
      const data = yield call(getBlogDetail, payload);
      yield put({
        type: 'saveBlogDetail',
        payload: data,
      });
    },
  },
  reducers: {
    saveBlogList(store, { payload }) {
      store.blogList = payload;
    },
    saveStatisticData(store, { payload }) {
      store.statisticData = payload;
    },
    saveBlogDetail(store, { payload }) {
      store.blogDetail = payload;
    },
  },
};

export default model;
