import { observable, action } from "mobx";

class appStore {
  @observable isHidden = false;
  @observable top = 0;

  @action.bound
  changeHeaderStatus(status) {
    this.isHidden = status;
  }

  @action.bound
  changeTop(top) {
    this.top = top;
  }
}

const store = new appStore();

export default store;
