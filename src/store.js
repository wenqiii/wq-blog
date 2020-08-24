import { observable, action } from "mobx";

class appStore {
  @observable isHidden = false;
  @observable top = 0;
  @observable poetry = {};

  @action.bound
  changeHeaderStatus(status) {
    this.isHidden = status;
  }

  @action.bound
  changeTop(top) {
    this.top = top;
  }

  @action.bound
  changePoetry(poetry) {
    this.poetry = poetry;
  }
}

const store = new appStore();

export default store;
