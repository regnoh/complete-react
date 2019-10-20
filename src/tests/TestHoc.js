import React from "react";

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => (
    <div>
      测试 Hoc 和 @修饰器
      <WrappedComponent {...props} />
    </div>
  );

  return hocComponent;
};
