import type { Model } from 'dva';

const model: Model = {
  namespace: 'global',
  state: {
    top: 0,
    isHidden: 'false',
  },
  effects: {
    // *changeTop({ payload }, { put }) {
    //   console.log('changeTop: ', payload);
    //   yield put({
    //     type: 'saveTop',
    //     payload: payload,
    //   })
    // },
  },
  reducers: {
    // changeHeaderStatus(store, { payload }) {
    //   store.isHidden = payload;
    // },
    changeTop(store, data) {
      console.log('store, data: ', store, data);
      store.top = data.payload;
    },
  },
};

export default model;
