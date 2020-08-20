import { observable, action } from "mobx";

// const appStore = ({
//   isHidden: "",
// });

class appStore {
  @observable isHidden = "";
  @action
  changeHeaderStatus(status) {
    this.isHidden = status;
  }
}

export default appStore;
