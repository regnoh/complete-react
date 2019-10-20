import React, { Component } from "react";
import hocComp from "./TestHoc";

@hocComp
class HocWrappedComp extends Component {
  render() {
    return <div>我是Hoc子组件</div>;
  }
}
// export default hocComp(HocWrappedComp);
export default HocWrappedComp;
